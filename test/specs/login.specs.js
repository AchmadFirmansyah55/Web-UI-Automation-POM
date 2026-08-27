const { Builder } = require('selenium-webdriver');
const loginPage = require('../pages/login.page');

describe('Login Test', function() {
    let driver;
    let login;
    
    beforeEach(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        login = new loginPage(driver);
        await login.openBrowser();
    });
    
    afterEach(async function() {
        await driver.quit();
    });
    
    it('Should login successfully with valid credentials', async function() {
        await login.inputUsername('standard_user');
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
        await login.assertLoginSuccess();
    });

    it('Should display error message with invalid credentials', async function() {
        await login.inputUsername('invalid');
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
        await login.assertInvalidCredentials();
    });
    
    it('Should not login with blank username', async function() {
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
        await login.assertBlankUsername();
    });
    
    it('Should not login with blank password', async function() {
        await login.inputUsername('invalid');
        await login.clickLoginButton();
        await login.assertBlankPassword();
    });
});