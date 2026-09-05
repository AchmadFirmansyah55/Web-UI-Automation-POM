const {By} = require('selenium-webdriver');

const CHECKOUT_OVERVIEW_LOCATORS = {
    selectors: {
        checkoutOverviewTitle: By.xpath('//*[@data-test="title"]'),
        itemList: By.className('cart_item'),
        itemName: By.className('inventory_item_name'),
        paymentInformation: By.xpath('//*[@data-test="payment-info-label"]'),
        paymentInformationValue: By.xpath('//*[@data-test="payment-info-value"]'),
        shippingInformation: By.xpath('//*[@data-test="shipping-info-label"]'),
        shippingInformationValue: By.xpath('//*[@data-test="shipping-info-value"]'),
        priceTotaltitle: By.xpath('//*[@data-test="total-info-label"]'),
        itemTotal: By.className('summary_subtotal_label'),
        tax: By.className('summary_tax_label'),
        totalwithTax: By.xpath('//*[@data-test="total-label"]'),
        finishButton: By.id('finish')
    }
};

module.exports = CHECKOUT_OVERVIEW_LOCATORS;