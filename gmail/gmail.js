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

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const process = require('process');

const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');


const config = require('./config_gmail/config.js');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];



// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.


console.log();
console.log('==========++++++++++==========')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fsp.readFile(config.TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        console.log('\n');
        console.log("=== Gmail Token from JSON File error: ")
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
    const content = await fsp.readFile(config.CREDENTIALS_PATH);
    // console.log('\n');
    // console.log("=== SAVE CREDENTIALS Content:", content)

    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payloadTemp = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        access_token: client.credentials.access_token,
        refresh_token: client.credentials.refresh_token,
        token_type: client.credentials.token_type,
        scope: client.credentials.scope,
        expiry_date: client.credentials.expiry_date,
    });
    await fsp.writeFile(config.TOKEN_PATH, payloadTemp);
}


/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        // console.log(client)
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: config.CREDENTIALS_PATH,
    });
    console.log('\n');
    // console.log("=== Gmail Auth CREDENTIALS Content: ")
    // console.log(client)

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

    // https://support.google.com/mail/answer/7190
    // https://developers.google.com/gmail/api/v1/reference/users/messages/list

    let searchQuery = '';

    if (config.searchGmail.fromText) {
        searchQuery = `from:${config.searchGmail.fromText}`;
    }

    if (config.searchGmail.subject) {
        searchQuery = searchQuery + `subject:${config.searchGmail.subject}`;
    }

    console.log("searchQuery: ", searchQuery);
    console.log('\n');

    const res = await gmail.users.messages.list({
        // Include messages from `SPAM` and `TRASH` in the results.
        includeSpamTrash: true,

        // Only return messages with labels that match all of the specified label IDs.
        labelIds: config.searchGmail.labelIds,

        // Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500.
        maxResults: config.searchGmail.maxResults,

        // Page token to retrieve a specific page of results in the list.
        pageToken: '',

        // Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope.
        q: searchQuery,

        // The user's email address. The special value `me` can be used to indicate the authenticated user.
        userId: 'me',

    });

    const messages = res.data.messages;

    if (!messages || messages.length === 0) {
        console.log('\n');
        console.log('No Gmail messages found.');
        return;
    } else {

        let result = '';
        let matchRegExpCode = config.regex;


        for await (let message of messages) {

            console.log(`=== Gmail message id :  ${message.id} | ${message.threadId}`);
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

            // console.log(messageInfo.data.payload.body);
            let bodyData = messageInfo.data.payload.body.data;

            if (messageInfo.data.payload.body.size === 0) {
                bodyData = messageInfo.data.payload.parts[0].body.data;
            }


            const bodyInfo = Buffer.from(bodyData, 'base64').toString('utf-8');
            let finalCode = matchRegExpCode.exec(bodyInfo);

            // console.log(bodyInfo);

            if (finalCode) {
                console.log("")
                console.log('Code: ');
                console.log("")
                console.log(finalCode[0]);
                console.log("")

                result = finalCode[0];

                if (config.isWriteHtml) {
                    const intro = ` <p style="color:red; font-size: 16px;"> <br/> Disney+ 一次性密码 6位数字验证码如下 (请等待2分钟后在刷新页面保证获取到最新的验证码 系统每30秒更新一次): <br/><br/> 输入6位数字验证码成功后有时会提示修改密码(网页显示的提示信息为: Create a new password ) 请务必不要修改密码, 否则一律封号. 请谨慎操作! <br/><br/> 输入6位数字验证码成功后 直接重新打开 https://www.disneyplus.com/zh-hans/home 即可 \n </p>`
                    const html = `<html lang="zh-CN">  \n  <head> <meta charset="utf-8"> </head> \n <body> \n ${intro} \n <p style=" font-size: 24px;">  ${finalCode[0]}  </p>   \n </body> \n </html>`
                    const content = await fsp.writeFile(config.DISNEYHTML_PATH, html);
                    console.log("fsp.writeFile: ", content);

                    if (fs.existsSync(config.DISNEYCODE_WWWSITEPATH)) {
                        const contentCopy = await fsp.copyFile(config.DISNEYHTML_PATH, config.DISNEYCODE_WWWSITEHTMLPATH);
                        const contentCopy2 = await fsp.chown(config.DISNEYCODE_WWWSITEHTMLPATH, 1000, 1000);
                        console.log("fsp.copyFile: ", contentCopy);
                    }

                }

            } else {
                console.log("Disney one time auth code not found !");
            }
        };

        return result;

    }
}



async function getDisneyCode() {
    config.isWriteHtml = true;
    config.searchGmail.subject = '您的一次性密码 OR subject:Your one-time passcode';
    config.codeType = 'disney';
    config.regex = /(?<=\s)\d{6}/
    authorize().then(listMessages).catch(console.error);
}


async function getAppleEmailCode() {
    config.isWriteHtml = false;

    config.searchGmail.subject = 'Verify your Apple ID email address';
    config.codeType = 'appleemail'
    config.regex = /\d{6}/;

    let result = await authorize().then(listMessages).catch(console.error);

    return result;
}
async function getAppleSMSCode() {
    config.isWriteHtml = false;

    config.searchGmail.subject = 'New text message from';
    config.codeType = 'applesms'
    config.regex = /(?<=\s)\d{6}/;

    let result = await authorize().then(listMessages).catch(console.error);

    return result;
}

exports.getDisneyCode = getDisneyCode;
exports.getAppleEmailCode = getAppleEmailCode;
exports.getAppleSMSCode = getAppleSMSCode;