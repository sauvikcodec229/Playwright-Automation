const {test, expect,request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');


//we are creating this JSON payload as one javascript object
const loginPayload = {userEmail: "raunak12345@gmail.com", userPassword: "Raunak@12345"};
const orderPayload = { orders: [{ country: "India",productOrderedId: "68a961459320a140fe1ca57a"}]};

let response;

test.beforeAll("Web API Call For Logging in", async () =>
{
   const apiContext = await request.newContext(); 
   // Creating an object of a class in JavaScript
   const apiutils = new APiUtils(apiContext,loginPayload);
   response = await apiutils.createOrder(orderPayload); //its return type is an object of two elements , toke and orderID
});


test("Scenario: Finding OrderID in Orders Page",async ({page})=>
{
  
  await page.addInitScript(value => {
     window.localStorage.setItem('token',value)
  },response.token);


// when we write this url , it will get bypassed and directly goto dashboard
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();

  await page.locator("tr.ng-star-inserted").nth(0).waitFor();

  const allOrders = page.locator("tr.ng-star-inserted");
  let found = false;
  for(let i =0;i<await allOrders.count();i++)
  {
    if(await allOrders.nth(i).locator("th").textContent()===response.orderID)
    {
        console.log("Order Found!! The order details are: \n");
        console.log("OrderID: "+response.orderID);
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