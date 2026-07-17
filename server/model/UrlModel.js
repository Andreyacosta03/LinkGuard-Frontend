export default class UrlModel {
  static async checkUrl(url) {
    try {
      const API_KEY = process.env.API_KEY_VIRUSTOTAL;

      // 1. Generate the ID in Base64URL format
      const urlId = Buffer.from(url)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

      let engines = null;
      let response = await fetch(
        `https://www.virustotal.com/api/v3/urls/${urlId}`,
        {
          headers: {
            "x-apikey": API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data_response = await response.json();
        engines = data_response.data.attributes.last_analysis_results;
      }
      // 2. Handle API errors (404, 401, 429, etc.)
      else if (!response.ok) {
        // If status is 404, request a new scan and wait for completion
        if (response.status === 404) {
          const scanResponse = await fetch(
            "https://www.virustotal.com/api/v3/urls",
            {
              method: "POST",
              headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({ url }),
            },
          );

          if (!scanResponse.ok) throw new Error("Error al solicitar escaneo");

          // Extract the analysis ID (not the URL ID)
          const scanData = await scanResponse.json();
          const analysisId = scanData.data.id;

          // Polling mechanism loop to check analysis status
          let completed = false;
          let attempts = 0;
          const maxAttempts = 6;

          while (!completed && attempts < maxAttempts) {
            // Wait 10 seconds between each iteration
            await new Promise((resolve) => setTimeout(resolve, 10000));

            const checkResponse = await fetch(
              `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
              {
                headers: { "x-apikey": API_KEY },
              },
            );
            if (!checkResponse.ok)
              throw new Error("Error al obtener resultados del escaneo");
            const checkData = await checkResponse.json();
            if (checkData.data.attributes.status === "completed") {
              // Extract engine results directly from the analysis object
              engines = checkData.data.attributes.results;
              completed = true;
            }
            attempts++;
          }
        } else {
          // For other statuses, throw a generic API error
          throw new Error(`Error en la API de VirusTotal: ${response.status}`);
        }
      }
      // --- CRITICAL DATA VALIDATION ---
      if (!engines) {
        throw new Error(
          "No se pudieron obtener resultados de análisis (Timeout)",
        );
      }
      const ENGINE_WEIGHTS = {
        "Google Safebrowsing": 50,
        Kaspersky: 50,
        BitDefender: 30,
        ESET: 30,
        DEFAULT: 10,
      };

      let rawWarnings = {};
      let maxPossiblePoints = 0;
      let riskPoints = 0;

      for (const [name, value] of Object.entries(engines)) {
        // Skip engines without useful or explicit results
        if (
          ["unrated", "undetected", "type-unsupported", "timeout"].includes(
            value.category,
          )
        ) {
          continue;
        }

        const currentWeight = ENGINE_WEIGHTS[name] || ENGINE_WEIGHTS.DEFAULT;
        maxPossiblePoints += currentWeight;

        if (value.category === "malicious" || value.category === "suspicious") {
          riskPoints +=
            value.category === "malicious" ? currentWeight : currentWeight / 2;
          if (value.result) {
            const reason = value.result;
            rawWarnings[reason] = (rawWarnings[reason] || 0) + 1;
          }
        }
      }

      // 4. Identify the top 3 threat categories
      const topThreats = Object.entries(rawWarnings)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map((entry) => entry[0]);

      const malicious_percentage =
        maxPossiblePoints > 0
          ? Math.round((riskPoints / maxPossiblePoints) * 100)
          : 0;

      // 5. Build consistent Success Response Structure
      const finalResult = {
        error: false,
        status: 200,
        data: {
          id: urlId,
          url: url,
          totalEngines: Object.keys(engines).length,
          malicious_percentage,
          threatTypes: topThreats,
          analysis: {
            // Flag as malicious if a high-weight engine or multiple normal ones trigger it
            isMalicious: malicious_percentage >= 20,
            // Flag as suspicious if there is minor evidence
            isSuspicious: malicious_percentage > 5 && malicious_percentage < 20,
            // Safe only if risk percentage is negligible or zero
            isSafe: malicious_percentage <= 5,
          },
        },
      };

      // Assign descriptive notification message depending on final risk status
      if (finalResult.data.analysis.isMalicious) {
        finalResult.message =
          "Atención: Esta URL ha sido marcada como maliciosa.";
      } else if (finalResult.data.analysis.isSuspicious) {
        finalResult.message =
          "Advertencia: Esta URL presenta comportamientos sospechosos.";
      } else {
        finalResult.message = "La URL analizada es segura.";
      }

      return finalResult;
    } catch (error) {
      // 6. Handle internal system errors securely (hide raw error messages from client)
      console.error("CRITICAL_MODEL_ERROR:", error);
      return {
        error: true,
        status: 500,
        message:
          "Ocurrió un error interno al procesar el análisis de seguridad.",
      };
    }
  }
}
