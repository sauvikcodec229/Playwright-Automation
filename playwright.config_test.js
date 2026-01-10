// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({

  testDir: './tests',  //whatever tests present inside the test folder will get triggered
  //Playwright enforces a timeout for each test for around 30 seconds default.
  //  Use explicit timeouts when you think the default one is not enough for me, otherwise not required

  // testMatch: ['**/Assignment*.spec.js','**/WebAPI*.spec.js','**/Day*.spec.js',], //to run a specific test under the test directory

  testMatch: ['**/Day2*.spec.js'],
  timeout: 50 * 1000, // or we can also write 40000 ms, it takes in ms format. 
  // This is applicable to the entire project and to all tests like waiting for button to be clickable

  expect: {  //timeout for assertion validations like toHaveTitle()
    timeout: 5000,
  },

  reporter: 'html', // to get html report for all our test cases
  projects: [

    { //1st Configuration Details
      name: "Safari Execution",// project name and below we need to write the configuration for it
      use: { //so safari execution will use these below test options

        browserName: 'webkit', //setting the browser 
        headless: true, // if made false it will run in normal mode , no need to write --headed flag in terminal always now
        screenshot: 'retain-on-failure',  //for taking screenshot of every step
        trace: 'retain-on-failure', // 'on','off','retain-on-failure' -->if we want to collect the detailed report of what happened in each automation step
        ...devices['iPhone 11'],  // to mimic the size of window for the given device
      }
    },
    {//2nd Configuration Details

      name: "Chrome Execution",

      use: { //so chrome execution will use these below test options

        browserName: 'chromium', //setting the browser 
        headless: true, // if made false it will run in normal mode , no need to write --headed flag in terminal always now
        screenshot: 'retain-on-failure',  //for taking screenshot of every step
        trace: 'retain-on-failure', // 'on','off','retain-on-failure' -->if we want to collect the detailed report of what happened in each automation step
      }
    }


  ]



});

// Finally we will do export, so that our configuration variable is available across all the files
// in our project.
module.exports = config

