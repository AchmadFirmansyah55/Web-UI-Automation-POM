const { By } = require('selenium-webdriver');

const LOGIN_LOCATORS = {
    url:'https://www.saucedemo.com/',
    selectors: {
        usernameField: By.id('user-name'),
        passwordField: By.id('password'),
        loginButton: By.id('login-button'),
        notification: By.xpath('//*[@data-test="error"]'),
        filter: By.xpath('//*[@class="product_sort_container"]'),
        title: By.className('app_logo')
    }
};

module.exports = LOGIN_LOCATORS;