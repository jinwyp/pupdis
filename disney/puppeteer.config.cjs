const { join } = require('path');



const cacheDirectory = join(__dirname, '.cache', 'puppeteer')


console.log('==============================')
console.log('cacheDirectory Path: ', cacheDirectory)
console.log('==============================')


/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: cacheDirectory,
};