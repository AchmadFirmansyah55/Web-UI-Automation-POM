const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const loginPage = require('../pages/login.page');
const commonPage = require('../pages/common.page');
const VisualRegressionHelper = require('../../utilities/visualRegression.helper');

describe('Login Test', function() {
    let driver;
    let login;
    let common;
    let visualHelper;
    
    beforeEach(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        await driver.manage().window().maximize();
        login = new loginPage(driver);
        common = new commonPage(driver);
        visualHelper = new VisualRegressionHelper();
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

        //Take full screenshot
        await common.fullScreenshot('1. Login_standard_user');

        //Copy full screenshot to visual-current
        await visualHelper.saveCurrentScreenshot(
            'screenshot/1. Login_standard_user.PNG',
            'login_standard.png'
        );

        //Compare with visual-baseline
        const result = await visualHelper.compareImages('login_standard.png');
        console.log(result);

        //if baseline does not exist
        if(!result.hasBaseline){
            await visualHelper.saveAsBaseline('login_standard.png');
            console.log('Baseline created : login_standard.png');
        }
        else{
            assert.strictEqual(result.match , true);
                result.message;
            };

    });

    it('Should display error message with invalid credentials', async function() {
        await login.inputUsername('invalid');
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
        await login.assertInvalidCredentials();

        //Take full screenshot
        await common.fullScreenshot('2. Invalid_username_or_password');

        //Copy full screenshot to visual-current
        await visualHelper.saveCurrentScreenshot(
            'screenshot/2. Invalid_username_or_password.PNG',
            'invalid_credential.png'
        );

        //Compare with visual-baseline
        const result = await visualHelper.compareImages('invalid_credential.png');
        console.log(result);

        //if baseline does not exist
        if(!result.hasBaseline){
            await visualHelper.saveAsBaseline('invalid_credential.png');
            console.log('Baseline created : invalid_credential.png');
        }
        else{
            assert.strictEqual(result.match , true);
                result.message;
            };
    });
    
    it('Should not login with blank username', async function() {
        await login.inputPassword('secret_sauce');
        await login.clickLoginButton();
        await login.assertBlankUsername();

        //Take full screenshot
        await common.fullScreenshot('3. Blank_username');

        //Copy full screenshot to visual-current
        await visualHelper.saveCurrentScreenshot(
            'screenshot/3. Blank_username.PNG',
            'Blank_username.png'
        );

        //Compare with visual-baseline
        const result = await visualHelper.compareImages('Blank_username.png');
        console.log(result);

        //if baseline does not exist
        if(!result.hasBaseline){
            await visualHelper.saveAsBaseline('Blank_username.png');
            console.log('Baseline created : Blank_username.png');
        }
        else{
            assert.strictEqual(result.match , true);
                result.message;
            };
    });
    
    it('Should not login with blank password', async function() {
        await login.inputUsername('invalid');
        await login.clickLoginButton();
        await login.assertBlankPassword();

        //Take full screenshot
        await common.fullScreenshot('4. Blank_password');

        //Copy full screenshot to visual-current
        await visualHelper.saveCurrentScreenshot(
            'screenshot/4. Blank_password.PNG',
            'Blank_Password.png'
        );

        //Compare with visual-baseline
        const result = await visualHelper.compareImages('Blank_Password.png');
        console.log(result);

        //if baseline does not exist
        if(!result.hasBaseline){
            await visualHelper.saveAsBaseline('Blank_Password.png');
            console.log('Baseline created : Blank_Password.png');
        }
        else{
            assert.strictEqual(result.match , true);
                result.message;
            };
    });
});