const {test, expect} = require('@playwright/test');

//strict-mode violation error comes for multiple elements getting detected
let orderID;

test("Scenario: Application Login using Special Selectors",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
  await page.waitForTimeout(2000);
  const username = page.getByPlaceholder("email@example.com");
  const passwrod = page.getByPlaceholder("enter your passsword");

  const loginBtn = page.getByRole("button",{name:'Login'});
  
  await username.fill("anshika@gmail.com");
  await passwrod.fill("Iamking@000");
  await loginBtn.click();

  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

  const allProductsParentLocator = page.locator("div.card-body");
  
  const productName = "ZARA COAT 3";

//  In the previous code, we used a for loop to iterate through all the cards and match the text
// Here we will use filter() and do in one line
await page.locator("div.card-body").filter({hasText:productName}).getByRole("button",{name:'Add to Cart'}).click();

//We are addig listitem becoz there are many buttons which has the "Cart" keyword inside it, ex: Add to Cart also has cart
//But we want the button with only cart, which when we inspected we saw it was present under parent tag list <li....>, so we gave listitem first
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
  await expect(shippingInfoEmail.nth(0)).toHaveText("anshika@gmail.com");

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


test("Scenario: Finding OrderID in Orders Page",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
  await page.waitForTimeout(2000);
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
  console.log("The actualy orderID is: "+orderIdDetails);
//   expect(await orderID.includes(orderIdDetails)).toBeTruthy();

});