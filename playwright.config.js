// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

//Playwright enforces a timeout for each test for around 30 seconds default

//  There are 2 ways to write the configuration values: 

// 1.
// export default defineConfig({

//   testDir: './tests',  //whatever tests present inside the test folder will get triggered
//   //Playwright enforces a timeout for each test for around 30 seconds default.
//   //  Use explicit timeouts when you think the default one is not enough for me, otherwise not required
//   timeout : 40*1000, // or we can also write 40000 ms, it takes in ms format. This is applicable to the entire project and to all tests
//   expect:{  //timeout for assertion validations
//     timeout: 40000,
//   },

//   reporter:'html', // to get html report for all our test cases
//   use: {
  
//     browserName:'chromium', //setting the browser 
//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     // trace: 'on-first-retry',
//   },

// });

//All our configuration key-value pairs , we are just taking into one variable. we can think of this "defaultConfig" block in that way
// const defineConfig = ({}). Think of it as a variable which is holding
// all our configuration key-values requried by our test.

// ---------------------------------------------------------------------------------

// Whatever we write under use:{} happens on individual test case level
//Outside of that whatever we write happens on overall project
// 2.
const config = ({

  testDir: './tests',  //whatever tests present inside the test folder will get triggered
  retries:2, //it will retry the test cases failed due to flakiness 1 more time. It will retry the number of times we give
  // workers: 2, // to specify how many cases in parallel we can run
  // testMatch: ['**/Assignment*.spec.js','**/WebAPI*.spec.js','**/Day*.spec.js',], //to run a specific test under the test directory

  testMatch: ['**/Day2*.spec.js'],     
  
  
  //Playwright enforces a timeout for each test for around 30 seconds default.
  //Use explicit timeouts when you think the default one is not enough for me, otherwise not required
  
  timeout : 50*1000, // or we can also write 40000 ms, it takes in ms format. 
  // This is applicable to the entire project and to all tests like waiting for button to be clickable
  
  expect:{  //timeout for assertion validations like toHaveTitle()
    timeout: 5000,
  },

  reporter:'html', // to get html report for all our test cases
  
  use: {
  
    browserName:'chromium', //setting the browser 
    headless: false, // if made false it will run in normal mode , no need to write --headed flag in terminal always now
    screenshot:'on',  //for taking screenshot of every step
    // video:'retain-on-failure',
    trace: 'retain-on-failure', // 'on','off','retain-on-failure' -->if we want to collect the detailed report of what happened in each automation step
    //viewport: {widht:720,height:720}      //it tells how the browser needs to open , in waht size
    //we use this option for responsive testing like, whether in small size like mobile window all elements are resizing and properly rendering or not
    //If our website is mobile friendly then we can decrease the size and do the testing.

    //Sometimes if website is not SSL Certified, we might get error on the screen
    //In order to accept those certificates by going advanced, we have a playwright property for doing that
    ignoreHttpsErrors:true,

    //now sometimes we get popups or notifications related to geolocations, like "google wants to know your location"
    //If we want to handle such popups we can do using this
    permissions:['geolocation'], //our browser will click on allow button



    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
  },

});

// Finally we will do export, so that our configuration variable is available across all the files
// in our project.
module.exports = config

//Playwright by default works on 5 workers, that means 5 test cases in parallel we can run
//each test file ".spec.js" , playwright will assign to one worker and they will run in parallel
//but each test inside a ".spec.js" file will be run in sequential manner.
//We can specify how many workers we want to run in parallel but default is 5
// A worker is a test execution process
