const {test, expect} = require('@playwright/test');

//strict-mode violation error comes for multiple elements getting detected
let orderID;

test("Scenario: Application Login",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
  const username = page.locator("#userEmail");
  const passwrod = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");
  
  await username.fill("anshika@gmail.com");
  await passwrod.fill("Iamking@000");
  await loginBtn.click();
//   await page.waitForLoadState("networkidle");
  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

  const allProductsParentLocator = page.locator("div.card-body");
  const productCount = await allProductsParentLocator.count();
  const productName = "ZARA COAT 3";

  for(let i=0;i<productCount;i++)
  {
      if(await allProductsParentLocator.nth(i).locator("b").textContent()===productName)
      {
        //   await allProductsParentLocator.nth(i).locator("i[class*='shopping-cart']").click();
        //                             (or)         we can use any of them
             await allProductsParentLocator.nth(i).locator("text= Add To Cart").click();  //locating through text present in DOM
             await page.locator("div[aria-label*='Product Added']").waitFor();
             await expect(page.locator("div[aria-label*='Product Added']")).toBeVisible();  //Assertion to check if product got added to cart notification came
             break;
      }
  }

  const cartButton = page.locator("button[routerlink*='cart']");
  await cartButton.click();

// After we click on cart, there is a small delay to show up the cart items. So we need to give a wait until atleast one item of cart shows up
   await page.locator("div li").nth(0).waitFor();//we are doing this because auto wait is not there for isVisible() in the next line

  //Assertion to check if our product has been added to cart or not
  //Another way of locating through text with the help of tag
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();  //has-text is called as pseudo class
  await expect(bool).toBeTruthy();

  //Clicking on checkout button
  const checkOutBtn = page.locator("button:has-text('Checkout')");
  await checkOutBtn.click();

  //Dynamic dropdowns: When we start typing , it shows suggestions in the dropdown, we need to select from that
  // In these kinds of dropdowns when u fill the text directly, the suggestions will not show up.We need to fill character by character.
  //So if we need to press keys one by one, we need to use pressSequentially() method of playwright
  const selectCntry = page.locator("input[placeholder*='Country']");
  await selectCntry.pressSequentially("ind");
// await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 }); use this in case the application server is slow
// Here, a delay of 150 milliseconds is introduced between each key press

  // Once we type sequentially, we need to wait until the suggestion dropdown opens up
  const suggestionWndow = page.locator("section.ta-results"); 
  await suggestionWndow.waitFor();

  const allSuggestions = page.locator("section[class*='ta-results'] span");
  for(let i=0;i< await allSuggestions.count();i++)
  {
     if(await allSuggestions.nth(i).textContent()===" India")  //Now in this small window of options we need to choose India
     {
        await allSuggestions.nth(i).click();
        break;
     }
  }

  console.log("The selected country is : "+await page.locator("input[placeholder*='Country']").inputValue());
  await expect(page.locator("input[placeholder*='Country']")).toHaveValue("India");

  //Validating email in Shipping information

  const shippingInfoEmail = page.locator(".user__name [type='text']");
  await expect(shippingInfoEmail.nth(0)).toHaveText("anshika@gmail.com");

  //Entering CVV code Here we are using +input to get the immediate next sibling of this CVV Code
  const cvvInput = page.locator("div.form__cc div[class='title']:has-text('CVV Code ') + input");
  await cvvInput.fill("930");

  //Clicking on place order button
  const placeOrder  = page.locator(".action__submit");
  await placeOrder.click();


  //Assertion to verify successful order
  await page.locator(".hero-primary").waitFor();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  //Grabbing the orderId and storing it
   orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   orderID = orderID.trim().split(" ")[1];
   console.log("The orderID is :"+orderID+"#");


});


test("Scenario: Finding OrderID in Orders Page",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
  const username = page.locator("#userEmail");
  const passwrod = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");
  
  await username.fill("anshika@gmail.com");
  await passwrod.fill("Iamking@000");
  await loginBtn.click();
//   await page.waitForLoadState("networkidle");
  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();

  await page.locator("tr.ng-star-inserted").nth(0).waitFor();

  const allOrders = page.locator("tr.ng-star-inserted");
  let found = false;
  for(let i =0;i<await allOrders.count();i++)
  {
    if(await allOrders.nth(i).locator("th").textContent()===orderID)
    {
        console.log("Order Found!! The order details are: \n");
        console.log("OrderID: "+orderID);
        console.log("Name : "+await allOrders.nth(i).locator("td").nth(1).textContent());
        console.log("Price : "+await allOrders.nth(i).locator("td").nth(2).textContent());
        console.log("Ordered Date : "+await allOrders.nth(i).locator("td").nth(3).textContent());
        await allOrders.nth(i).locator("td").nth(4).locator("button").click();
        found=true;
        break;
    }
  }

  if(found===false)
    console.log('The OrderID is not found');

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(await orderID.includes(orderIdDetails)).toBeTruthy();



});