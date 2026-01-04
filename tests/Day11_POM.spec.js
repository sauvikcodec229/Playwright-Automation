// const { test, expect } = require('@playwright/test');
// const {pageObjectManager} = require("../tests/pageObjects/pageObjectManager");
// const dataSet = JSON.parse(JSON.stringify(require("../tests/utils/Day11_POM_testData.json")));

// let orderID;

// for(const data of dataSet)  //iterating thorugh the dataSet array, 1st iteration we will get the data of Zara Coat 4 from json file, and so on
// {

//   test(`Scenario: Application Login ${data.productName}`, async ({ page }) => {  //Here test namingnis also dynamically being done here

//   const pageManager = new pageObjectManager(page);

//   const loginPage = pageManager.getLoginPage();

//   loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");

//   await page.waitForTimeout(2000);
//   await loginPage.validLogin(data.username, data.passwrod);  //using data as the loop variable

//   await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

//   const dashboardPage = pageManager.getDashboardpage();
//   await dashboardPage.searchProductAddCart();

//   await dashboardPage.navigateToCart();


//   await page.locator("div li").nth(0).waitFor();

//   const bool = await page.locator("h3:has-text('"+data.productName+"')").isVisible();  //has-text is called as pseudo class
//   expect(bool).toBeTruthy();

//   //Clicking on checkout button
//   const checkOutBtn = page.locator("button:has-text('Checkout')");
//   await checkOutBtn.click();

//   const selectCntry = page.locator("input[placeholder*='Country']");
//   await selectCntry.pressSequentially("ind");

//   const suggestionWndow = page.locator("section.ta-results");
//   await suggestionWndow.waitFor();

//   const allSuggestions = page.locator("section[class*='ta-results'] span");
//   for (let i = 0; i < await allSuggestions.count(); i++) {
//     if (await allSuggestions.nth(i).textContent() === " India")  //Now in this small window of options we need to choose India
//     {
//       await allSuggestions.nth(i).click();
//       break;
//     }
//   }

//   console.log("The selected country is : " + await page.locator("input[placeholder*='Country']").inputValue());
//   await expect(page.locator("input[placeholder*='Country']")).toHaveValue("India");

//   //Validating email in Shipping information

//   const shippingInfoEmail = page.locator(".user__name [type='text']");
//   await expect(shippingInfoEmail.nth(0)).toHaveText("raunak12345@gmail.com");

//   //Entering CVV code Here we are using +input to get the immediate next sibling of this CVV Code
//   const cvvInput = page.locator("div.form__cc div[class='title']:has-text('CVV Code ') + input");
//   await cvvInput.fill("930");

//   //Clicking on place order button
//   const placeOrder = page.locator(".action__submit");
//   await placeOrder.click();


//   //Assertion to verify successful order
//   await page.locator(".hero-primary").waitFor();
//   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

//   //Grabbing the orderId and storing it
//   orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//   orderID = orderID.trim().split(" ")[1];
//   console.log("The orderID is :" + orderID);


// });
// }




// test("Scenario: Finding OrderID in Orders Page", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//   await page.waitForTimeout(2000);
//   const username = page.locator("#userEmail");
//   const passwrod = page.locator("#userPassword");
//   const loginBtn = page.locator("[value='Login']");

//   await username.fill("raunak12345@gmail.com");
//   await passwrod.fill("Raunak@12345");
//   await loginBtn.click();
//   //   await page.waitForLoadState("networkidle");
//   await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

//   const myOrdersBtn = page.locator("button[routerlink*='myorders']");
//   await myOrdersBtn.click();

//   await page.locator("tr.ng-star-inserted").nth(0).waitFor();

//   const allOrders = page.locator("tr.ng-star-inserted");
//   let found = false;
//   for (let i = 0; i < await allOrders.count(); i++) {
//     if (await allOrders.nth(i).locator("th").textContent() === orderID) {
//       console.log("Order Found!! The order details are: \n");
//       console.log("OrderID: " + orderID);
//       console.log("Name : " + await allOrders.nth(i).locator("td").nth(1).textContent());
//       console.log("Price : " + await allOrders.nth(i).locator("td").nth(2).textContent());
//       console.log("Ordered Date : " + await allOrders.nth(i).locator("td").nth(3).textContent());
//       await allOrders.nth(i).locator("td").nth(4).locator("button").click();
//       found = true;
//       break;
//     }
//   }

//   if (found === false)
//     console.log('The OrderID is not found');

//   const orderIdDetails = await page.locator(".col-text").textContent();
//   // expect(await orderID.includes(orderIdDetails)).toBeTruthy();
//   console.log("The orderID is: " + orderIdDetails);



// });