const {test} = require("@playwright/test");

test("Navigating from Parent to CHold window", async ({browser})=>
{

    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("random url");

    const [childPage] = Promise.all([
        context.waitForEvent('page'),
        page.locator("link for opening the new page").click(),
    ]);

    childPage.locator("").click();


    

});
