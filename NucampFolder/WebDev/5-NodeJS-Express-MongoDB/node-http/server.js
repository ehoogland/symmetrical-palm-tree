
// The http module is required to create an HTTP server, and hostname and port are used to 
// specify the server's address and port number. 
// First the server is verified to be running using the specified hostname and port, and the 
// browser displays the inline Hello World message when localhost:3000 is accessed, and 
// Postman is used to send a request to the server, it is time to serve multiple static 
// pages by specifying that the path and fs modules are used for handling file paths 
// and file system operations, respectively.

const http = require('http');     
const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

// Along with the first three lines above, this code was used initially to create a simple HTTP server
// that responds with a static HTML page containing "Hello World!" for every request.
// The server listens on the specified hostname and port, and logs a message to the console when it starts running.
// The server also logs the request headers to the console for each incoming request.
// Execute it using Node.js with the command "node server.js". 
// Then, you can access the server by navigating to "http://localhost:3000/" in your web browser.

// Example usage:
// 1. Save the code to a file named "server.js".
// 2. Open a terminal and navigate to the directory where "server.js" is located.
// 3. Run the server with the command: node server.js
// 4. Open a web browser and go to: http://localhost:3000/
// You should see a page that says "Hello World!" and the request headers will be logged in the terminal.   
// request headers are the metadata sent by the client (browser) to the server, which can include information such as the user agent, 
// accepted content types, and cookies. Logging the request headers can be useful for debugging and understanding the client's request.
// The server listens for incoming HTTP requests and responds with a simple HTML page.
// The server is created using the http module, and it listens on the specified hostname and port.
// The server responds to each request by sending a status code of 200 (OK) and a content type of "text/html", along with the HTML 
// content that displays "Hello World!".
// req, res are the request and response objects provided by the http module. The req object contains information about the incoming 
// request, such as the HTTP method, URL, headers, and body. The res object is used to send a response back to the client.
// The request and response objects are streams and can handle large amounts of data efficiently. The server can read data from 
// the request stream and write data to the response stream as needed. 
//const server = http.createServer((req, res) => {
//    console.log(req.headers);
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<html><body><h1>Hello World!</h1></body></html>');
//});
//
//server.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
//});

// Result: Typed localhost:3000 in the browser and got the response "Hello World!" and the 
// request headers were logged in the terminal as expected.
// Also used Postman to send a request to the server and observed the same behavior, 
// confirming that the server is working correctly.

// Now, the server is modified to serve multiple static HTML files from a "public" directory.
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }
        // Resolve the file path and check if it exists
        // The server now serves HTML files from a "public" directory. When a request is made, 
        // it checks if the requested URL corresponds to an HTML file in the "public" directory. 
        // If the file exists, it serves the file; otherwise, it responds with a 404 error. 
        // Note that since we already have a forward slash in the fileUrl, we can directly 
        // concatenate it with the "public" directory path without worrying about missing 
        // or extra slashes.  
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        // The server checks if the requested file has an .html extension. If it does, it attempts to access the file.
        if (fileExt === '.html') {
            // The fs.access method is used to check if the file exists and is accessible. If the file is not found, a 404 error 
            // is returned. Older versions of Node.js may not support fs.access, in which case you can use fs.stat or fs.exists 
            // instead to check for file existence. fs.exists is deprecated in newer versions of Node.js, so it's generally recommended 
            // to use fs.access or fs.stat for checking file existence.
            // How you can use fs.stat to check if the file exists and is a regular file:
            // fs.stat(filePath, (err, stats) => {
            //     if (err || !stats.isFile()) {
            //         res.statusCode = 404;
            //         res.setHeader('Content-Type', 'text/html');
            //         res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
            //         return;
            //     }
            // });
            // If you prefer to use fs.exists (not recommended for newer Node.js versions), you can do it like this:
            // fs.exists(filePath, exists => {
            //     if (!exists) {
            //         res.statusCode = 404;
            //         res.setHeader('Content-Type', 'text/html');
            //         res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
            //         return;
            //     }
            // });
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
            // In the above code, if the file exists, it is served using a readable stream. The fs.createReadStream method 
            // creates a readable stream for the specified file, and the pipe method is used to send 
            // the file contents directly to the response stream like a pipe carrying water from one location to 
            // another. This is a lazy way to serve files, as it allows the server to handle large files 
            // without loading them entirely into memory at once. This is referred to as lazy loading because 
            // the file is read and sent to the client in chunks as needed, rather than being loaded into memory all at once.
            // By default, the pipe method will handle backpressure automatically, meaning it will pause reading from the file 
            // if the response stream is not ready to receive more data, and resume when it can. This helps to prevent memory 
            // issues when serving large files. When the file is fully read and sent to the client, the response will be 
            // automatically ended by the pipe method, so there is no need to call res.end() explicitly in this case.
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});
// Same listener code as when the server was serving a single HTML file with inline content, 
// but now the server serves HTML files from a "public" directory as instructed above.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
// If the initial server is still running, one way to stop it and restart the server with the new code 
// is by typing 
// lsof -nP -iTCP:3000 -sTCP:LISTEN
// kill <PID>
// npm start
// Or simply stop the server with Ctrl+C and restart it with node server.js or npm start, depending on 
// how you have set up your package.json scripts.
