const {test, expect,request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

//Sometimes the storing of the api tokens is not simple like how we saw in rahul shetty application 
//under local storage. In some banking applications, developers store the session ids in a more complex and 
//distributed manner. It can be combination of local storage, session storage and cookies also
// So rather than sitting and breaking our minds in figuring out which is the proper token to carry forward
//playwrght has introduced one method called storageState() which will save the entire content of cookies,
//session storage, local storage, etc once we login.
//WE can store that info in a JSON file and next time when we need to login, we can directly inject that JSON file directly into the browser

let webContext;
let orderID;

test.beforeAll("Logging in", async ({browser}) =>
{
  const context = await browser.newContext();
  const page =  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
  await page.waitForTimeout(2000);
  const username = page.locator("#userEmail");
  const passwrod = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");
  
  await username.fill("raunak12345@gmail.com");
  await passwrod.fill("Raunak@12345");
  await loginBtn.click();

  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item
  
  //This setting is for browser context level and not on page level.This is obvious becoz we cant have cookies
  //for each and every page, we will have them for the entire context/browser. In that how many 
  //ever pages we open will get access to those cookies and other session details.
  await context.storageState({path:"state.json"});
  webContext = await browser.newContext({storageState:"state.json"});

 
});

//Now we need to invoke a browser by using this state.json file

test("Creating order",async ()=>
{
   
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
    await page.waitForTimeout(2000);
    await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item
  
    const allProductsParentLocator = page.locator("div.card-body");
    
    const productName = "ZARA COAT 3";
  
  
    await page.locator("div.card-body").filter({hasText:productName}).getByRole("button",{name:'Add to Cart'}).click();
  
    const cartButton = page.getByRole("listitem").getByRole('button',{name:'Cart'});
    await cartButton.click();
  
     await page.locator("div li").nth(0).waitFor();//we are doing this because auto wait is not there for isVisible() in the next line
  
    //Assertion to check if our product has been added to cart or not
    await expect(page.getByText(productName)).toBeVisible();
  
    //Clicking on checkout button
    const checkOutBtn = page.getByRole("button",{name:"Checkout"});
    await checkOutBtn.click();
  
    const selectCntry = page.getByPlaceholder("Select Country");
    await selectCntry.pressSequentially("ind");
  
    await page.getByRole("button",{name:"India"}).nth(1).click();
  
    console.log("The selected country is : "+await page.locator("input[placeholder*='Country']").inputValue());
    await expect(page.locator("input[placeholder*='Country']")).toHaveValue("India");
  
    //Validating email in Shipping information
  
    const shippingInfoEmail = page.locator(".user__name [type='text']");
    await expect(shippingInfoEmail.nth(0)).toHaveText("raunak12345@gmail.com");
  
    //Entering CVV code Here we are using +input to get the immediate next sibling of this CVV Code
    const cvvInput = page.locator("div.form__cc div[class='title']:has-text('CVV Code ') + input");
    await cvvInput.fill("930");
  
    //Clicking on place order button
    const placeOrder  = page.getByText("PLACE ORDER");
    await placeOrder.click();
  
  
    //Assertion to verify successful order
    await page.locator(".hero-primary").waitFor();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  
    //Grabbing the orderId and storing it
     orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     orderID = orderID.trim().split(" ")[1];
     console.log("The orderID is :"+orderID);
});