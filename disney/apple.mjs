import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { getAppleEmailCode, getAppleSMSCode } from '../gmail/gmail.js';

import { siteApple1, siteApple2, siteDisney1, siteDisney2 } from './siteConfig.mjs';

// console.log('==============================')
// console.log('executablePath Path: ', executablePath())
// console.log('==============================')

// https://stackoverflow.com/questions/58999602/input-text-while-running-puppeteer
const rl = readline.createInterface({ input, output });







async function appleid(site) {
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
                    console.log('Node not found: ', action.selector);
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


// appleid(siteApple1)
// appleid(siteApple2)

// appleid(siteDisney1)
appleid(siteDisney2)