const {test, expect,request} = require('@playwright/test');

// NOTE: For running the script in ide debug mode press, :shift+ctrl+B or shift+cmd+B
//Then choose "Debug npm script"



//we are creating this JSON payload as one javascript object
const loginPayload = {userEmail: "raunak12345@gmail.com", userPassword: "Raunak@12345"};
const orderPayload = { orders: [
        {
            country: "India",
            productOrderedId: "68a961459320a140fe1ca57a"
        }]
};

let token;
let orderID;

//before all the tests get executed , this will get executed only once
test.beforeAll("Web API Call For Logging in", async () =>
{
    //using this request object you will be able to call apis and work with api responses
   const apiContext = await request.newContext(); //if we have anything(info) to send ex:headers, proxies,http credentials, any existing plugins
    // we can send as parameter in this context
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data:loginPayload,
    } );//200, 201...these will make sure our request is  a success

   expect(loginResponse.ok()).toBeTruthy();  //.ok() checks for all positive success status codes
   const loginResponseJSON = await loginResponse.json();
   token = loginResponseJSON.token;
   console.log(token);


   //this storage of token may differ from app to app, in some it can be stored in local storage,
  //  sometimes in session storage or sometimes in cookies

});


test.beforeAll("Web API Call for Creating Order ID", async () =>
{
  // NOTE: Here we need to pass the previous login token as part of authorisation value
  // so that the API knows that this order is created for which user
  //using this request object you will be able to call apis and work with api responses
   const apiContext = await request.newContext(); //if we have anything(info) to send ex:headers, proxies,http credentials, any existing plugins
    // we can send as parameter in this context
   const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data:orderPayload,
      headers:{
        'Authorization':token,
        'Content-Type':'application/json'
      },
      
    } );//200, 201...these will make sure our request is  a success

   expect(createOrderResponse.ok()).toBeTruthy();  //.ok() checks for all positive success status codes
   const createOrderResponseJSON = await createOrderResponse.json();
   console.log(createOrderResponse);
   orderID = createOrderResponseJSON.orders[0];
   console.log(token);


   //this storage of token may differ from app to app, in some it can be stored in local storage,
  //  sometimes in session storage or sometimes in cookies

});


//before each test this block of code will run
test.beforeEach( ()=>
{

});


test("@Api Scenario: Application Login using Special Selectors",async ({page})=>
{
  
  //Just as Selenium Playwright also supports Javascript code execution
  //Now using JS code , we need to insert this token/value into our browser application local storage
  //As a cookie with a name and the value will be the token
  // So our function will take an argument value
  // So this below function is taking value as an argument and assigning it into the local storage as token
  await page.addInitScript(value => {
     window.localStorage.setItem('token',value)
  },token);


// when we write this url , it will get bypassed and directly goto dashboard
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

   console.log("The orderID is :"+orderID);


});


test("@Api Scenario: Finding OrderID in Orders Page",async ({page})=>
{
  
  await page.addInitScript(value => {
     window.localStorage.setItem('token',value)
  },token);


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