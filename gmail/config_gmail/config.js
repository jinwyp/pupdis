const path = require('path');
const process = require('process');

const CREDENTIALS_PATH = path.join(__dirname, './credentials.json');
const TOKEN_PATH = path.join(__dirname, './gmail_token.json');

const DISNEYHTML_PATH = path.join(__dirname, './disneycode.html');

const DISNEYCODE_WWWSITEPATH = "/www/wwwroot/disney1tk/public/download";
const DISNEYCODE_WWWSITEHTMLPATH = "/www/wwwroot/disney1tk/public/download/disneycode.html";


console.log('==============================')
console.log('process.cwd Path: ', process.cwd())
console.log('Google Cloud CREDENTIALS Path: ', CREDENTIALS_PATH)
console.log('Gmail TOKEN Path: ', TOKEN_PATH)
console.log('==============================')

module.exports = {
    CREDENTIALS_PATH,
    TOKEN_PATH,
    searchGmail: {
        maxResults: 1,
        labelIds: ['INBOX', 'UNREAD'],

        fromText: '',
        subject: '您的一次性密码',
        q: 'from:Disney+ subject:您的一次性密码 ',
    },

    DISNEYHTML_PATH,
    DISNEYCODE_WWWSITEPATH,
    DISNEYCODE_WWWSITEHTMLPATH,

    isWriteHtml: false,
    codeType: 'disney',
    regex: /(?<=\s)\d{6}/

}