const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Define the server
http.createServer((req, res) => {
  if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write('<h2>Error uploading file. Please try again.</h2>');
        res.end();
        return;
      }

      // Check if file object is correctly defined
      const file = files.filetoupload;
      const oldPath = file.filepath || file.path;  // for compatibility with different versions
      const uploadDir = path.join(__dirname, '/uploads');
      const newPath = path.join(uploadDir, file.originalFilename || file.name);

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Move the uploaded file to the new directory
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.write('<h2>Error moving file. Please try again.</h2>');
          res.end();
          return;
        }

        // Success response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h2>File uploaded and moved successfully!</h2>');
        res.write('<a href="/">Upload another file</a>');
        res.end();
      });
    });

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <h1>File Upload</h1>
      <form action="fileupload" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload" required><br><br>
        <input type="submit" value="Upload File">
      </form>
    `);
    res.end();
  }
}).listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
