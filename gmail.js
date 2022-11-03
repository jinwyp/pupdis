/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable camelcase */
// [START gmail_quickstart]

const fss = require('fs');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];



// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const DISNEYCODE_PATH = path.join(process.cwd(), './disneycode.html');
const DISNEYCODE_PATH2 = path.join('/www/wwwroot/disney1tk/public/download/disneycode.html');
const TOKEN_PATH = path.join(process.cwd(), './config_gmail/gmail_token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './config_gmail/sk_credentials.json');

console.log("TOKEN_PATH: ", TOKEN_PATH)
console.log("CREDENTIALS_PATH: ", CREDENTIALS_PATH)


/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        console.log("google.auth.fromJSON:")
        console.log(err)
        return null;
    }
}



/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    console.log("CREDENTIALS_PATH:", content)
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}





/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        console.log(client)
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}



/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
        console.log(`- ${label.name}`);
    });
}


async function listMessages(auth) {
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
        // Include messages from `SPAM` and `TRASH` in the results.
        includeSpamTrash: true,

        // Only return messages with labels that match all of the specified label IDs.
        labelIds: ['INBOX', 'UNREAD'],

        // Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500.
        maxResults: '1',

        // Page token to retrieve a specific page of results in the list.
        pageToken: '',

        // Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope.
        q: 'from:Disney+ subject:您的一次性密码 ',

        // The user's email address. The special value `me` can be used to indicate the authenticated user.
        userId: 'me',

    });

    // console.log(res.data.messages)
    console.log('==========++++++++++==========')

    const messages = res.data.messages;

    if (!messages || messages.length === 0) {
        console.log('No messages found.');
        return;
    }


    const matchRegExpCode = /(?<=\s)\d{6}/;

    messages.forEach(async(message) => {
        console.log('==========++++++++++==========')
        console.log(`-- ${message.id} | ${message.threadId}`);
        const messageInfo = await gmail.users.messages.get({
            // The format to return the message in.
            format: 'full',

            // The ID of the message to retrieve. This ID is usually retrieved using `messages.list`. The ID is also contained in the result when a message is inserted (`messages.insert`) or imported (`messages.import`).
            id: message.id,

            // When given and format is `METADATA`, only include headers specified.
            metadataHeaders: '',

            // The user's email address. The special value `me` can be used to indicate the authenticated user.
            userId: 'me',

        });
        console.log("")
            // console.log(messageInfo.data.payload.body.data);

        const bodyData = messageInfo.data.payload.body.data;
        const bodyInfo = Buffer.from(bodyData, 'base64').toString('utf-8');
        let finalCode = matchRegExpCode.exec(bodyInfo);

        // console.log(bodyInfo);

        if (finalCode) {
            console.log('==========++++++++++==========')
            console.log(finalCode[0]);
            const intro = ` <p style="color:red; font-size: 16px;"> <br/> 6位数字验证码如下(刷新页面保证获取到最新的验证码): <br/><br/> 输入6位数字验证码成功后有时会提示修改密码(网页显示的提示信息为: Create a new password ) 请务必不要修改密码, 否则一律封号. 请谨慎操作! <br/><br/> 输入6位数字验证码成功后 直接重新打开 https://www.disneyplus.com/zh-hans/home 即可 </p>`
            const html = `<html lang="en-US"> <body> ${intro} <p style=" font-size: 24px;"> ${finalCode[0]}</p>     </body> </html>`
            const content = await fs.writeFile(DISNEYCODE_PATH, html);

            if (fss.existsSync("/www/wwwroot/disney1tk/public/download")) {
                const contentCopy = await fs.copyFile(DISNEYCODE_PATH, DISNEYCODE_PATH2);
                const contentCopy2 = await fs.chown(DISNEYCODE_PATH2, 1000, 1000);
                console.log("fs.copyFile: ", contentCopy);
            }
            console.log("fs.writeFile: ", content);

        } else {
            console.log("No disney code found");
        }




    });

}


authorize().then(listMessages).catch(console.error);