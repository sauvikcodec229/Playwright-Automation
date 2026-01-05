const { test, expect, request } = require('@playwright/test');

test('Scenario: Screenshots and Visual Comparison',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
   
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // to navigate to the given url
     
     await page.waitForTimeout(2000);
     const username = page.locator("#username");
     const signIn = page.locator("#signInBtn");
     const password = page.locator("[type='password']");

     await username.fill("rahulshetty");
     await password.fill("learning");
     

     const dropdown = page.locator("select.form-control");
     await dropdown.selectOption("consult");//To select an option from dropdown, we need to pass the value attribute of that option inside this function. 
     //For select/static dropdowns , it will surely have a value attribute

     

     await page.screenshot({path:"screenshots/screenshot.png"}); //screenshot for whole page
     await page.locator("select.form-control").screenshot({path:"screenshots/screenshot.png"}); //locator level sreenshot
     await signIn.click();
     await page.waitForTimeout(2000);

}); 

test.skip("Visual Testing",async ({page})=>
{

    //On first run this test case will fail since in first run u havent clicked any old image
    // , but what it will do is after failing, it will store it in this project and next time going onwards
    //it will take that first image as a reference for comparison.
    await page.goto("Your URL");
    expect(await page.screenshot()).toMatchSnapshot("your_old_screenshot.png");

});