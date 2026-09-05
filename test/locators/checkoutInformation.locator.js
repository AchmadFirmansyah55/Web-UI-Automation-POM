const {By} = require('selenium-webdriver');

const CHECKOUT_INFORMATION_LOCATORS = {
    selectors: {
        checkoutButton: By.id('checkout'),
        userinformationTitle: By.className('title'),
        firstnameField: By.id('first-name'),
        lastnameField: By.id('last-name'),
        postalCodeField: By.id('postal-code'),
        continueButton: By.xpath('//*[@data-test="continue"]')
    }
};

module.exports = CHECKOUT_INFORMATION_LOCATORS;