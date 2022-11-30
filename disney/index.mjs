import { newAppleID } from './apple.mjs';

import { captchaConfig, siteApple1, siteApple2, siteDisney1, siteDisney2 } from './siteConfig.mjs';


async function main() {
    console.log(process.argv);

    const myArgs = process.argv.slice(2);
    console.log('myArgs: ', myArgs);


    if (myArgs.length > 0) {
        if (myArgs[0] === '1') {
            console.log('Step1: Registering Apple ID');
            await newAppleID(siteApple1)
            await newAppleID(siteDisney1)

        } else if (myArgs[0] === '2') {
            console.log('Step2 : disney+ Profile Creation');
            await newAppleID(siteDisney2)

        } else {
            console.log('invalid site');
        }
    } else {
        console.log('No arguments supplied');
    }


    // newAppleID(siteApple1)
    // newAppleID(siteApple2)

    // newAppleID(siteDisney1)
    // newAppleID(siteDisney2)
}


main()