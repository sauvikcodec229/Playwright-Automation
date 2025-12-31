const {test, expect} = require('@playwright/test');

test('Negative Scenario: Logging into Lambda Test',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.locator("//a[text()='Login']").waitFor()
     const loginLink =  page.locator("//a[text()='Login']");
     loginLink.click();

     await page.locator("input[name='email']").waitFor();
     const userName = page.locator("input[name='email']");
     await userName.fill("test123@gmail.com");

     const password = page.locator("input#password");
     await password.fill("test@12345");

     const loginButton = page.locator("button#login-button");
     loginButton.click();

    //Unlike Selenium we dont need to mention any explicit wait here for visibility of the error msg
    // Even though initially this error msg will nt be displayed until we give the wrong password
    // Playwright has this inbuilt feature of auto wait to wait for sometime for this element to show up.
     const errorText = page.locator("p[data-testid='errors-password']");
     const errorMsg = await errorText.textContent();
     console.log("The Error msg displayed for entering wrong password is : "+errorMsg);

     await expect(page.locator("p[data-testid='errors-password']")).toContainText("Please enter a correct email address and password");

    
});  

test('Scenario: using nth() for locator which identifies multiple elements',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
     
     const category1 = page.locator("div[class^='inline-block dropdown']").nth(1);
     const category1Text = await category1.locator("button").nth(0).textContent();
     console.log("The Content is :"+category1Text)

     const category2 = page.locator("div[class^='inline-block dropdown']").nth(2);
     const category2Text = await category2.locator("button").nth(0).textContent();
     console.log("The Content is :"+category2Text)

});  


test('Scenario: How to capture list of multiple elements',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
     
     const allCategories = await page.locator("div[class^='inline-block dropdown'] button").allTextContents();
     console.log("All the categories are :"+allCategories);
     

});  


test('Scenario: waitForLoadState for waiting until network comes to idle state',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.
    // Once all the network calls are succcessfully made, the data will be completely loaded onto page and the network will be idle
    // Normally, when we try to fetch a single element, playwright will auto wait for sometime until it gets laoded up
    // But in case of allTextContents(), multiple elements are returned, so basically it returns a list.
    // Now a list may or may not be empty. There is no harm in that. But if the page is not loaded up properly and playwright
    // tries to capture the elements, it can give an empty list. Test might pass but its not right, becoz the elements have not loaded up
    // So to avoid this thing, we use a method called waitForLoadState() to check if the network becomes idle
    // becoz when a page gets loaded up, multiple network calls will be made, so until the network calls are done
    // the page will still be in  a state of loading. Only when the network becomes idle(all webservice calls are done), we can confirm that
    // yes the page has now completely loaded up, so now we can capture all elements and they can be interacted with.

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
     
     await page.waitForLoadState('networkidle'); // This is little bit flaky.Only if for 500ms there have no network calls been made, it will be considered idle
     const allCategories = await page.locator("div[class^='inline-block dropdown'] button").allTextContents();
     console.log("All the categories are :"+allCategories);

     page.locator("div[class^='inline-block dropdown'] button").nth(0).waitFor();//For waiting for a single element to load up
     

});  


