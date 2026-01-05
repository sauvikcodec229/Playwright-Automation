const {expect} = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkOutBtn = this.page.locator("button:has-text('Checkout')");
        this.continueShoppingBtn = this.page.locator("button:has-text('Continue Shopping')");
    }


    async validateProductInCart(productName) {
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();  //has-text is called as pseudo class
        expect(bool).toBeTruthy();
    }

    async doCheckOut()
    {
        await this.checkOutBtn.click();
    }

    async clickContinueShopping()
    {
        await this.continueShoppingBtn.click();
    }

}

module.exports = { CartPage };