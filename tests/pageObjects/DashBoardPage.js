class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.allProducts = page.locator("div.card-body");
        this.allProductsText = page.locator("div.card-body b");
        this.cart = page.locator("button[routerlink*='cart']");
    }

    async searchProductAddCart(productName) {

        const titles = await this.allProductsText.allTextContents();
        console.log(titles);

        const productCount = await this.allProducts.count();

        for (let i = 0; i < productCount; i++) {
            if (await this.allProducts.nth(i).locator("b").textContent() === productName) {
                
                await this.allProducts.nth(i).locator("text= Add To Cart").click();  //locating through text present in DOM
                await this.page.locator("div[aria-label*='Product Added']").waitFor();
                await expect(thispage.locator("div[aria-label*='Product Added']")).toBeVisible();  //Assertion to check if product got added to cart notification came
                break;
            }
        }


    }

    async navigateToCart()
    {
        await this.cart.click();
    }
}

module.exports ={DashBoardPage};