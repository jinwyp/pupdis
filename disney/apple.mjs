import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { getAppleEmailCode, getAppleSMSCode } from '../gmail/gmail.js';

// console.log('==============================')
// console.log('executablePath Path: ', executablePath())
// console.log('==============================')

// https://stackoverflow.com/questions/58999602/input-text-while-running-puppeteer
const rl = readline.createInterface({ input, output });



const siteApple1 = {
    url: 'https://appleid.apple.com/account',
    action: [{
            type: 'type',
            selector: 'last-name-input input',
            value: 'Wang',
        },
        {
            type: 'type',
            selector: 'first-name-input input',
            value: 'Anna',
        },
        {
            type: 'select',
            selector: '.form-dropdown.country-picker.idms-address-country',
            value: 'TUR',
        },

        {
            type: 'type',
            selector: 'wc-birthday input',
            value: '01/30/1981',
        },
        {
            type: 'type',
            selector: 'email-input input',
            value: 'ninatk13@disney1.us',
        },
        {
            type: 'type',
            selector: 'new-password input',
            value: 'nina13APPLE2022@',
        },
        {
            type: 'type',
            selector: 'confirm-password-input input',
            value: 'nina13APPLE2022@',
        },

        {
            type: 'select',
            selector: 'phone-input select',
            value: 'US',
        },
        {
            type: 'type',
            selector: 'phone-input input',
            value: '2095026290',
        },
        {
            type: 'click',
            selector: '.verify-mode-sms-input',
            value: '',
        },
        {
            type: 'click',
            selector: '#news',
            value: '',
        },
        {
            type: 'click',
            selector: '#itunes',
            value: '',
        },
        {
            type: 'type',
            selector: 'captcha-input input',
            value: '',
        },

        {
            type: 'click',
            selector: '.last.nav-action',
            value: '',
        },


        {
            type: 'waitForSelector',
            selector: '#char0',
            value: '',
        },
        {
            type: 'type',
            selector: '#char0',
            value: '',
            gmail: 'appleidemail'
        },
        {
            type: 'click',
            selector: '.idms-modal-dialog button.last.pull-right',
            value: '',
        },

        {
            type: 'waitForSelector',
            selector: '.step-verify-code .not-mobile',
            value: '',
        },
        {
            type: 'type',
            selector: '#char0',
            value: '',
            gmail: 'appleidsms'
        },
        {
            type: 'click',
            selector: '.idms-modal-dialog button.last.pull-right',
            value: '',
        },
    ]
}





async function appleid(site) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--window-size=1400,800",
            "--lang=en-US",
        ],
        env: {
            LANGUAGE: "en-US",
            LANG: "en-US",
        },
        executablePath: executablePath(),
    });

    const page = await browser.newPage();

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
        width: 1400,
        height: 800,
        deviceScaleFactor: 1,
    });

    await page.goto(site.url, {
        waitUntil: 'networkidle0',
    });


    for await (let action of site.action) {

        switch (action.type) {
            case 'type':

                if (action.value) {
                    await page.type(action.selector, action.value);

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

            case 'select':
                await page.select(action.selector, action.value);
                break;

            case 'click':
                await page.click(action.selector);
                break;

            case 'waitForSelector':
                await page.waitForSelector(action.selector)
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


appleid(siteApple1)