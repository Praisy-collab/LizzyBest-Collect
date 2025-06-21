const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  return new Promise((resolve) => {
    const form = new multiparty.Form();

    form.parse(event, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ error: "Error parsing form data." }),
        });
      }

      const file = files?.["file"]?.[0];
      if (!file) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({ error: "No file uploaded." }),
        });
      }

      const fileName = path.basename(file.originalFilename);
      const tempPath = file.path;

      // You can upload to an S3 bucket, Cloudinary, etc. here.
      // For now, just simulate a successful upload:
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: "Upload successful",
          fileUrl: `https://dummy-storage.com/${fileName}`,
        }),
      });
    });
  });
};
