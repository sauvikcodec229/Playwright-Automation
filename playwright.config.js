// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


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


// 2.
const config = ({

  testDir: './tests',  //whatever tests present inside the test folder will get triggered
  //Playwright enforces a timeout for each test for around 30 seconds default.
  //  Use explicit timeouts when you think the default one is not enough for me, otherwise not required
  
  testMatch: ['Day1.spec.js','Day2.spec.js','Day3.spec.js',
               'Day4.spec.js','Day5.spec.js','Day6.spec.js'], //to run a specific test under the test directory

  timeout : 40*1000, // or we can also write 40000 ms, it takes in ms format. 
  // This is applicable to the entire project and to all tests like waiting for button to be clickable
  
  expect:{  //timeout for assertion validations like toHaveTitle()
    timeout: 5000,
  },

  reporter:'html', // to get html report for all our test cases
  
  use: {
  
    browserName:'chromium', //setting the browser 
    headless: true, // if made false it will run in normal mode , no need to write --headed flag in terminal always now
    screenshot:'on',  //for taking screenshot of every step
    trace: 'on', // 'on','off','retain-on-failure' -->if we want to collect the detailed report of what happened in each automation step
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
  },

});

// Finally we will do export, so that our configuration variable is available across all the files
// in our project.
module.exports = config

