const {test, expect} = require('@playwright/test');

test('Scenario: Ajax Form Submit',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    //Write the actual test case logic inside this function. This is completely treated as one test case.

     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.locator("a", { hasText: "Ajax Form Submit" }).waitFor();

     const ajaxFormLink = page.locator("a", { hasText: "Ajax Form Submit" });
     await ajaxFormLink.click();

     await page.locator("input#title").waitFor();
     const nameInput = page.locator("input#title");
     await nameInput.fill("Sauvik");

     const messageArea = page.locator("textarea#description");
     await messageArea.fill("I am learning Automation using Playwright. \n I am proficient in Selenium using Java Automation.");

   
     const submitBtn = page.locator("input[value='submit']");

     //Normal html form send the entire page as a HTTP request with the proper verb to the server and gets the response and renders the server based on the response.
     //AJAX form Uses JavaScript (commonly with XMLHttpRequest or fetch() to send form data to the server without reloading the page.
    // The browser stays on the same page, and only specific parts of the page might update based on the server’s response.
    // The response (often JSON or a small snippet of HTML) is handled by JavaScript, which can update the page dynamically—
    // e.g., showing a success message or filling in new data.

//     const [response] = await Promise.all([
//        page.waitForResponse(response =>
//         response.url().includes('/api/submit-form') && response.status() === 200), 
//         submitBtn.click(), // or whatever your submit button selector is
//      ]);

//   //  checking response data 
//   const result = await response.json();
//   expect(result.success).toBe(true);

//   // Check if a confirmation message appeared
//   await expect(page.locator('.notification')).toHaveText('Form submitted!');

});  

test('Scenario: Auto Healing',async ({browser})=>  // test annotation -> //test('test case name', testFunction)
{
    // Auto-healing refers to a feature or mechanism in automated testing frameworks that allows
    //  scripts or test runs to automatically adjust to certain changes in the application's UI 
    // (like minor DOM, element, or selector changes), reducing test failures and maintenance.

    //Prefer user-centric locators:
   // Use getByRole, getByLabel, getByPlaceholder, getByText, or aria- attributes, 
   // which rely on accessible, user-visible content instead of 
   // volatile class names, IDs, or deep CSS paths.
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Auto Healing" }).waitFor();

     const autoHealingLink = page.getByRole("listitem").locator("a", { hasText: "Auto Healing" });
     await autoHealingLink.click();

     await page.getByLabel('username').waitFor();
     
     const username = page.getByPlaceholder('username');
     await username.fill("Sauvik");

     const password = page.getByPlaceholder('Password');
     await password.fill("Sauvik1234");

     const changeDOMID = page.getByText('Change DOM ID');
     await changeDOMID.click();

     //fetching the locators again because we changed the DOM
     await username.fill("Sauvik");
     await password.fill("Sauvik1234");

     const submit = page.getByRole("button",{name:'Submit'});
     await submit.click();

     await page.getByText("Login Successful").waitFor();
     await expect(page.getByText("Login Successful")).toBeVisible();
     
});  


test('Scenario: Handling Bootstrap alerts',async ({browser})=>  
{
    
    //Bootstrap alerts are the alerts which get visible for a short duration of time and then either
    // gets auto dismissed or if we close by the cross button
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Bootstrap Alerts" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Bootstrap Alerts" });
     await bootstrapLink.click();

     await page.getByRole("button",{name:'Autoclosable Success Message'}).waitFor();

     const autoClosableSuccess = page.getByRole("button",{name:'Autoclosable Success Message'});
     const normalSuccess = page.getByRole("button",{name:'Normal Success Message'});
     const autoClosableInfo = page.getByRole("button",{name:'Autoclosable Info Message'});
     const normalInfo = page.getByRole("button",{name:'Normal Info Message'});

     await autoClosableSuccess.click(); 
     await page.getByText("Autocloseable success message. Hide in 5 seconds.").waitFor();
     const successMsg = page.getByText("Autocloseable success message. Hide in 5 seconds.");
     if(await successMsg.isVisible())
        console.log("The Autoclosable Success msg is visible");
     await successMsg.isHidden();
     expect(successMsg.isHidden()).toBeTruthy();


     await normalSuccess.click(); 
     await page.getByText("Normal success message. To close use the close button.").waitFor();
     const normalsuccessMsg = page.getByText("Normal success message. To close use the close button.");
     if(await normalsuccessMsg.isVisible())
        console.log("The Normal Success msg is visible");
     await page.locator("a[aria-label='close']").nth(0).click();

     
     await autoClosableInfo.click(); 
     await page.getByText("Autocloseable info message. Hide in 5 seconds.").waitFor();
     const autoclosablesuccessMsg = page.getByText("Autocloseable info message. Hide in 5 seconds.");
     if(await autoclosablesuccessMsg.isVisible())
        console.log("The Autoclosable Info msg is visible");
     await autoclosablesuccessMsg.isHidden();
     expect(autoclosablesuccessMsg.isHidden()).toBeTruthy();

});  

test('Scenario: Handling Bootstrap DatePicker',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Bootstrap Date Picker" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Bootstrap Date Picker" });
     await bootstrapLink.click();

     await page.locator("input#birthday").waitFor();

     const datepicker = page.locator("input#birthday");
     await datepicker.pressSequentially("15082000");

     const month ="4";
     const date ="21";
     const year ="1999";
     const calender= page.getByPlaceholder("Start date");
     await calender.click();
     

     const monthYear = page.locator(".datepicker-days .table-condensed th.datepicker-switch");
     await monthYear.click(); // To get one year
     const onlyYear = page.locator(".datepicker-months .table-condensed th.datepicker-switch");
     await onlyYear.click(); //Again clicking to get range of years


  const calenderPrevBtn = page.locator(".datepicker-years th.prev");
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
        await page.locator(".datepicker-years th.prev").click();
  }while(!dateFound);
  
  //Lets get a locator to get all the months of the year
  const allMonths = page.locator(".datepicker-months span");
  await allMonths.nth(Number(month)-1).click(); //We are doing minus 1 becoz all the months are stored in an array where index starts from 0

  const givenDay = page.locator(".datepicker-days td[class='day']");
  let datePresent = false;
  for(let i=0;i<givenDay.count();i++)
  {
    if(givenDay.nth(i).textContent()===date)
    {
       await givenDay.nth(i).click();
       datePresent=true;
       break;
    }
  }

  if(datePresent===false)
    await givenDay.nth(0).click();
  
});  


test('Scenario: Handling Bootstrap Dual List',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Bootstrap List Box" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Bootstrap List Box" });
     await bootstrapLink.click();

     await page.locator("input[name='SearchDualList']").nth(0).waitFor();

     const List1 = page.locator("input[name='SearchDualList']").nth(0);
     await List1.pressSequentially("Dan");

     await page.locator("li.list-group-item:visible").nth(0).click();

     await page.locator("button.move-right").click();


     const List2 = page.locator("input[name='SearchDualList']").nth(1);
     await List2.pressSequentially("Mil");
     
     await page.locator("li.list-group-item:visible").nth(0).click();

     await page.locator("button.move-left").click();
     
});  


test('Scenario: Handling Bootstrap Modal',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Bootstrap Modal" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Bootstrap Modal" });
     await bootstrapLink.click();

     await page.getByRole("button",{name:"Launch Modal"}).nth(0).waitFor();

     const launchModalBtn1 = page.getByRole("button",{name:"Launch Modal"}).nth(0);
     await launchModalBtn1.click();

     await page.getByRole("button",{name:"Save Changes"}).waitFor();
     await page.getByRole("button",{name:"Save Changes"}).click();

     const launchModalBtn2 = page.getByRole("button",{name:"Launch Modal"}).nth(1);
     await launchModalBtn2.click();

     await page.getByRole("button",{name:"Launch Modal"}).nth(2).waitFor();
     await page.getByRole("button",{name:"Launch Modal"}).nth(2).click();

     await page.getByRole("button",{name:"Save Changes"}).nth(0).click();
     await page.getByRole("button",{name:"Save Changes"}).nth(1).click();
  
});  


test('Scenario: Handling CheckBoxes',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Checkbox Demo" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Checkbox Demo" });
     await bootstrapLink.click();

     await page.getByLabel("Click on check box").waitFor();
     await page.getByLabel("Click on check box").check();//checking the checkbox
     await expect(page.getByText("Checked!")).toBeVisible();
     await page.getByLabel("Click on check box").check(); //unchecking the checkbox

     const checkBoxes = page.locator("label input[type='checkbox']");
     const checkBoxCnt = await checkBoxes.count();
     for(let i=1;i<checkBoxCnt;i++)
     {
      if(await checkBoxes.nth(i).isEnabled())
      {
         await checkBoxes.nth(i).click();
      }
     }

     await page.getByText("Uncheck All").click();

});  


test('Scenario: Handling Bootstrap Progress Bar',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);
     await page.getByRole("listitem").locator("a", { hasText: "Bootstrap Progress bar" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Bootstrap Progress bar" });
     await bootstrapLink.click();

     await page.getByRole("button",{name:"Start Download"}).waitFor();

     const downloadBtn = page.getByRole("button",{name:"Start Download"});
     await downloadBtn.click();

   //<div class="bar" style="width: 100%;"></div>
   //Here the idea is to check in polling rates/intervals of 10ms , if the width has increased to 100% from 0%
    const progressBar = page.locator(".progress div");

    await expect.poll(async () => {
        const style = await progressBar.getAttribute('style');
        return /width:\s*100%/.test(style);}, { timeout: 10000 }).toBe(true);

   await expect(page.getByText("Download completed!")).toBeVisible();

});  


test('Scenario: Handling Context Menu',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Context Menu" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Context Menu" });
     await bootstrapLink.click();

     await page.locator("#hot-spot").waitFor();

     const menuBox = page.locator("#hot-spot");

     page.on('dialog',dialog => dialog.accept());
     //Before clicking inside the menu box, we need to listen for an event which is nothing but the opening of a javascript dialog box
     await menuBox.click({ button: 'right' });
});  


test('Scenario: Handling Data List Filter',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Data List Filter" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Data List Filter" });
     await bootstrapLink.click();

     await page.getByPlaceholder("Search Attendees...").waitFor();

     const searchBar = page.getByPlaceholder("Search Attendees...");
     await searchBar.pressSequentially("Brad");

     const AttendeeDetails = page.locator(".block-info:visible");
     const companyName = AttendeeDetails.locator("h5");
     const Name = AttendeeDetails.locator("h4");
     const Title = AttendeeDetails.locator("p");

     console.log("The Company Name is: "+await companyName.textContent());
     console.log("The Name of Attendee is: "+await Name.textContent());
     console.log("The Title is: "+await Title.textContent());
     

});  


test('Scenario: Handling Download of Files',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Download File Demo" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Download File Demo" });
     await bootstrapLink.click();

     await page.getByRole("button",{name:"Download File"}).waitFor();

     const downloadBtn = page.getByRole("button",{name:"Download File"});
    
     const [download] = await Promise.all([
      page.waitForEvent('download'),                // Wait for the download event
      downloadBtn.click()                    // Trigger the download, e.g., clicking the download button
      ]);

     // Assert the download path exists
     const path = await download.path();
     console.log('Downloaded file path:', path);
     

});  


test('Scenario: Handling Drag and Drop Sliders',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Drag & Drop Sliders" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Drag & Drop Sliders" });
     await bootstrapLink.click();

     await page.locator('input[type="range"]').nth(0).waitFor();

     //Here we are dealing with Mouse Drag for custom sliders
     const slider = page.locator('input[type="range"]').nth(0);
     const amountToSet=40;
     while(Number(await page.locator("#range").textContent())!==amountToSet)
     {
        await slider.focus();
        await page.keyboard.press('ArrowRight'); 
     }
     
   
});  


test('Scenario: Handling Drag and Drop',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Drag and Drop" }).waitFor();

     const bootstrapLink = page.getByRole("listitem").locator("a", { hasText: "Drag and Drop" });
     await bootstrapLink.click();

     await page.locator("#todrag span[draggable='true']").nth(0).waitFor();
   //   Scenario 1
     const draggableItem = page.locator("#todrag span[draggable='true']").nth(0);
     
     const dropBox = page.locator('#mydropzone');

     await draggableItem.dragTo(dropBox);
     // Assert the item appears in the dropped items list
     await expect(page.locator('#droppedlist >> text="Draggable 1"')).toBeVisible();

     await draggableItem.dragTo(dropBox);
     // Assert the item appears in the dropped items list
     await expect(page.locator('#droppedlist >> text="Draggable 2"')).toBeVisible();


   //   Scenario 2
   // Perform simple drag and drop
   const source = page.locator("#draggable");
   const target = page.locator("#droppable");
   await source.dragTo(target);

   // Assert success message appears
   await expect(page.getByText('Dropped!')).toBeVisible();
     
   
});  



test('Scenario: Dynamic Data Loading',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Dynamic Data Loading" }).waitFor();

     const dynaicDataLink = page.getByRole("listitem").locator("a", { hasText: "Dynamic Data Loading" });
     await dynaicDataLink.click();

     await page.getByRole("button",{name:"Get Random User"}).waitFor();

     const getUserBtn = page.getByRole("button",{name:"Get Random User"});
     await getUserBtn.click();

     await page.locator("#loading").locator("img").waitFor();
     const employeeCard = page.locator("#loading");

     console.log("The Employee details are: ");
     console.log(await employeeCard.textContent());

});  


test('Scenario: File Download',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "File Download" }).waitFor();

     const fileDwnload = page.getByRole("listitem").locator("a", { hasText: "File Download" });
     await fileDwnload.click();

     await page.locator("#textbox").waitFor();

     const textBox = page.locator("#textbox");
     await textBox.pressSequentially("HELLO WORLD");

     if(page.getByRole("button",{name:"Generate File"}).isEnabled())
     {
          await page.getByRole("button",{name:"Generate File"}).click();
     }


     if(await page.locator("[download='Lambdainfo.txt']").isVisible())
     {
          const [download] = await Promise.all([
          page.waitForEvent('download'),                // Wait for the download event
          page.locator("[download='Lambdainfo.txt']").click(),// Trigger the download, e.g., clicking the download button
      ]);

        // Assert the download path exists
         const path = await download.path();
         console.log('Downloaded file path:', path);
     }

});  


test('Scenario: Hovering',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Hover Demo" }).waitFor();

     const hoverLink = page.getByRole("listitem").locator("a", { hasText: "Hover Demo" });
     await hoverLink.click();

     await page.locator(".bg-green-100").waitFor();

     const hoverBtn1 = page.locator(".bg-green-100");
     await hoverBtn1.hover();
     
     const hoverBtn2 = page.locator(".border-green-200");
     await hoverBtn2.hover();
     
     const hoverLink3 = page.getByText("Link Hover");
     hoverLink3.hover();

     const hoverBtn4 = page.locator("div.flex div.text-gray-800",{hasText:"Hover Me"});
     hoverBtn4.hover();


     const img = page.locator('.image-card img[loading="lazy"]');
     
     const transformBefore = await img.evaluate(el => getComputedStyle(el).transform);

     // 2. Hover over the image to trigger the CSS zoom effect
     await img.hover();
     // await page.waitForTimeout(2); // Optional: give CSS animation time if needed

     // 3. Get the computed `transform` after hover
     const transformAfter = await img.evaluate(el => getComputedStyle(el).transform);

     console.log('Transform before:', transformBefore);  // Likely "none"
     console.log('Transform after: ', transformAfter);   // Should be "matrix(...)" if zoomed

     expect(transformBefore).toBe('none');                  // Before: No transform
     expect(transformAfter).not.toBe('none');               // After: Some transform is applied
     expect(transformAfter).toContain('matrix');   

});  


test('Scenario: Handling Input Forms',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Input Form Submit" }).waitFor();

     const inputFormsLnk = page.getByRole("listitem").locator("a", { hasText: "Input Form Submit" });
     await inputFormsLnk.click();

     await page.locator("#name").waitFor();

     const name = page.locator("#name");
     const email = page.locator("#inputEmail4");
     const password = page.locator("#inputPassword4");
     const company = page.locator("#company");
     const website = page.locator("#websitename");
     const countryDropdown = page.locator("[name='country']");
     const address1 = page.locator("#inputAddress1");
     const address2 = page.locator("#inputAddress2");
     const city = page.locator("#inputCity");
     const state = page.locator("#inputState");
     const zipCode = page.locator("#inputZip");
     
     await name.fill("Sauvik");
     await email.fill("test@gmail.com");
     await password.fill("Sauvik1234");
     await company.fill("Deloitte");
     await website.fill("www.helloWorld.com");
     await countryDropdown.selectOption("India");
     await address1.fill("Bangalore");
     await address2.fill("Whitefield");
     await city.fill("Bengaluru");
     await state.fill("Karnataka");
     await zipCode.fill("1414414");
     await page.getByRole("button",{name:"Submit"}).click();

     expect(page.getByText("Thanks for contacting us, we will get back to you shortly.")).toBeVisible();


});  



test('Scenario: Handling iFrames',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "iFrame Demo" }).waitFor();

     const iFrameLink = page.getByRole("listitem").locator("a", { hasText: "iFrame Demo" });
     await iFrameLink.click();

     await page.locator("#iFrame2").waitFor();

     const framePage = page.frameLocator("#iFrame2");
     
     const apiReferenceiFrameBtn = framePage.locator("a", { hasText: "API Reference" });
     await apiReferenceiFrameBtn.click();

});  



test('Scenario: Javascript Alerts',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Javascript Alerts" }).waitFor();

     const javascriptAlertLnk = page.getByRole("listitem").locator("a", { hasText: "Javascript Alerts" });
     await javascriptAlertLnk.click();

     await page.locator("p",{name:"JavaScript Alerts"}).locator("button",{name:"Click Me"}).nth(0).waitFor();
   
     const javascriptAlert = page.locator("p",{name:"JavaScript Alerts"}).locator("button",{name:"Click Me"}).nth(0);
     const confirmBox = page.locator("p",{name:"Confirm box:"}).locator("button",{name:"Click Me"}).nth(0);
     const promptBox = page.locator("p",{name:"Prompt box:"}).locator("button",{name:"Click Me"}).nth(0);

      page.on('dialog',dialog => dialog.accept());
      await javascriptAlert.click();
      await confirmBox.click();
      await promptBox.click();

     //   a single page.on('dialog', ...) event handler will handle all three dialogs, even if they are triggered one 
     // after another by clicking different buttons.
     // Playwright’s page.on('dialog', ...) listens for any dialog event 
     // (whether it’s an alert, confirm, or prompt) on that page as long as the handler is
     //  registered before the dialogs are triggered.

});  


test('Scenario: Handling Select Dropdown List',async ({browser})=>  
{
     const context = await browser.newContext();
     const page = await context.newPage(); 
     await page.goto("https://www.lambdatest.com/selenium-playground/"); // to navigate to the given url
    
     await page.waitForTimeout(2000);

      await page.getByRole("listitem").locator("a", { hasText: "Select Dropdown List" }).waitFor();

     const dropdownLink = page.getByRole("listitem").locator("a", { hasText: "Select Dropdown List" });
     await dropdownLink.click();

     await page.locator("#select-demo").waitFor();
   
     const selectDropdown = page.locator("#select-demo");
     await selectDropdown.selectOption("Wednesday");

     const multiSelect = page.locator("#multi-select");

     await multiSelect.selectOption("Ohio");
     await page.getByRole("button",{name:"First Selected"}).click();

     // await multiSelect.selectOption([]); WE can do this for deselecting all options

      await multiSelect.selectOption(["New York","Washington"]);
      await page.getByRole("button",{name:"Get Last Selected"}).click();


});  
