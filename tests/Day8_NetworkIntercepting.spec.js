const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');

//we are creating this JSON payload as one javascript object
const loginPayload = { userEmail: "raunak12345@gmail.com", userPassword: "Raunak@12345" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakeOrdersPayload = { data: [], message: "No Orders" }; // this is the JSON which will give us that desired msg

let response;

//Normally suppose u have opened an e-comerce website, in that there will be an order section where
//all the orders given will be showed up. When you click on the show orders button, the browser sends
//a request to the server to fetch all the orders. So, when u inspect and go to networking tab, you wil
// see a reponse given by the server which contains all the orders and their details in JSON format
//Now the front end developer reads that response and based on each object value , renders the response
//on the GUI which is tangible and you can interact with.If the order list is empty order={} in that case
//the front end developer renders the msg  "No orders done" on th GUI.

//Now suppose u come across a case where a test accoutn you are using and u need to check a scenario
//where you need to verify the msg "No orders done" which comes when the order list/history is empty
//Now when you try to inspect msg and then check for the text in the webpage and try to assert that, by chance if another
//tester is also using that test accoutnand his/her test cases involves creating an order, then in real time
//when u test , ur test case will fail not becoz ur script is incorrect but becoz of data issues, 
//the prerequisite that no order should be done is not being followed becoz of another tester.

//In Playwright there is a way to intercept the response, i.e. before the server sends all the order
//details as respone, we can intercept it and then we can manipulate the response get something of this sort order={}
//which is empty , then we can validate that msg "No orders done". That is we are trying to intercept/mock and
//inject fake response into the browser so that it renders the required msg

test.beforeAll("Web API Call For Logging in", async () => {
  const apiContext = await request.newContext();
  // Creating an object of a class in JavaScript
  const apiutils = new APiUtils(apiContext, loginPayload);
  response = await apiutils.createOrder(orderPayload); //its return type is an object of two elements , toke and orderID
});

test("Scenario: Faking Response Body by intercepting the response", async ({ page }) => {

  await page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, response.token);


  // when we write this url , it will get bypassed and directly goto dashboard
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item


  //Here we inspect the scenario where we click on the order button to get all the orders, on opening the 
  //network tab , we can get the endpoint for viewing all orders.Then we need to route that endpoint
  //we need to also mention as argument how we want to route
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6958061ec941646b7a7866a7",
    async route => {
      //intercepting respone-> API will give back the response ->(Hijack and insert a fake response)
      //That response we are sending to browser -> using that response browser will render the data on the front end
      // Now our job is to hijack the response before it reaches the browser and insert a fake response and send to browser
      //WE dont have control on the server but we have it on browser , so using playwright we can insert a fake response

      //Now if we want to turn our page into a state where it can make api calls we need to use page.request
      const response = await page.request.fetch(route.request());  //what response we are fetching, we are fetching the response of the api call for
      //  getting all orders, that route is stored in the variable route and we are using here route.request
      //becoz we are only dealing with the request and not any other things here

      let body = JSON.stringify(fakeOrdersPayload);//The payload what we are sending needs to be a JSON object and the one which we have above is a JS object
      await route.fulfill( //now while fulfilling we need to hijack and chagne the response
        {
          response,
          body,
        }
      ) // we are fulfilling by send that response to browser and then it will automatically render on to front end
    }
  );


  //WE have to do the prev logic before we click on order, becoz playwright will be listening when that routing call is made
  //And that is made the moment we click on this MyOrders button

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();

  //NOTE: Sometimes we can get the error: " Request Context Disposed"
  //WE get this when the original response returned by the server is little late, 
  //and we already before even receiving the original one send the fake one to the browser and then
  //once the original comes , it again gets sent to the browser. So the browser gets confused which one is the correct one

  //So the solution to this is waiting until we get the response for the get-order request which we have defiend above
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  // https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6958061ec941646b7a7866a7
  // NOTE: The ID at the end of this request is unique to me/this user. So we can put a "*" to tell accept anythign here
  await page.locator(".mt-4").waitFor();
  console.log(await page.locator(".mt-4").textContent());

});


//Whenever you click on any webelement, a request will get formed to send to the server
//Suppose you are on orders page, so for each unqiue orderID, the endpoint will have that id attached to the end
//That endpoint which the request is being sent will have ur unique orderID/token attached to it as part of request.
//Now what hackers do is, they somehow get this GET request and change that orderID and attach any other to it
//https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=695a5156c941646b7a7cc501  --> this id is the order id

test("Scenario: Security test Faking Request Body by intercepting the Request", async ({ page }) => {

  //To intercept the request and change the id and assign any others orderID to get the error msg from server: Unauthorized user
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, response.token);


  // when we write this url , it will get bypassed and directly goto dashboard
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();
  await page.locator("button:has-text('View')").nth(0).waitFor();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=randomOrderNumber" })
    //we are telling once you encounter this type of API CALL,
    // pause update the modified endpoint(becoz its GET) then you
    //  continue the route but with the modified endpoint
    //Now the GUI will be rendered based on this modified/intercepted request
    //Here we are intercepting before even the request reaches the server
  );


  const viewBtn = page.locator("button:has-text('View')").nth(0);
  await viewBtn.click();

  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
  console.log(page.locator("p").last().textContent());



});


//Now we try to abort the response, i.e. when the server sends a response back , we will block it to
//ensure it never reaches the browser at all


test("Scenario: Aborting the response so that it doesnt reach the browser", async ({browser}) => {

  
     const context = await browser.newContext();
     const page = await context.newPage(); 
     
     //Blocking css
     //If you see that in ur test case css doesnt impact it, or do not have significance then go ahead and block all css requests , like below
    //  await page.route("**/*.css",route=>route.abort());  //regular expression for any url (anything before slash and anything after slash 
    //Blocking images
     await page.route("**/*.{jpg,png,jpeg}",route => route.abort());

     // WE can print all our request and response calls using playwright
     page.on('request',request=>console.log(request.url())); //Start listening to all request calls and get the url
     page.on('response',response=>console.log(response.url()+" Status Code: "+response.status()));  //Start listening to all responses and print their status codes

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // to navigate to the given url
     
     await page.waitForTimeout(2000);

     const username = page.locator("#username");
     const signIn = page.locator("#signInBtn");
     const password = page.locator("[type='password']");

     await username.fill("rahulshetty");
     await password.fill("learning");
     await signIn.click();

});
