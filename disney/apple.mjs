import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


import { getAppleEmailCode, getAppleSMSCode } from '../gmail/gmail.js';

import { captchaConfig, siteApple1, siteApple2, siteDisney1, siteDisney2 } from './siteConfig.mjs';


import captcha from './captcha.mjs';

const captchaSolver = new captcha(captchaConfig.clientKey)
const tempima = "data:image/jpeg;base64, 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"


// console.log('==============================')
// console.log('executablePath Path: ', executablePath())
// console.log('==============================')

// https://stackoverflow.com/questions/58999602/input-text-while-running-puppeteer
const rl = readline.createInterface({ input, output });


const solver = new captcha("<Your yescaptcha api key>", {
    pollingFrequency: 5000,
    verbose: false,
    baseUrl: 'https://api.yescaptcha.com', // https://china.yescaptcha.com
})




async function newAppleID(site) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--window-size=1300,900",
            "--lang=en-US",
        ],
        env: {
            LANGUAGE: "en-US",
            LANG: "en-US",
        },
        executablePath: executablePath(),
    });

    let page = await browser.newPage();
    let pageOld = page;

    // https://stackoverflow.com/questions/46908636/how-to-specify-browser-language-in-puppeteer
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US'
    });

    // Set the language forcefully on javascript
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "language", {
            get: function() {
                return "en-US";
            }
        });
        Object.defineProperty(navigator, "languages", {
            get: function() {
                return ["en-US", "en"];
            }
        });
    });

    await page.setViewport({
        width: 1300,
        height: 900,
        deviceScaleFactor: 1,
    });

    await page.goto(site.url, {
        waitUntil: 'networkidle0',
        timeout: 120000
    });


    for await (let action of site.actions) {
        let elementHandle;
        let frame

        if (action.iframe) {
            await page.waitForSelector(action.iframe);
            elementHandle = await page.$(action.iframe);
            frame = await elementHandle.contentFrame();
            page = frame;
        }

        switch (action.type) {
            case 'type':
                if (action.deleteText) {
                    const input = await page.$(action.selector);
                    await input.click({ clickCount: 3 })
                    await page.keyboard.press('Backspace');
                }
                if (action.value) {
                    let isNodeExist = (await page.$(action.selector)) || "";

                    if (action.selectorIsExist) {

                        if (isNodeExist) {
                            await page.type(action.selector, action.value);
                        }
                    } else {
                        await page.type(action.selector, action.value);
                    }
                    // console.log('test: ', test);


                } else {
                    console.log()
                    if (action.gmail === 'appleidemail') {
                        await page.waitForTimeout(10000);
                        const gmailcode = await getAppleEmailCode();
                        console.log("Apple ID email Code : ", gmailcode);
                        await page.type(action.selector, gmailcode);
                        await page.waitForTimeout(1000);

                    } else if (action.gmail === 'appleidsms') {
                        await page.waitForTimeout(10000);
                        const gmailcode = await getAppleSMSCode();
                        console.log("Apple ID SMS Code : ", gmailcode);
                        await page.type(action.selector, gmailcode);
                        await page.waitForTimeout(1000);

                    } else if (action.gmail === 'captcha') {
                        await page.waitForSelector(action.selectorCaptcha);
                        const imgSrc = await page.$eval(action.selectorCaptcha, (el) => el.getAttribute('src'));
                        // console.log("Apple ID captcha text : ", imgSrc);

                        let captchaText = await captchaSolver.imageToText(imgSrc)
                        console.log("Apple ID captcha text : ", captchaText.text);
                        await page.type(action.selector, captchaText.text);
                        await page.waitForTimeout(1000);

                    } else {
                        let captcha = await rl.question('Enter captcha: ');
                        console.log()
                        await page.type(action.selector, captcha);
                    }
                }

                break;

            case 'click':
                let isNodeExist = (await page.$(action.selector)) || "";
                if (isNodeExist) {
                    await page.click(action.selector);
                    await page.waitForTimeout(2000);
                } else {
                    console.log('=== Node not found: ', action.selector);
                }

                break;

            case 'select':
                await page.select(action.selector, action.value);
                break;

            case 'checkbox':
                let tempNode = await page.$(action.selector);
                // let isChecked = await page.evaluate(node => node.checked, tempNode);
                let isChecked = await tempNode.getProperty('checked');
                let isChecked2 = await isChecked.jsonValue();

                if (isChecked2 !== action.value) {
                    await page.click(action.selectorLabel);
                }

                // await page.$eval(action.selector, (check, actioneval) => check.checked = actioneval.value, action);
                // await page.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = action.value));
                break;



            case 'waitForSelector':
                await page.waitForSelector(action.selector)
                break;

            case 'waitForNetworkIdle':
                await page.waitForNetworkIdle()
                break;

            case 'waitForTimeout':
                await page.waitForTimeout(action.value)
                break;

            case 'goto':
                await pageOld.goto(action.value, {
                    waitUntil: 'networkidle0',
                });
                page = pageOld
                break;
            default:
                console.log('No action type found');

        }

        if (action.type) {
            console.log('type: ', action.type, ' | selector: ', action.selector, ' | value: ', action.value);
        }

    }





    // // Wait for the results page to load and display the results.
    // const resultsSelector = '.gsc-results .gs-title';
    // await page.waitForSelector(resultsSelector);

    // // Extract the results from the page.
    // const links = await page.evaluate(resultsSelector => {
    //     return [...document.querySelectorAll(resultsSelector)].map(anchor => {
    //         const title = anchor.textContent.split('|')[0].trim();
    //         return `${title} - ${anchor.href}`;
    //     });
    // }, resultsSelector);

    // // Print all the files.
    // console.log(links.join('\n'));

    await browser.close();
};




export {
    newAppleID,
};