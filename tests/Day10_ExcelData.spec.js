const { test, expect, request } = require('@playwright/test');
const ExcelJs = require("exceljs");

//For working with excels we need to download one node module called excelJS
// Create a new directory where you will install this excelJS hierarchy , so that u can import it in this project
// mkdir ExcelJSUtil
// cd ExcelJSUtil
// npm init(initiating node package manager to install excelJS) -->it will create a package.json file , where we will install our excel dependency
//now open that project in vs code and in terminal type "npm install exceljs --savedev" --> this will
//  add the package under dependencies under package.json , so that when we call this project in another project , we can simply write npm install and all the dependencies from this project will also get installed in our main project.

//After coming to this project ,add that exceljs to dependencies and then write npm isntall in terminal

// const workBook1 = new ExcelJs.Workbook();

//Since JS is asynchronous we are waiitng here till our promise i.e. readfile gets fulfilled then only execute the code inside the function
// , otherwise before reading is done, we might start printing
// .then() is used for this purpose means after the reading is done then only do the next thing 
// We can also use await here but the problem is then we need to enclose the enitre code in a async function

// workBook1.xlsx.readFile("C://Users//sauvsarkar//Downloads//download.xlsx").then(function () {
//     const workSheet1 = workBook1.getWorksheet("Sheet1");
//     workSheet1.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         }); // to iterate over all non null cells
//     });  //Helps to iterate over all the rows that have values in a worksheet
// });


// or by wrapping in a aync function 
async function writeExcel(searchText, replaceText, filePath) {

    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet("Sheet1");

    const coord = await readExcel(workSheet, searchText, filePath);

    //Updating a value
    const cell = workSheet.getCell(coord.row, coord.col); //row,column
    cell.value = replaceText;
    await workBook.xlsx.writeFile("C://Users//sauvsarkar//Downloads//download.xlsx");
}


async function readExcel(workSheet, searchText, filePath) {

    let coordinates = { row: -1, col: -1 };

    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                console.log("RowNo: " + rowNumber);
                coordinates.row = rowNumber;
                console.log("ColNo: " + colNumber);
                coordinates.col = colNumber;
            }
        }); // to iterate over all non null cells
    });  //Helps to iterate over all the rows that have values in a worksheet

    return coordinates;
}


// writeExcel("Apple", "iphone", "C://Users//sauvsarkar//Downloads//download.xlsx"); // we need to call the function here

test("Scenario: Upload Download Excel Validation",async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const [downloadPromise] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("button",{name:"Download"}).click()
    ]);

    //or we can do in this way

    // const downloadPromise =page.waitForEvent("download");
    // await page.getByRole("button",{name:"Download"}).click();
    // await downloadPromise;

    // writeExcel("samsung", "apple", "C://Users//sauvsarkar//Downloads//download.xlsx"); 
    
    // await page.getByRole("button",{name:"Choose File"}).click();
    //NOTE: setInputFIle() will work only if our webelement has attribute type="file" inside its tag
    // await page.getByRole("button",{name:"Choose File"}).setInputFiles("C://Users//sauvsarkar//Downloads//download.xlsx");


    // Validation for the updated table value on the site
    // const textLocator = page.getByText("apple");
    // const deisredRow = await page.getByRole("row").filter({has:"apple"});
    // await expect(deisredRow.locator("#cell-4-undefined")).toContainText("UpdatedValue");
});
//to run javascript file just give "node fileName"
