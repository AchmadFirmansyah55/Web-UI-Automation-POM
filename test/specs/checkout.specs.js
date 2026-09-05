const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const chrome = require('selenium-webdriver/chrome');
const loginPage = require('../pages/login.page');
const addcartPage = require('../pages/addCart.page');

describe ('Checkout product Test', async function(){
    let driver;
    let login;
    let addcart;
    const options = new chrome.Options();
    options.addArguments(
        '--disable-features=PasswordLeakDetection',
        );
        options.setUserPreferences({
        'credentials_enable_service': false,
        'profile.password_manager_enabled': false,
        'profile.password_manager_leak_detection': false
    });
    
    beforeEach(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
        await driver.manage().window().maximize();
        login = new loginPage(driver);
        addcart = new addcartPage(driver);

        await login.openBrowser();
        await login.inputUsername('standard_user');
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
    });

    afterEach(async function(){
        await driver.quit();
    });

    it('Should checkout one product', async function(){
        await addcart.addBackpack();
        await addcart.shoppingCart();
        let checkoutButton = await driver.findElement(By.id('checkout'));
        await checkoutButton.click();

        //Make sure Your Information page is displayed
        let userinformationTitle = await driver.wait(until.elementLocated(By.className('title')),5000).getText();
        assert.strictEqual(userinformationTitle,'Checkout: Your Information');
        let userinformationDisplayed = await driver.wait(until.elementLocated(By.className('title')),5000).isDisplayed();
        assert.strictEqual(await userinformationDisplayed, true);

        let firstnameField = await driver.findElement(By.id('first-name'));
        await firstnameField.sendKeys('Romeo');
        let lastnameField = await driver.findElement(By.id('last-name'));
        await lastnameField.sendKeys('Margarita');
        let postalCodeField = await driver.findElement(By.id('postal-code'));
        await postalCodeField.sendKeys('123456');
        let continueButton = await driver.findElement(By.xpath('//*[@data-test="continue"]'));
        await continueButton.click();

        //Make sure Checkout overview page is displayed
        let checkoutOverviewTitle = await driver.wait(until.elementLocated(By.xpath('//*[@data-test="title"]')),5000).getText();
        assert.strictEqual(checkoutOverviewTitle,'Checkout: Overview');
        let checkoutOverviewDisplayed = await driver.findElement(By.xpath('//*[@data-test="title"]')).isDisplayed();
        assert.strictEqual(await checkoutOverviewDisplayed, true);

        //Make sure the product is displayed in the checkout overview page
        let itemList = await driver.findElements(By.className('cart_item'));
        assert.strictEqual(itemList.length, 1);
        let itemName = await driver.findElements(By.className('inventory_item_name'));
        assert.strictEqual(await itemName[0].getText(),'Sauce Labs Backpack');

        //Make sure payment information is true
        let paymentInformation = await driver.findElement(By.xpath('//*[@data-test="payment-info-label"]')).getText();
        assert.strictEqual(paymentInformation, 'Payment Information:');
        let paymentInformationValue = await driver.findElement(By.xpath('//*[@data-test="payment-info-value"]')).getText();
        assert.strictEqual(await paymentInformationValue, 'SauceCard #31337');

        //Make sure shipping information is true
        let shippingInformation = await driver.findElement(By.xpath('//*[@data-test="shipping-info-label"]')).getText();
        assert.strictEqual(shippingInformation, 'Shipping Information:');
        let shippingInformationValue = await driver.findElement(By.xpath('//*[@data-test="shipping-info-value"]')).getText();
        assert.strictEqual(shippingInformationValue, 'Free Pony Express Delivery!');

        //Make sure the total price and tax is true
        let priceTotaltitle = await driver.findElement(By.xpath('//*[@data-test="total-info-label"]')).getText();
        assert.strictEqual(priceTotaltitle, 'Price Total');
        let itemTotal = await driver.findElement(By.className('summary_subtotal_label')).getText();
        assert.strictEqual(itemTotal, 'Item total: $29.99');
        let tax = await driver.findElement(By.className('summary_tax_label')).getText();  
        assert.strictEqual(tax, 'Tax: $2.40');
        let totalwithTax = await driver.findElement(By.xpath('//*[@data-test="total-label"]')).getText();
        assert.strictEqual(totalwithTax, 'Total: $32.39');

        //Make sure click finish button will redirects to complete order page
        let finishButton = await driver.findElement(By.id('finish'));
        await finishButton.click();

        let completeOrderTitle = await driver.wait(until.elementLocated(By.className('complete-header')),5000).getText();
        assert.strictEqual(completeOrderTitle, 'Thank you for your order!');
        let completeOrderDisplayed = await driver.findElement(By.className('complete-header')).isDisplayed();
        assert.strictEqual(completeOrderDisplayed, true);

        //Make sure Generate PDF Order will download the order summary in PDF format
        let generatePDForder = await driver.findElement(By.id('generate-pdf-order'));
        await generatePDForder.click();
        
        let userPath = os.homedir();
        let downloadPath = path.join(userPath,'Downloads');
        let dateRegex = /^swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}.pdf$/;
        let downloadedFile = await driver.wait(async function(){
            let allFiles = fs.readdirSync(downloadPath);
            return allFiles.some(allFiles => dateRegex.test(allFiles));
        },10000);
        assert.strictEqual(downloadedFile, true);
    });
});
//checkout 1 product
//checkout multiple products
//checkout empty cart
//checkout after remove product
//checkout with empty first name
//checkout with empty last name
//checkout with empty postal code