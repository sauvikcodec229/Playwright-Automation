const {test, expect} = require('@playwright/test');

// There are 2 types of dropdowns: 
// 1. Where options will already be present -> They are called static dropdowns
//    When we inspect we will see the tag name for this kind of dropdown as "Select"   

test('Scenario: Handling dropdowns',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
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
    //  await signIn.click();

     const dropdown = page.locator("select.form-control");
     await dropdown.selectOption("consult");//To select an option from dropdown, we need to pass the value attribute of that option inside this function. 
     //For select/static dropdowns , it will surely have a value attribute

     //This opens a new inspector called playwroght inspector and the test execution will pause before closing the test
    //  await page.pause(); // A separate small window will open called playwright inspector
     

}); 


test.only('Scenario: Handling Radio Buttons',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
// NOTE: await is required only when we are performing any playwright related action.
//  We need to give await only in the scope where playwright related action is performed

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // to navigate to the given url
     
     await page.waitForTimeout(2000);
     const username = page.locator("#username");
     const signIn = page.locator("#signInBtn");
     const password = page.locator("[type='password']");

     await username.fill("rahulshetty");
     await password.fill("learning");

    const radioButton1 = page.locator("label.customradio").nth(0);  //Admin (or) we can use .first()
    const radioButton2 = page.locator("label.customradio").nth(1);   //User (or) we can use .last()
    
    await radioButton2.click();

    const okayButton = page.locator("button#okayBtn");
    await okayButton.click(); //this is a web based popup and not a javascrpt based popup

    //Assertion to check whether the radiobutton is selected or not
    await expect(radioButton2).toBeChecked(); //Here await is written at first becoz action is peformed outside the outer brackets, toBeChecked()
    const isUserChecked = await radioButton2.isChecked(); //It will return boolean true or false
    console.log("The radio button is checked: "+isUserChecked);


    await page.locator("input#terms").waitFor();
    //Check the terms and conditions checkbox
    const checkBox = page.locator("input[name='terms']");
    await checkBox.click();
    //Assertion for checking if the checkbox is ticked
    await expect(page.locator("input[name='terms']")).toBeChecked();
    
    // To uncheck the same checkBox
    await checkBox.uncheck(); //But there is no assertion given by playwright to assert if its unchecked or not
    
    const isNotChecked = await page.locator("input#terms").isChecked(); //it will return false
    console.log("The checkBox is checked: "+isNotChecked);

    // Or we can write all these things in one single line using expect
    expect(await page.locator("input#terms").isChecked()).toBeFalsy();  //Here action is performed inside the brackets ,isChecked(). So await is inside

}); 


test('Scenario: Checking Blinking Text Attribute Value',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
// NOTE: There is a class in html called "blinkingText" which blinks out any link
// So to ensure whether its blinking or not we can check if the locator has a class whose value is "blinkingtext" or not

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // to navigate to the given url
     
     await page.waitForTimeout(2000);
     const username = page.locator("#username");
     const signIn = page.locator("#signInBtn");
     const password = page.locator("[type='password']");

     await username.fill("rahulshetty");
     await password.fill("learning");

    const documentLink = page.locator("a[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
}); 


test('Scenario: Handling Child Windows using Playwright',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
     const context = await browser.newContext(); //original context
     const page = await context.newPage(); 
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // to navigate to the given url

     await page.waitForTimeout(2000);
    const documentLink = page.locator("a[href*='documents-request']"); // locator for Link to open a new page
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    
    // Now after clicking we will get a new page which wil get opened in our original context
    // we are telling the context to wait for an event which is basically a page to get triggered/openeed in the background
    //So when we use this line of code, it will start listening for a page to get opened
    //So we need to click on the link after this line.
    //We cant click on link before this line because in that case the new page has already opened and then we are listening
    //It cant go back to check for already opened event(new page), so we need to give after this
    //Now every step in javascript has a promise: pending, rejected , fullfilled
    //on rejecting and fullfilling a step, it will get completed, only when its pending, it will wait
    //We deliberately want this step to be asynchronous , becoz we want both this step and the next step to go parallelly
    //If we give await, then the JS will wait for this event to be completed, but if its gets completed,
    //Then how will it listen to the next new page opening event,it has to be running parallelly when the next line is getting executed
    //SO wen dont give "await" here
    // WE have something called "promise" array  which ensures all the steps need to be completed together in order to proceed to the next step
    //It will keep on iterating within these 2 steps, it will keep on firing and it will wait until both the below promises are successfully fulfilled
    // So promise.all is used to run more than 1 asynchronous operations in parallel
    const [newPage] = await Promise.all(  //In case it opened 2 new page windows , then we need to capture on LHS like [NewPage1,NewPage2]
        [
            context.waitForEvent('page'), //We are capturing that new page in a variable which will be used in our code
            // Because clicking on this link will open a new page,
            // Before clicking we need to tell playwright to wait for an event for new page
            // Current "page" variable is only having knowledge about the current original page
            documentLink.click(),//This opens a new page
        ]
    );
    // If any of the the promise is rejected the previous step will fail
    // The expectation of this array is that it has to return fulfilled promises ,
    //Now what will be the rseult of a fulfilled promise--> a new page
    //If you see the first promise will return a new event(page) and second promise is just a click which has no return
    //So accordingly we are taking the return type object on the LHS
    

    //So finally we will get a newPage object variable which will denote the new page which has opened

    //Now we want to get a text content of a line in this new page
    const text = await newPage.locator("p.red").textContent();
    console.log("The text content is : "+text);

    //Now lets get the "rahulshettyacademy.com" from the string and use it in the previous original page

    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log("The email is : "+domain);

    //Now we want to add this text domain in the parent page 
    await page.locator("#username").fill(domain);

    //In order to get the text which is not part of DOM but entered dynamically/programmaticaly during runtime, textContent() will not work
    //We need to use inputValue()
    console.log("The input content is : "+await page.locator("#username").inputValue());
}); 