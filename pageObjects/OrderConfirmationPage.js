const {expect} = require('@playwright/test');

class OrderConfirmationPage
{
    constructor(page)
    {
        this.page = page;
        this.orderConfirmationText = this.page.locator(".hero-primary");
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async validateOrderConfirmation()
    {
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    }

    async returnParsedOrderID()
    {
        let orderid = await this.orderId.textContent();
        orderid = orderid.trim().split(" ")[1];
        console.log("The orderID is :" + orderid);
        return orderid;
    }
}
module.exports={OrderConfirmationPage};