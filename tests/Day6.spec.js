const {test, expect} = require('@playwright/test');

test("Scenario: Handling Calenders",async ({page})=>
{
  const month ="4";
  const date ="21";
  const year ="1999";
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers"); 
 
  const calender= page.locator("div.react-date-picker");
  await calender.click();

  const monthYear = page.locator("button[class='react-calendar__navigation__label']");
  await monthYear.click(); // To get one year
  await monthYear.click(); //Again clicking to get range of years

  const calenderPrevBtn = page.locator("button.react-calendar__navigation__prev-button");
  let dateFound=false;
  do
  {
    //Now we need to choose our year out of all the years shown
    if(await page.getByText(year).isVisible())
    {
        dateFound=true;
        await page.getByText(year).click();
        break;
    }
    else
        await page.locator("button.react-calendar__navigation__prev-button").click();
  }while(!dateFound);
  
  //Lets get a locator to get all the months of the year
  const allMonths = page.locator("button.react-calendar__year-view__months__month");
  await allMonths.nth(Number(month)-1).click(); //We are doing minus 1 becoz all the months are stored in an array where index starts from 0

  const givenDay = page.locator("//abbr[text()='"+date+"']");
  await givenDay.click();

   //Asserting the year
   const expectedList = [month,date,year];
   const inputs = page.locator("input[class*='react-date-picker__inputGroup__input']");

   for(let i=0;i< expectedList.length;i++)
   {
      const value = await inputs.nth(i).inputValue();
      expect(value).toEqual(expectedList[i]);
   }

});

test("Scenario: Asserting Hidden elements",async ({page})=>
{
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();//will assert whether element is visible or not
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.goForward();

});

test("Scenario: Handling Alert Popups/Dialogs",async ({page})=>
{
    //How to handle javascript popups, which cant be spied i.e. no html element can be found for them
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     
    
    //The on() method under page will help us to listen for events
     //We will need to tell playwright beforehand to listen for a javascript event such as dialogbox
     //When an event happens it will immediately listen to it and tell that hey an event has occurred
     //Then based on the action given , it will perform it on that dialog box which is the event which we have mentioned.
      page.on('dialog',dialog => dialog.accept());
    //page.on('dialog',dialog => dialog.dismiss());

    //Once we have told playwright to start listening , now we can go ahead and do the action which will
    //bring that popup/dialog box

    await page.locator("#confirmbtn").click();

});

test("Scenario: Performing Mouse Hover",async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     
    await page.locator("#mousehover").hover();

});


test("Scenario: Handling Frames",async ({page})=>
{ //When we navigate to our website first time, our page will have control over this mainframe originally
  //In some websites they will attach child frame on the main frame
  //When we automate, our control of automation will be on the original frame and not on the attached child frame
  //In order to perform any action on the new child frame, we need to switch to it

  //Sometimes the frame will be present under a tag called "iframe" or "frameset"
 //  To switch to that frame, we need a name or id attribute to be present
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     
    const framePage = page.frameLocator("#courses-iframe"); //this will switch to the frame with the id given inside function
    //this new frame page object will be returned which we need to use for performing
    // any automation inside the frame


    //Note: If you have come up with a css selector which is highlighting 2 elements
    // And one of them is in invisible mode, how to tell playwright to not take that invisible element?

    // await framePage.locator("li a[href*='lifetime-access']:visible").click(); //using visible to tell Playwright to focus on the visible element
    // const textCheck = await framePage.locator(".text h2").textContent();
    // console.log(textCheck.trim().split(" ")[1]);

    await framePage.getByRole("link",{name:"Learning Paths"}).nth(0).click();
});