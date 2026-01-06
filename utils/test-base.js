const base= require('@playwright/test');


exports.customTest = base.test.extend(  //we are exporting this entire fixture with test, 
// base.test we are wiriting to make sure all the properties from base whcih is the js object
//  we got from "playwright/test" , we also get them into test whicb is iur custom fixture
    {
        testDataForOrder: {  //if anybody accesses this custom fixture , they will get all this data assocaited with it
            username: "raunak12345@gmail.com",
            password: "Raunak@12345",
            productName: "ZARA COAT 3",
            country: " India",
            orderID: "695b8d2ac941646b7a7f1bfe"
        }
    }
);