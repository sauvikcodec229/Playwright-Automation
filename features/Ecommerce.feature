Feature: Ecommerce Validations

# In order to run any cucumber feature , we need to run the cucumber-js file .
#  So instead of going to node-modules for finding the cucumber-js
#  We can use this command (npx cucumber-js) -> "npx" will automatically go to the node-modules/.bin 
# and then it will go to the file name that you have specified like cucumber-js

  Scenario: Placing the order for multiple products using Data Driven testing
    Given I login to Ecommerce application with "raunak12345@gmail.com" and "Raunak@12345"
    When Add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When I do the payment for the product and place the order for " India"
    Then I verify the order is successfully placed
    Then I verify the order in the order history page


    