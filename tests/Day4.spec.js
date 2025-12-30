const {test, expect} = require('@playwright/test');

test("Special Locators", async ({page})=>
{
    // NOTE: All these selectors will work only if the DOM structure have these attributes and tags
    // For editboxes, the label or the placeholder or any tag or attribute should be associated with that input text box
    // Then only we can use these functions to enter text. It should not be like there is a text box
    // But on top of that one name is written and that name is associated with abel or placeholder
    //that will not work, that name shud be written inside the text box , then only we can get that text box
    //by these methods and enter data inside it
   await page.goto("https://rahulshettyacademy.com/angularpractice/"); 
   //If a webelement has a label tag and an associated text with it
   // , then we can get that element by using getByLabel() in playwright
   await page.getByLabel("Check me out if you Love IceCreams!").click();
//    await page.getByLabel("Employed").click();
   await page.getByLabel("Employed").check();// we can use check() also instead of click() if its a chekbox or radiobutton
   
   //When there is any edit box associated with label, we cant use getByLabel, we need to only use for checkbox or radio button
   //or for selecting options and the options shud be within the select tab
   await page.getByLabel("Gender").selectOption("Male");

   //Another way of using selector is getByPlaceHolder(), only if our DOM structure has this attribute
   await page.getByPlaceholder("Password").fill("MyPassword123");

   //getByRole()
   //NOTE: an element is a button if either its tag is a button or the class has a value "btn-...", it can like this also, <input class="btn...">
   await page.getByRole("button",{name:'Submit'}).click(); //giving the name of the button as 2nd arg object

//    If we have a text present on the page, we have a method which will scan the entire page to look
// for that text. We can go to any text by using this method and passing the text content
  const isSuccess = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  console.log("Did the test pass :"+isSuccess);

// We can also click on a link having a text/name by using getByRole()
await page.getByRole("link",{name:"Shop"}).click();

//Now if we have a list of cards or items, like when we search for an item in a ecommerce site, 
// how we get all the items as a list where each list has multiple infos related to that item
// WE can get a specific item, without iterating and checking how we did earlier. We dont need to use the
//for loop. WE can use .filter({})
//here basically, playwright will apply getByText() in all the elements detected by page.locator("app-card")
// and then filter and give the one which has "Nokia Edge" as text
 await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click(); 
 //This basically clicks on the button which is present in the card having text "Nokia Edge"


});