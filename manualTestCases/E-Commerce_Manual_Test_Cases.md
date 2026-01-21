# Manual Test Cases - E-commerce Application

## Project Overview
This document contains manual test cases for an e-commerce application (https://rahulshettyacademy.com/client/) that includes user authentication, product browsing, cart management, checkout, and order management features.

---

## 1. User Authentication Test Cases

### TC_AUTH_001: Valid User Login
**Objective:** Verify that a user can successfully login with valid credentials

**Pre-conditions:**
- User is on the login page (https://rahulshettyacademy.com/client/#/auth/login)
- Valid user account exists with email: raunak12345@gmail.com and password: Raunak@12345

**Steps:**
1. Navigate to the login page
2. Enter email: raunak12345@gmail.com in the email field
3. Enter password: Raunak@12345 in the password field
4. Click the "Login" button
5. Wait for the dashboard to load (verify div.card-body element appears)

**Expected Result:**
- User is successfully logged in
- Dashboard page displays with product cards visible
- User is redirected to the dashboard

**Post-conditions:**
- User is logged in and can access the dashboard

---

### TC_AUTH_002: Invalid Email Login
**Objective:** Verify system behavior when user enters invalid credentials

**Pre-conditions:**
- User is on the login page

**Steps:**
1. Navigate to the login page
2. Enter invalid email: test@invalid.com
3. Enter any password: test123
4. Click the "Login" button

**Expected Result:**
- Error message is displayed indicating invalid credentials
- User remains on the login page
- User is not logged in

---

### TC_AUTH_003: Invalid Password Login
**Objective:** Verify system behavior when user enters wrong password

**Pre-conditions:**
- User is on the login page
- Valid email exists

**Steps:**
1. Navigate to the login page
2. Enter valid email: raunak12345@gmail.com
3. Enter wrong password: wrongpassword
4. Click the "Login" button

**Expected Result:**
- Error message appears: "Please enter a correct email address and password"
- User remains on the login page

---

## 2. Product Browsing Test Cases

### TC_PROD_001: View All Products on Dashboard
**Objective:** Verify that all products are displayed on the dashboard after login

**Pre-conditions:**
- User is successfully logged in
- Dashboard page is loaded

**Steps:**
1. After login, observe the dashboard
2. Count the number of product cards displayed (div.card-body elements)
3. Verify each product card contains product name, price, and "Add to Cart" button

**Expected Result:**
- Multiple product cards are displayed
- Each product card has:
  - Product name (visible in h3 tag or similar)
  - Product price
  - "Add to Cart" button

---

### TC_PROD_002: Search for Specific Product
**Objective:** Verify that user can find a specific product (ZARA COAT 3)

**Pre-conditions:**
- User is logged in on the dashboard

**Steps:**
1. Observe the product list on dashboard
2. Look for product named "ZARA COAT 3"
3. Verify the product is visible in the list

**Expected Result:**
- Product "ZARA COAT 3" is visible on the dashboard
- Product contains price and "Add to Cart" button

---

### TC_PROD_003: Add Single Product to Cart
**Objective:** Verify that a user can add a single product to the cart

**Pre-conditions:**
- User is logged in on the dashboard
- Product "ZARA COAT 3" is visible

**Steps:**
1. Locate product "ZARA COAT 3" on the dashboard
2. Click the "Add to Cart" button for this product
3. Wait for the action to complete
4. Navigate to the cart to verify the product was added

**Expected Result:**
- Product is successfully added to cart
- User can navigate to cart and see the added product

---

## 3. Shopping Cart Test Cases

### TC_CART_001: View Cart Contents
**Objective:** Verify that cart displays all added products

**Pre-conditions:**
- User is logged in
- At least one product has been added to cart (ZARA COAT 3)

**Steps:**
1. Click on "Cart" button in navigation
2. Wait for cart page to load
3. Observe the cart contents

**Expected Result:**
- Cart page displays
- Added product "ZARA COAT 3" is visible
- Product name is displayed with h3:has-text('ZARA COAT 3') selector

---

### TC_CART_002: Validate Product in Cart
**Objective:** Verify that the correct product is displayed in cart with correct details

**Pre-conditions:**
- User has added "ZARA COAT 3" to cart
- User is on the cart page

**Steps:**
1. Navigate to cart page
2. Verify product "ZARA COAT 3" is visible
3. Check that product details are displayed

**Expected Result:**
- Product "ZARA COAT 3" is visible in the cart
- Product details are correctly displayed

---

### TC_CART_003: Proceed to Checkout from Cart
**Objective:** Verify that user can proceed from cart to checkout page

**Pre-conditions:**
- User has items in cart
- User is on the cart page

**Steps:**
1. On the cart page, locate the "Checkout" button
2. Click the "Checkout" button
3. Wait for the checkout page to load

**Expected Result:**
- Checkout page loads
- User is redirected to payment/shipping information page

---

## 4. Checkout and Payment Test Cases

### TC_CHECKOUT_001: Enter Shipping Information
**Objective:** Verify that user can enter shipping and country information

**Pre-conditions:**
- User is on the checkout page after clicking checkout from cart

**Steps:**
1. Locate the country selection field (input[placeholder*='Country'])
2. Start typing "ind" to trigger dropdown suggestions
3. Wait for suggestion dropdown to appear (section.ta-results)
4. Select "India" from the suggestions
5. Verify the selection is made

**Expected Result:**
- Dropdown suggestions appear while typing
- User can select "India" from suggestions
- Selected country is displayed in the input field

---

### TC_CHECKOUT_002: Enter Shipping Email
**Objective:** Verify that shipping email information is captured

**Pre-conditions:**
- User is on the checkout page
- Country has been selected

**Steps:**
1. Locate the shipping email field (.user__name [type='text'])
2. Verify the field is populated with user email
3. Confirm the email is correct

**Expected Result:**
- Email field displays user's registered email
- Email cannot be edited or is pre-filled correctly

---

### TC_CHECKOUT_003: Enter CVV for Payment
**Objective:** Verify that user can enter CVV for payment

**Pre-conditions:**
- User is on the checkout page
- Shipping information is filled

**Steps:**
1. Locate the CVV input field (div.form__cc div[class='title']:has-text('CVV Code ') + input)
2. Enter a valid CVV (e.g., 123)
3. Verify the CVV is entered

**Expected Result:**
- CVV field accepts input
- CVV value is entered correctly

---

### TC_CHECKOUT_004: Place Order
**Objective:** Verify that user can successfully place an order

**Pre-conditions:**
- User is on the checkout page
- All required fields are filled (country, email, CVV)

**Steps:**
1. Locate the "Place Order" button (.action__submit)
2. Click the "Place Order" button
3. Wait for order confirmation page to load

**Expected Result:**
- Order is successfully placed
- User is redirected to order confirmation page

---

## 5. Order Confirmation Test Cases

### TC_ORDER_001: View Order Confirmation Message
**Objective:** Verify that order confirmation message is displayed

**Pre-conditions:**
- User has successfully placed an order
- User is on the order confirmation page

**Steps:**
1. After placing order, observe the confirmation page
2. Look for the confirmation message (.hero-primary)
3. Verify the message text

**Expected Result:**
- Confirmation message "Thankyou for the order. " is displayed
- Message is visible on the page

---

### TC_ORDER_002: Capture Order ID
**Objective:** Verify that order ID is displayed and can be captured

**Pre-conditions:**
- User is on the order confirmation page after placing order

**Steps:**
1. Locate the order ID element (.em-spacer-1 .ng-star-inserted)
2. Extract the order ID from the text
3. Note the order ID for future reference

**Expected Result:**
- Order ID is displayed on the confirmation page
- Order ID can be extracted from the page (format: "Order ID: XXXXX")
- Order ID is unique and valid

---

## 6. Order Management Test Cases

### TC_ORDERS_001: View All Orders
**Objective:** Verify that user can view all their orders

**Pre-conditions:**
- User is logged in on the dashboard
- User has placed at least one order previously

**Steps:**
1. Click on "My Orders" button (button[routerlink='/dashboard/myorders'])
2. Wait for orders page to load (tr.ng-star-inserted elements should appear)
3. Observe the orders list

**Expected Result:**
- Orders page loads
- All user's orders are displayed in a table
- Table contains columns for Order ID, Name, Price, Order Date

---

### TC_ORDERS_002: Find Specific Order by Order ID
**Objective:** Verify that user can find a specific order in the orders list

**Pre-conditions:**
- User is on the My Orders page
- User has the Order ID from a previous order (e.g., from confirmation page)

**Steps:**
1. On the My Orders page, look for the order ID in the table
2. Scan through the orders table rows (tr.ng-star-inserted)
3. Find the row containing the specific order ID

**Expected Result:**
- The specific order is found in the list
- Order ID matches exactly
- Order details are displayed (name, price, order date)

---

### TC_ORDERS_003: View Order Details
**Objective:** Verify that user can click on an order to view its details

**Pre-conditions:**
- User is on the My Orders page
- User can see a specific order in the list

**Steps:**
1. Locate the row for the desired order
2. Find and click the "View" button in the order row
3. Wait for the order details page to load

**Expected Result:**
- Order details page loads
- Order information is displayed
- Order ID is shown in the details (.col-md-6 .col-text)

---

## 7. Session Management Test Cases

### TC_SESSION_001: Login with Local Storage Token
**Objective:** Verify that user can bypass login by using stored token

**Pre-conditions:**
- User has previously logged in and token is available
- Token is stored in localStorage

**Steps:**
1. Store the authentication token in localStorage
2. Navigate directly to the dashboard URL without logging in
3. Observe if the page loads the dashboard

**Expected Result:**
- Dashboard loads without requiring login
- User can access protected pages with valid token

---

### TC_SESSION_002: Session Persistence Across Navigation
**Objective:** Verify that user session persists while navigating through the application

**Pre-conditions:**
- User is logged in and on the dashboard

**Steps:**
1. Navigate to cart page
2. Click on "Continue Shopping" to return to dashboard
3. Navigate to My Orders page
4. Navigate back to dashboard

**Expected Result:**
- User remains logged in throughout navigation
- Session is not lost
- User can access all pages without re-authentication

---

## 8. Data Validation Test Cases

### TC_VALIDATION_001: Form Field Validation - Empty Country Selection
**Objective:** Verify that checkout fails if country is not selected

**Pre-conditions:**
- User is on the checkout page

**Steps:**
1. Skip the country selection field
2. Attempt to proceed with empty country field
3. Try to click "Place Order" button

**Expected Result:**
- Error message or validation message appears
- User cannot proceed without selecting a country

---

### TC_VALIDATION_002: Email Format Validation
**Objective:** Verify that system validates email format during login

**Pre-conditions:**
- User is on the login page

**Steps:**
1. Enter invalid email format: "notemail"
2. Enter any password
3. Click "Login" button

**Expected Result:**
- Error message indicates invalid email format
- Login is rejected

---

## 9. UI Interaction Test Cases

### TC_UI_001: Dropdown Interaction
**Objective:** Verify that country dropdown works correctly with text input

**Pre-conditions:**
- User is on the checkout page

**Steps:**
1. Click on country input field
2. Type "in" (partial country name)
3. Observe dropdown suggestions appear
4. Verify multiple countries starting with "in" are shown
5. Select one country

**Expected Result:**
- Dropdown appears with matching suggestions
- User can select from suggestions
- Selected value appears in input field

---

### TC_UI_002: Button Click Actions
**Objective:** Verify that all action buttons work correctly

**Pre-conditions:**
- User is logged in

**Steps:**
1. Click "Add to Cart" button for a product
2. Click "Cart" button to navigate to cart
3. Click "Checkout" button
4. Click "Place Order" button
5. Verify each action completes as expected

**Expected Result:**
- All buttons are clickable
- Each button performs its intended action
- Page navigation occurs as expected

---

## 10. End-to-End Workflow Test Cases

### TC_E2E_001: Complete Purchase Flow
**Objective:** Verify the complete user journey from login to order confirmation

**Pre-conditions:**
- Test user account exists with credentials: raunak12345@gmail.com / Raunak@12345
- Application is accessible

**Steps:**
1. Navigate to login page
2. Enter valid credentials and login
3. Search for and add "ZARA COAT 3" to cart
4. Navigate to cart
5. Verify product is in cart
6. Click Checkout
7. Select "India" as country
8. Verify email is populated
9. Enter CVV
10. Click Place Order
11. Verify order confirmation message appears
12. Note the Order ID

**Expected Result:**
- User successfully completes entire purchase flow
- Order confirmation is displayed with Order ID
- All validations pass at each step

---

### TC_E2E_002: Order Verification After Placement
**Objective:** Verify that order appears in My Orders after placement

**Pre-conditions:**
- User has just placed an order and is on confirmation page
- Order ID has been captured

**Steps:**
1. Note the Order ID from confirmation page
2. Click on "My Orders" button
3. Wait for orders page to load
4. Search for the order ID in the list
5. Click View to see order details
6. Verify order details match what was ordered

**Expected Result:**
- New order appears in My Orders list
- Order ID matches the one from confirmation
- Order details are correctly displayed

---

## 11. Negative Test Cases

### TC_NEG_001: Unauthorized Order Access
**Objective:** Verify that user cannot view orders of other users

**Pre-conditions:**
- User has access to Order Details page
- System attempts to intercept and modify order ID

**Steps:**
1. Log in with valid credentials
2. Go to an order details page
3. Attempt to modify the order ID in the URL or request
4. Try to access a random order ID

**Expected Result:**
- Error message: "You are not authorize to view this order"
- User cannot access unauthorized orders

---

### TC_NEG_002: Duplicate Order Prevention
**Objective:** Verify that system prevents placing duplicate orders

**Pre-conditions:**
- User has already placed an order for a specific product

**Steps:**
1. Log in again
2. Add the same product to cart
3. Attempt to place order immediately without modification
4. Observe if system flags or prevents duplicate

**Expected Result:**
- System either allows or properly logs the transaction
- Order can be placed if system allows multiple orders

---

## 12. Performance and Load Test Cases

### TC_PERF_001: Dashboard Load Time
**Objective:** Verify that dashboard loads within acceptable time

**Pre-conditions:**
- User is logged in
- Network is stable

**Steps:**
1. Log in
2. Observe time to load dashboard
3. Count the number of product cards loaded
4. Verify all products are rendered

**Expected Result:**
- Dashboard loads within 5 seconds
- All product cards are displayed
- No broken images or missing elements

---

### TC_PERF_002: Cart Page Load Time
**Objective:** Verify that cart page loads quickly

**Pre-conditions:**
- User has items in cart
- User is on dashboard

**Steps:**
1. Click on Cart button
2. Measure time to load cart page
3. Verify all items are displayed

**Expected Result:**
- Cart page loads within 3 seconds
- All items are displayed correctly

---

## Test Data Reference

**Test User Account:**
- Email: raunak12345@gmail.com
- Password: Raunak@12345

**Test Product:**
- Product Name: ZARA COAT 3

**Test Country:**
- Country: India

**Test Payment Data:**
- CVV: Any 3-digit number (e.g., 123)

---

## Notes for Automation

- All tests should use explicit waits for page elements
- Tests should clean up data after execution (logout/clear session)
- Network calls should be considered in wait times
- Screenshots should be captured on failures
- Tests should be independent and not rely on execution order
