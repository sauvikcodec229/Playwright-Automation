const { test, expect } = require('@playwright/test');
const { pageObjectManager } = require("../pageObjects/pageObjectManager");
const fs = require('fs');
const path = require('path');
const dataFilePath = path.resolve(__dirname, "../utils/POM_testData.json"); //saving my JSON file path
const dataSet = JSON.parse(JSON.stringify(require(dataFilePath))); //converting JSON to JS object


let orderID;

test.describe.configure({mode:'serial'});

//################## Placing orders for different items #######################

for (const data of dataSet) { //iterating thorugh the dataSet array, 1st iteration we will get the data of Zara Coat 4 from json file, and so on

    test(`@Web Scenario: Creating Order for ${data.productName}`, async ({ page }) => {  //Here test namingnis also dynamically being done here

        const pageManager = new pageObjectManager(page);
        const loginPage = pageManager.getLoginPage();
        const dashboardPage = pageManager.getDashboardpage();
        const cartPage = pageManager.getCartPage();
        const paymentPage = pageManager.getPaymentPage();
        const orderConfirmationPage = pageManager.getOrderConfirmationPage();

        loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");

        await page.waitForTimeout(2000);

        await loginPage.validLogin(data.username, data.password);  //using data as the loop variable
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        await cartPage.validateProductInCart(data.productName);
        await cartPage.doCheckOut();
        await paymentPage.selectCountryFromSuggestion(data.country);
        await paymentPage.validateShippingInfoEmail(data.username);
        await paymentPage.enterCVV();
        await paymentPage.placeProductOrder();
        await orderConfirmationPage.validateOrderConfirmation();

        //Grabbing the orderId and storing it in the testData JSON
        data.orderID = await orderConfirmationPage.returnParsedOrderID();

    });
}


//##############Writing the generated orderIDs back to JSON ##################

test("@Web Writing the Modified Data from memory to Actual JSON File",async () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(dataSet, null, 2), 'utf-8');  //this null, 2 is for pretty printing the JSON file(Not necessary but looks good)
    console.log('All updated OrderIDs written back to JSON file.');
});

//############################### Finding the orders ##############################

for (const data of dataSet) {

    test(`@Web Scenario: Finding OrderID ${data.orderID} in Orders Page`, async ({ page }) => {

        const pageManager = new pageObjectManager(page);
        const loginPage = pageManager.getLoginPage();
        const dashboardPage = pageManager.getDashboardpage();
        const allOrdersPage = pageManager.getAllOrdersPage();

        loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.waitForTimeout(2000);
        await loginPage.validLogin(data.username, data.password);  //using data as the loop variable
        await dashboardPage.navigateToMyOrdersPage();
        await allOrdersPage.findAndViewMyOrder(data.orderID);
    });

}


