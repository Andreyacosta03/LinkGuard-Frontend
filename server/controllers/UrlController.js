import UrlModel from "../model/UrlModel.js";
import validateUrl from "../urlValidator.js";

export default class LinkController {
  static async createLink(req, res) {
    try {
      const { url } = req.body;

      // Validate the incoming URL payload structure using the Zod validator
      const validationResult = await validateUrl({ url });
      if (!validationResult.success) {
        return res.status(400).json({
          error: true,
          status: 400,
          message: "La URL proporcionada no tiene un formato válido",
        });
      }

      // Perform the security analysis scan via the VirusTotal model integration
      const urlCheckResult = await UrlModel.checkUrl(url);

      // Determine the appropriate HTTP status code based on model execution errors
      const httpStatus = urlCheckResult.error
        ? urlCheckResult.status || 500
        : 200;

      return res.status(httpStatus).json(urlCheckResult);
    } catch (error) {
      // Handle unexpected controller layer exceptions securely
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
