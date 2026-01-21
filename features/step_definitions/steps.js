const { Given, When, Then } = require('@cucumber/cucumber');
const { pageObjectManager } = require("../../pageObjects/pageObjectManager");
const { expect } = require('@playwright/test'); //This uses object destructuring to extract a property
//  named "expect" from the exported object of the module. So basically we are exporting a property

const playwright = require('@playwright/test'); // will give you the entire module object,
//  so you'd access things like playwright.test, playwright.expect, etc.So bascially
//  here we exporting an entire module object


//Cucumber JS also allows us to put specific timeouts specific to a particular step definition
Given('I login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    // this.pageManager = new pageObjectManager(this.page); // "this." is the WORLD CONSTRUCTOR.
    //As long as we are in the same scenario, playwright can share these variables defined as
    //part of world constructor in all the step definition functions. These variables are actually part
    //of World Constructor so their scope is throughout this Class

    this.loginPage = this.pageManager.getLoginPage();
    await this.loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.waitForTimeout(2000);
    this.username = username;
    this.password = password;
    await this.loginPage.validLogin(username, password);
});

When('Add {string} to the cart', async function (product) {
    this.dashboardPage = this.pageManager.getDashboardpage();
    await this.dashboardPage.searchProductAddCart(product);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in the cart', async function (product) {
    const cartPage = this.pageManager.getCartPage();
    await cartPage.validateProductInCart(product);
    await cartPage.doCheckOut();

});

When('I do the payment for the product and place the order for {string}', async function (country) {
    const paymentPage = this.pageManager.getPaymentPage();
    await paymentPage.selectCountryFromSuggestion(country);
    await paymentPage.validateShippingInfoEmail(this.username);
    await paymentPage.enterCVV();
    await paymentPage.placeProductOrder();
});


Then('I verify the order is successfully placed', async function () {
    const orderConfirmationPage = this.pageManager.getOrderConfirmationPage();
    await orderConfirmationPage.validateOrderConfirmation();
    this.orderID = await orderConfirmationPage.returnParsedOrderID();

});


Then('I verify the order in the order history page', { timeout: 100 * 1000 }, async function () {

    const allOrdersPage = this.pageManager.getAllOrdersPage();
    this.loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.waitForTimeout(2000);
    await this.loginPage.validLogin(this.username, this.password);  //using data as the loop variable
    await this.dashboardPage.navigateToMyOrdersPage();
    await allOrdersPage.findAndViewMyOrder(this.orderID);
});


// NOTE: There can be times when we need to pass on a variable from one step to another, we can
//   achieve this in playwright but as long as we ar under the same scenario. We dont need global varibale
// we can still talk in between steps