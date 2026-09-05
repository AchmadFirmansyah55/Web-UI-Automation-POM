const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const loginPage = require('../pages/login.page');
const addcartPage = require('../pages/addCart.page');

describe('Add cart Test', function(){
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

    it('Should add cart from inventory page', async function(){
        await addcart.addBackpack();
        await addcart.shoppingCart();
        await addcart.assertAddProductsuccess();
    });

    it('Should add cart from product image', async function(){
        await addcart.backpackImage();
        await addcart.addToCart();
        await addcart.shoppingCart();
        await addcart.assertAddProductsuccess();
    });

    it('Should add cart from product name', async function(){
        await addcart.backpackName();
        await addcart.addToCart();
        await addcart.shoppingCart();
        await addcart.assertAddProductsuccess();
    });

    it('Should add multiple products to shopping cart', async function(){
        await addcart.addBackpack();
        await addcart.addBikeLight();
        await addcart.addFleeceJacket();
        await addcart.addOnesie();
        await addcart.shoppingCart();
        await addcart.assertAddMultipleProductsuccess();
    });

    it('Should not input duplicate product in shopping cart', async function(){
        await addcart.addBackpack();
        await addcart.assertRemoveButtonisDisplayed();
        await addcart.assertAddButtonisNotDisplayed();
        await addcart.assertDuplicateProductNotAdded();
    });
});