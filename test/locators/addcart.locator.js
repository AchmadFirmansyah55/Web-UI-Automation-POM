const {By} = require('selenium-webdriver');

const ADDCART_LOCATORS = {
    selectors: {
        addBackpack: By.id('add-to-cart-sauce-labs-backpack'),
        addBikeLight: By.id('add-to-cart-sauce-labs-bike-light'),
        addFleeceJacket: By.id('add-to-cart-sauce-labs-fleece-jacket'),
        addOnesie: By.id('add-to-cart-sauce-labs-onesie'),
        shoppingcart: By.className('shopping_cart_link'),
        backpackImage: By.id('item_4_img_link'),
        backpackName: By.id('item_4_title_link'),
        addtoCart: By.xpath('//*[@class="btn btn_primary btn_small btn_inventory"]'),
        removeBackpackButton: By.id('remove-sauce-labs-backpack'),
        inventoryItem: By.className('inventory_item_name'),
        cartList: By.className('cart_item'),
    }
};

module.exports = ADDCART_LOCATORS;