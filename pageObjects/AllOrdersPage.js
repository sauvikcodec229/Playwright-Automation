const {expect} = require('@playwright/test');
class AllOrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.allOrders = this.page.locator("tr.ng-star-inserted");
    }

    async findAndViewMyOrder(orderID)
    {
        let found = false;
        for (let i = 0; i < await this.allOrders.count(); i++) {
            if (await this.allOrders.nth(i).locator("th").textContent() === orderID) {
                console.log("Order Found!! The order details are: \n");
                console.log("OrderID: " + await this.allOrders.nth(i).locator("th").textContent());
                console.log("Name : " + await this.allOrders.nth(i).locator("td").nth(1).textContent());
                console.log("Price : " + await this.allOrders.nth(i).locator("td").nth(2).textContent());
                console.log("Ordered Date : " + await this.allOrders.nth(i).locator("td").nth(3).textContent());
                await this.allOrders.nth(i).locator("td").nth(4).locator("button").click();
                found = true;
                break;
            }
        }

        if (found === false)
            console.log('The OrderID is not found');

        const orderIdDetails = await this.page.locator(".col-md-6 .col-text").textContent();
        expect(await orderID.includes(orderIdDetails)).toBeTruthy();
        console.log("The orderID is: " + orderIdDetails);
    }
}

module.exports={AllOrdersPage};