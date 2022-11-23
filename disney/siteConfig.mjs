const user = {
    appleId: 'ninatk13@disney1.us',
    applePW: 'nina13APPLE2022@',
    disneyPW: 'ninatk13DIS',
}


const siteApple1 = {
    description: "AppleID - Create Apple ID",
    url: 'https://appleid.apple.com/account',
    actions: [{
            type: 'waitForSelector',
            selector: '.idms-step-content',
            value: '',
        },
        {
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
            value: user.appleId,
        },
        {
            type: 'type',
            selector: 'new-password input',
            value: user.applePW,
        },
        {
            type: 'type',
            selector: 'confirm-password-input input',
            value: user.applePW,
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





const siteApple2 = {
    description: "AppleID - Login",
    url: 'https://appleid.apple.com/sign-in',
    actions: [{
            type: 'waitForNetworkIdle',
            selector: '',
            value: '',
        },
        {
            type: 'type',
            selector: '#account_name_text_field',
            value: user.appleId,
            iframe: '#aid-auth-widget-iFrame',
        },
        {
            type: 'click',
            selector: '#sign-in',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },
        {
            type: 'waitForSelector',
            selector: '#password_text_field',
            value: '',
        },
        {
            type: 'type',
            selector: '#password_text_field',
            value: user.applePW,
        },
        {
            type: 'click',
            selector: '#sign-in',
            value: '',
        },
        {
            type: 'waitForSelector',
            selector: '.verify-phone',
            value: '',
        },
        {
            type: 'type',
            selector: '#char0',
            value: '',
            gmail: 'appleidsms'
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 12000
        },

        {
            type: 'goto',
            selector: '',
            value: 'https://appleid.apple.com/account/manage?mode=standalone&section=payment'
        },

        {
            type: 'waitForSelector',
            selector: '.form-address',
            value: '',
        },
        {
            type: 'type',
            selector: '.form-address .idms-address-line1',
            value: 'Bardakçi',
        },
        {
            type: 'type',
            selector: '.form-address .idms-address-line2',
            value: 'Bardakçi,25',
        },
        {
            type: 'type',
            selector: '.form-address .idms-address-postal-code input',
            value: '25750',
        },
        {
            type: 'type',
            selector: '.form-address .idms-address-city input',
            value: 'Çat',
        },
        {
            type: 'type',
            selector: '.form-address .payment-phonenumber-areaCode',
            value: '123',
        },
        {
            type: 'type',
            selector: '.form-address .payment-phonenumber-number',
            value: '1234567',
        },
        {
            type: 'click',
            selector: '#cbCopyBillingAddress',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 1000
        },
        {
            type: 'click',
            selector: '.weight-medium.save-payment',
            value: '',
        },
    ]
}






const siteDisney1 = {
    url: 'https://www.disneyplus.com/sign-up',
    actions: [{
            type: 'waitForNetworkIdle',
            selector: '',
            value: '',
        },
        {
            type: 'type',
            selector: '#email',
            value: user.appleId,
        },
        {
            type: 'checkbox',
            selectorLabel: '.sc-kjoXOD',
            selector: '#dssLogin input[type="checkbox"]',
            value: false,
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 1000
        },
        {
            type: 'click',
            selector: '.juxwWm',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 2000
        },
        {
            type: 'waitForSelector',
            selector: '#password',
            value: '',
        },
        {
            type: 'type',
            selector: '#password',
            value: user.disneyPW,
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 1000
        },
        {
            type: 'click',
            selector: '.juxwWm',
            value: '',
        },

    ]
}


const siteDisney2 = {
    url: 'https://www.disneyplus.com/login',
    actions: [{
            type: 'waitForNetworkIdle',
            selector: '',
            value: '',
        },
        {
            type: 'type',
            selector: '#email',
            value: user.appleId,
        },
        {
            type: 'click',
            selector: '.juxwWm',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 2000
        },
        {
            type: 'waitForSelector',
            selector: '#password',
            value: '',
        },
        {
            type: 'type',
            selector: '#password',
            value: user.disneyPW,
        },
        {
            type: 'click',
            selector: '.juxwWm',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 10000
        },
        {
            type: 'click',
            selector: '.button--primary.sc-bFADNz',
            value: ''
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },
        {
            type: 'click',
            selector: '.button--primary',
            value: ''
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },



        {
            type: 'goto',
            selector: '',
            value: 'https://www.disneyplus.com/edit-profiles'
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 6000
        },

        {
            type: 'click',
            selector: '[data-testid="profile-avatar-0"] div',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },
        {
            type: 'waitForSelector',
            selector: '#editProfile',
            value: '',
        },
        {
            type: 'type',
            selector: '#editProfile',
            value: 'P1',
            deleteText: true
        },
        {
            type: 'click',
            selector: '[for="autoplay"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[for="backgroundVideo"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[for="groupWatch"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[data-gv2elementkey="current_language"]',
            value: '',
        },
        {
            type: 'click',
            selector: '#react-select-2-option-23',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 4000
        },
        {
            type: 'click',
            selector: '[data-gv2elementkey="parental_controls"]',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 1000
        },
        {
            type: 'type',
            selectorIsExist: '#dssLogin',
            selector: '#password',
            value: user.disneyPW,
        },
        {
            type: 'click',
            selector: '[data-testid="password-continue-login"]',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 1000
        },
        {
            type: 'click',
            selector: '[for="18+-3"]',
            value: '',
        },
        {
            type: 'click',
            selector: '.button--primary',
            value: '',
        },
        {
            type: 'click',
            selector: '.sc-brqgnP.button--secondary',
            value: '',
        },

    ]
}


let tempUserList = []
for (let i = 2; i < 8; i++) {
    const userIndex = i - 1;
    const tempCSSList = ['fifZkF', 'lkoZYd', 'cQAvuq', 'cHVCyd', 'kizyyO', 'kapHNx', 'eBpyXN']
    const tempNewUser = [

        {
            type: 'click',
            selector: '.dFOTSU.add-profile',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },
        {
            type: 'click',
            selector: '.gv2-asset',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 2000
        },
        {
            type: 'type',
            selector: '#addProfile',
            value: 'P' + i.toString(),
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 2000
        },
        {
            type: 'click',
            selector: '[data-testid="add-profile-save-button"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[data-testid="maturity-rating-button"]',
            value: '',
        },
        {
            type: 'type',
            selectorIsExist: '#dssLogin',
            selector: '#password',
            value: user.disneyPW,
        },
        {
            type: 'click',
            selector: '[data-testid="password-continue-login"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[data-testid="create-pin-cancel-button"]',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 2000
        },






        {
            type: 'goto',
            selector: '',
            value: 'https://www.disneyplus.com/edit-profiles'
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 6000
        },


        {
            type: 'click',
            selector: '[data-testid="profile-avatar-' + userIndex.toString() + '"] div',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 3000
        },
        {
            type: 'click',
            selector: '[for="autoplay"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[for="backgroundVideo"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[for="groupWatch"]',
            value: '',
        },
        {
            type: 'click',
            selector: '[data-gv2elementkey="current_language"]',
            value: '',
        },
        {
            type: 'click',
            selector: '#react-select-2-option-23',
            value: '',
        },
        {
            type: 'waitForTimeout',
            selector: '',
            value: 4000
        },
        {
            type: 'click',
            selector: '.sc-brqgnP.button--secondary',
            value: '',
        },

    ]

    tempUserList = [...tempUserList, ...tempNewUser]

}

siteDisney2.actions = [...siteDisney2.actions, ...tempUserList]
export { siteApple1, siteApple2, siteDisney1, siteDisney2 };