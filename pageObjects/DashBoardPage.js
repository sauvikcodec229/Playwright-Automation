const {expect} = require('@playwright/test');

class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.allProducts = this.page.locator("div.card-body");
        this.allProductsText = this.page.locator("div.card-body b");
        this.cart = this.page.locator("button[routerlink*='cart']");
        this.myOrdersBtn = this.page.locator("button[routerlink='/dashboard/myorders']");
    }

    async searchProductAddCart(productName) {

        const titles = await this.allProductsText.allTextContents();
        console.log(titles);

        const productCount = await this.allProducts.count();

        for (let i = 0; i < productCount; i++) {
            if (await this.allProducts.nth(i).locator("b").textContent() === productName) {
                
                await this.allProducts.nth(i).locator("text= Add To Cart").click();  //locating through text present in DOM
                await this.page.locator("div[aria-label*='Product Added']").waitFor();
                await expect(this.page.locator("div[aria-label*='Product Added']")).toBeVisible();  //Assertion to check if product got added to cart notification came
                break;
            }
        }


    }

    async navigateToCart()
    {
        await this.cart.click();
        await this.page.locator("div li").nth(0).waitFor();
    }

     async navigateToMyOrdersPage()
    {
        await this.myOrdersBtn.click();
        await this.page.locator("tr.ng-star-inserted").nth(0).waitFor();
    }
}

module.exports ={DashBoardPage};