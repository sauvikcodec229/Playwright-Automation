const {test, expect} = require('@playwright/test');//  importing an annotation from playwright jar using "requried"

//this test keyword can now be used an annotation and we have already declared what it means in first line.Its a playwright test annotation
// so the test belongs to the playwright package

//javascript is asynchronous, it means code will not get executed in the same sequence
// step1, step2, step3. In java these 3 steps will get executed sequentially, but in javascript
// it will not wait till the first step gets completed, all the steps can run parallally
// Becoz of this our code can break, so we need to tell the code that hold on wait, till the previous step gets executed completely
// for this we write "await" before every step which tells that , wait till this line of code gets completed

//Whenever we are writing await before each line in the function , we are meaning that the functtion is asynchronous,
// so we need to mention that before the function that its asynchronous by using the "async" keyword
// the "await" keyoword will only work when we write the function as "async"
// If we dont have awaits in our code, then its okay not to mention async but since playwright is dependent on JS and its async , we need to mention

// in newer versions of JS, we dont need to use the keyword "function" to specify that its an anonymous function(function with no name)
// only mentioning ()=> will treat it as an anonymous function

// "browser" is a fixture(global variables) which comes by default for our playwright module. Fixtures are globally available
// to each and every test of our project. There are fixed set of fixtures in playwright which will be automatically available
// here we are passing that "browser" fixture as a parameter in our function to use it.
// to tell the code that its a playwright fixture we need to enclose that keyword inside {}
// if we dont give {} then it will be evaluated as a normal browser string value

//We need now somehting called as "context" or"instance" of a browser, wehn we normally open a chrome browser, we see all the cookies, extensions,etc are already there. we jsut simply navigate to some page
//so while when we run our playwright tests, we also need to create a fresh context/instance of a browser

test('Browser Context Declaration Playwright test',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.

     const context = await browser.newContext();// you can pass cookies, proxies,etc to pass as parameters , so that paywright can preparestart a browser with existing cookies or use proxies.
     //if we dont mention await in prev line then, before the browser instance opens, it will try to navigate to a page which is wrong
     
     const page = await context.newPage(); //on this page we will navigate to our url and start our automation
     page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url

});   


test('Multi Fixture Playwright test',async ({browser,page})=>  // test annotation -> //test('test case name', testFunction)
{
    // We can also pass multiple fixtures inside the function ({fixture1,fixture2,....})
    // The page fixture is associated with its own browser context and browser instance, which Playwright manages for you.
    // If you also pass browser, it refers to a raw browser instance (not to the context or page associated with page).
    // Using both together means the page instance is managed by Playwright, while the browser lets you create new contexts/pages manually.
    
    const context = await browser.newContext(); //this browser fixture in managed by playwright
    const newPage = await context.newPage(); //this page variable is handled by our code
    await newPage.goto("https://www.lambdatest.com/selenium-playground/");

    await page.goto("https://www.geeksforgeeks.org/"); //this page fixture is handled and managed by Playwright
    

    //Here since we are using 1 normal page variable induced from the browser fixture 
    // and one page fixture managed by playwright , 2 separate browsers will open
});   


test('Page fixture declaration without browser fixture Playwright test',async ({page})=>  // test annotation -> //test('test case name', testFunction)
{
     // Now suppose we dont have anything to inject into our new browser instance(ex: no cookies, proxies)
     // Suppose we just want a plain normal default browser instance, what we can do is , instead of writing the first two lines everytime
     // We can introduce another fixture called as "page" by just adding it inside the same curly brace as "browser"
     // We can use this page fixture going forward for navigating to pages and so on
     // Here without mentioning also, automatically playwright will instantiate a fresh browser instance with default parameters
     //  and then in that we open a page fixture

     await page.goto("https://www.google.com/"); // to navigate to the given url

});   

// if we want to run only one test in this .spec.js file, we have a func called .only
// test.only('......'), even if we have 100 test cases, it will only run this one

test('Printing Title Playwright test', async ({page})=>
{
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    const pageTitle = await page.title();
    console.log("The title of the page is : "+pageTitle);
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
});

test.only('Clicking Search in Google', async ({browser})=>
{
    const context = await browser.newContext(); //this browser fixture in managed by playwright
    const newPage = await context.newPage(); //this page variable is handled by our code
    await newPage.goto("https://www.google.com/");

    const searchBar = newPage.locator("textarea[title='Search']");
    await searchBar.fill("Deloitte"); //both methods type() and fill() will work, but go for fill(), now type() is deprecated
    
    newPage.locator("input[value='Google Search'][role='button']").nth(1).click;

});