const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { elementLocated } = require('selenium-webdriver/lib/until');

describe('Login Test', function() {
    let driver;
    
    beforeEach(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        await driver.get('https://www.saucedemo.com/');
    });
    
    afterEach(async function() {
        await driver.quit();
    });
    
    it('Should login successfully with valid credentials', async function() {
        let usernameField = await driver.findElement(By.id('user-name'));
        let passwordField = await driver.findElement(By.id('password'));
        let loginButton = await driver.findElement(By.id('login-button'));
        await usernameField.sendKeys('standard_user');
        await passwordField.sendKeys('secret_sauce');
        await loginButton.click();
        
        let title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');
    });

    it('Should display error message with invalid credentials', async function() {
        let usernameField = await driver.findElement(By.id('user-name'));
        let passwordField = await driver.findElement(By.id('password'));
        let loginButton = await driver.findElement(By.id('login-button'));
        await usernameField.sendKeys('invalid');
        await passwordField.sendKeys('secret_sauce');
        await loginButton.click();
        let notification = await driver.wait(until.elementLocated(By.xpath('//*[@data-test="error"]')),5000);
        await driver.wait(until.elementIsVisible(notification), 5000);

        let errorMessage = await notification.getText();
        assert.strictEqual(errorMessage,'Epic sadface: Username and password do not match any user in this service');
    });
    
    it('Should not login with blank username', async function() {
        let passwordField = await driver.findElement(By.id('password'));
        let loginButton = await driver.findElement(By.id('login-button'));
        await passwordField.sendKeys('secret_sauce');
        await loginButton.click();
        let notification = await driver.wait(until.elementLocated(By.xpath('//*[@data-test="error"]')),5000);
        await driver.wait(until.elementIsVisible(notification), 5000);

        let errorMessage = await notification.getText();
        assert.strictEqual(errorMessage,'Epic sadface: Username is required');
    });
    
    it('Should not login with blank password', async function() {
        let usernameField = await driver.findElement(By.id('user-name'));
        let loginButton = await driver.findElement(By.id('login-button'));
        await usernameField.sendKeys('standard_user');
        await loginButton.click();
        let notification = await driver.wait(until.elementLocated(By.xpath('//*[@data-test="error"]')),5000);
        await driver.wait(until.elementIsVisible(notification), 5000);

        let errorMessage = await notification.getText();
        assert.strictEqual(errorMessage,'Epic sadface: Password is required');
    });
});