const http = require('http');
const fs = require("fs");
const fsp = require('fs').promises;
const path = require("path");

const fileReadPath = path.join(__dirname, "read.txt");
const fileWritePath = path.join(__dirname, "write.txt");

http.get('http://51.15.171.170/', function(response) {
    response.setEncoding('binary'); //二进制binary
    let html = '';
    response.on('data', function(data) { //加载到内存
        html += data;
    }).on('end', async function() {

        try {
            const data = await fsp.readFile(fileReadPath)
            await fsp.writeFile(fileWritePath, data.toString() + html);
            console.log("write success");
        } catch (err) {
            console.error(err);
        }

    })
});