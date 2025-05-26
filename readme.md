# Challenge Description

## E2E Test Suite

Create end-to-end (E2E) tests for the [Sauce Demo](https://www.saucedemo.com/v1/) application using Playwright and TypeScript.
Note: Login credentials are provided on the login page.

## Test Scenarios

The tests cover key user scenarios:

- **Login**: Valid and invalid login cases.
- **Cart**: Add items to the cart and validate its contents.
- **Checkout**: Successfully complete the checkout process.

## Test Cases

### Test Case 1 – Login Successfully

- **Area**: Login
- **Preconditions**:

  - A user with valid credentials

- **Test Steps**:

  1. Navigate to the login page
  2. Enter the valid username
  3. Enter the valid password
  4. Click the login button

- **Expected Result**:
  - User logs in successfully and is redirected to the inventory page

---

### Test Case 2 - Login with Locked User

- **Area**: Login
- **Preconditions**:

  - A user with locked credentials

- **Test Steps**:

  1. Navigate to the login page
  2. Enter the locked username
  3. Enter the locked password
  4. Click on the login button

- **Expected Result**:
  - Message "Epic sadface: Sorry, this user has been locked out." should be displayed

---

### Test Case 3 - Add Multiple Items to Cart and Complete Checkout

- **Area**: Checkout
- **Preconditions**:

  - Valid user is on the home page

- **Test Steps**:

  1. Navigate to the login page
  2. Enter the valid username
  3. Enter the valid password
  4. Click on the login button
  5. Add specific items to cart (Sauce Labs Backpack, Sauce Labs Fleece Jacket, Sauce Labs Onesie)
  6. Verify the cart badge displays the correct number of items
  7. Navigate to the cart page
  8. Verify the items in the cart match the added items
  9. Proceed to checkout
  10. Fill in the required checkout information (First name, last name, postal code)
  11. Verify the items in the checkout summary match the added items
  12. Click the finish button to complete the checkout process.

- **Expected Result**:
  - Cart badge displays the correct number of items
  - Items in the cart match the added items
  - Items in the checkout summary match the added items
  - Message "Thank you for your order!" should appear on the order confirmation page
  - Message "Your order has been dispatched, and will arrive just as fast as the pony can get there!" should appear on the order confirmation page

## Project Structure

- `tests/challenge.spec.ts`: Main test suite for the Sauce Demo application.
- `pom/`: Page Object Model (POM) classes for different pages:
  - `login-page.ts`: Interactions with the login page.
  - `inventory-page.ts`: Interactions with the inventory page.
  - `cart-page.ts`: Interactions with the cart page.
  - `checkout-page.ts`: Interactions with the checkout page.

## Getting Started with the Project

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd ican-project
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following content (replace with your credentials if needed):

```
USERNAME=standard_user
USERPASS=secret_sauce
```

### Running the Tests

You can use the following npm scripts to run and manage your tests:

- **Run all tests:**

  ```sh
  npm run execute-all
  ```

- **Run a specific test:**
  ```sh
  npm run execute-test 'test-name'
  ```
