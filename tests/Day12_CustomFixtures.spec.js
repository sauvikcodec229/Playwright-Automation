const { test, expect } = require('@playwright/test');
//Now instead of importing this test from playwright/test, we will import our custom test whicb will give us our custom fixture
const {customTest} = require("../utils/test-base");

const { pageObjectManager } = require("../pageObjects/pageObjectManager");

//People generally , for every test case they prepare the test data as a fixture in the test-base.js file
//SO if we have 40 tests then we will create  40 properties like this inside our custom "base.text.extend" 

// Q>Can we customise our test behaviour?
// Ans> Yes we can do that by first using the properties if 'test' as the base and then top of that 
//add our own custom fxitures/properties which is our test data which will result in a 'customTest' 
//hence we can use it. Our test will behave in that way then

 customTest("Scenario: Creating Order for product", async ({ page,testDataForOrder }) => {  //Here test naming is also dynamically being done here

        const pageManager = new pageObjectManager(page);
        const loginPage = pageManager.getLoginPage();
        const dashboardPage = pageManager.getDashboardpage();
        const cartPage = pageManager.getCartPage();
        const paymentPage = pageManager.getPaymentPage();
        const orderConfirmationPage = pageManager.getOrderConfirmationPage();

        loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");

        await page.waitForTimeout(2000);

        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);  //using data as the loop variable
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
        await cartPage.validateProductInCart(testDataForOrder.productName);
        await cartPage.doCheckOut();
        await paymentPage.selectCountryFromSuggestion(testDataForOrder.country);
        await paymentPage.validateShippingInfoEmail(testDataForOrder.username);
        await paymentPage.enterCVV();
        await paymentPage.placeProductOrder();
        await orderConfirmationPage.validateOrderConfirmation();

        //Grabbing the orderId and storing it in the testData JSON
        data.orderID = await orderConfirmationPage.returnParsedOrderID();

    });