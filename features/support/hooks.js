const { Before , After, AfterStep, Status } = require("@cucumber/cucumber");
const playwright  = require('@playwright/test');
const { pageObjectManager } = require("../../pageObjects/pageObjectManager");
const path = require("node:path");

//"Before" executes before each and every scenario but "BeforeAll" executes once before all the scenarios.
Before(async function (){  //Becoz this function is commonly applied to each Scenario we dont need any statement here, directly it takes a function as input

    //Earlier the browser and page fixtures were directly exposed or given by test
    // But here we dont have test, so we need to explicitly call the function chromium.launch() from playwright library
    const browser = await playwright.chromium.launch({headless:false});
    this.context = await browser.newContext();
    this.page = await this.context.newPage(); // Here since we are assigning page 
    // value to world constructor "this.page" , automatically this will be passed to all the steps 
    //present in this scenario.

    this.pageManager = new pageObjectManager(this.page);//Same here also, we are passing down the
    //  world constructor to all the steps in the scenario.

});

After(async function () { //excutes after every scenario

    console.log("I am the last to execute");
});


//the result of the step execution will be passed as a property called "result"
//this block of code will be executed after every step
//if a step in scenario fails , then the result of that step will be automatically sent to this AfterStep()
AfterStep(async function ({result}) {

    if(result.status===Status.FAILED)
    {
        await this.page.screenshot({path:"screenshot.png"});

    }
});