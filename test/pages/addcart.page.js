const { By, until } = require('selenium-webdriver');
const ADDCART_LOCATORS = require("../locators/addCart.locator");
const assert = require('assert');

class addcartPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async addBackpack(){
        let addcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.addBackpack);
        await addcart.click();
    }

    async removeBackpack(){
        await this.driver.findElement(ADDCART_LOCATORS.selectors.removeBackpack);
    }

    async addBikeLight(){
        let addcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.addBikeLight);
        await addcart.click();
    }

    async addFleeceJacket(){
        let addcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.addFleeceJacket);
        await addcart.click();
    }

    async addOnesie(){
        let addcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.addOnesie);
        await addcart.click();
    }

    async shoppingCart(){
        await this.driver.wait(until.elementLocated(ADDCART_LOCATORS.selectors.shoppingcart, 5000));
        let shoppingcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.shoppingcart);
        await shoppingcart.click();
    }

    async backpackImage(){
        let backpackImage = await this.driver.findElement(ADDCART_LOCATORS.selectors.backpackImage);
        await backpackImage.click();
    }

    async backpackName(){
        let backpackName = await this.driver.findElement(ADDCART_LOCATORS.selectors.backpackName);
        await backpackName.click();
    }

    async addToCart(){
        let addtoCart = await this.driver.findElement(ADDCART_LOCATORS.selectors.addtoCart);
        await addtoCart.click();
    }

    async assertAddProductsuccess(){
        await this.driver.wait(until.elementLocated(ADDCART_LOCATORS.selectors.inventoryItem, 5000));
        let inventoryItem = await this.driver
        .findElement(ADDCART_LOCATORS.selectors.inventoryItem);
        let inventoryItemName = await inventoryItem.getText();
        assert.strictEqual(inventoryItemName, 'Sauce Labs Backpack');
    }

    async assertAddMultipleProductsuccess(){
        await this.driver.wait(until.elementLocated(ADDCART_LOCATORS.selectors.cartList,5000));
        let cartList = await this.driver.findElements(ADDCART_LOCATORS.selectors.cartList);
        assert.strictEqual(cartList.length, 4);
        
        let itemNames = await this.driver.findElements(ADDCART_LOCATORS.selectors.inventoryItem);
        assert.strictEqual(await itemNames[0].getText(), 'Sauce Labs Backpack');
        assert.strictEqual(await itemNames[1].getText(), 'Sauce Labs Bike Light');
        assert.strictEqual(await itemNames[2].getText(), 'Sauce Labs Fleece Jacket');
        assert.strictEqual(await itemNames[3].getText(), 'Sauce Labs Onesie');
    }

    async assertRemoveButtonisDisplayed(){
        let removeBackpackButton = await this.driver.findElement(ADDCART_LOCATORS.selectors.removeBackpackButton);
        assert.strictEqual(await removeBackpackButton.isDisplayed(), true);
    }

    async assertAddButtonisNotDisplayed(){
        let addBackpackButton = await this.driver.findElements(ADDCART_LOCATORS.selectors.addBackpack);
        assert.strictEqual(addBackpackButton.length, 0);
    }

    async assertDuplicateProductNotAdded(){
        let shoppingcart = await this.driver.findElement(ADDCART_LOCATORS.selectors.shoppingcart);
        await shoppingcart.click();
        
        await this.driver.wait(until.elementLocated(ADDCART_LOCATORS.selectors.cartList, 5000));
        let cartItems = await this.driver.findElements(ADDCART_LOCATORS.selectors.cartList);
        assert.strictEqual(cartItems.length, 1);
    }
};

module.exports = addcartPage;