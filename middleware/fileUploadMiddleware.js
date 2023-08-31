const busboy = require("busboy");
const os = require("os");
const path = require("path");

const fileUploadMiddleware = (req, res, next) => {
  if (
    req.headers["content-type"] &&
    req.headers["content-type"].startsWith("multipart/form-data")
  ) {
    const busboyInstance = new busboy({
      headers: req.headers,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    });

    const files = {};
    const fields = {};

    busboyInstance.on(
      "file",
      (fieldname, file, filename, encoding, mimetype) => {
        const filePath = path.join(os.tmpdir(), filename);
        file.pipe(fs.createWriteStream(filePath));

        files[fieldname] = {
          fieldname,
          originalname: filename,
          encoding,
          mimetype,
          size: 0,
          path: filePath,
        };

        file.on("data", (data) => {
          files[fieldname].size += data.length;
        });
      }
    );

    busboyInstance.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboyInstance.on("finish", () => {
      req.files = files;
      req.body = fields;
      next();
    });

    req.pipe(busboyInstance);
  } else {
    next();
  }
};

module.exports = fileUploadMiddleware;
