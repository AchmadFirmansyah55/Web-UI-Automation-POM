const { By, until } = require('selenium-webdriver');
const LOGIN_LOCATORS = require("../locators/login.locator");
const assert = require('assert');

class loginPage {
    constructor(driver){
        this.driver = driver;
    }
    async openBrowser(){
        await this.driver.get(LOGIN_LOCATORS.url);
        await this.driver.wait(async function(){
            let url = await this.driver.getCurrentUrl();
            return url === LOGIN_LOCATORS.url;
        })
    }

    async inputUsername(username){
        const input = await this.driver.findElement(LOGIN_LOCATORS.selectors.usernameField);
        await input.sendKeys(username);
    }

    async inputPassword(password){
        const input = await this.driver.findElement(LOGIN_LOCATORS.selectors.passwordField);
        await input.sendKeys(password);
    }

    async clickLoginButton(){
        const button = await this.driver.findElement(LOGIN_LOCATORS.selectors.loginButton);
        await button.click();
    }

    async assertLoginSuccess(){
        await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.title, 5000));
        const title = await this.driver
        .findElement(LOGIN_LOCATORS.selectors.title)
        .getText();
        assert.strictEqual(title, 'Swag Labs');
    }

    async assertInvalidCredentials(){
        const notification = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.notification, 5000));
        await this.driver.wait(until.elementIsVisible(notification), 5000);
        const message = await this.driver.findElement(notification).getText();
        assert.strictEqual(message,'Epic sadface: Username and password do not match any user in this service');
    }

    async assertBlankUsername(){
        const notification = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.notification, 5000));
        await this.driver.wait(until.elementIsVisible(notification),5000);
        const message = await this.driver.findElement(notification).getText();
        assert.strictEqual(message,'Epic sadface: Username is required');
    }

    async assertBlankPassword(){
        const notification = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.notification, 5000));
        await this.driver.wait(until.elementIsVisible(notification), 5000);
        const message = await this.driver.findElement(notification).getText();
        assert.strictEqual(message,'Epic sadface: Password is required');
    }

}

module.exports = loginPage;