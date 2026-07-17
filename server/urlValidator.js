import * as z from "zod";

// Define the schema to validate the URL structure
const Url = z.object({
  url: z.url(),
});

// Asynchronously validate the input object against the schema
const validateUrl = (object) => {
  return Url.safeParseAsync(object);
};

export default validateUrl;
