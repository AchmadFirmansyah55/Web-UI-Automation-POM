const {By} = require('selenium_webdriver');

const CHECKOUT_COMPLETE_LOCATORS = {
    selectors:{
        completeOrderTitle: By.className('complete-header'),
        generatePDForder: By.id('generate-pdf-order')
    }
}

module.exports = CHECKOUT_COMPLETE_LOCATORS;