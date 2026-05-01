Feature: Product Checkout
  As a logged-in user
  I want to complete the purchase of items in the cart
  So that I can receive the products at my home

  Background:
    Given that I am logged in
    And I have added the product "Sauce Labs Backpack" to the cart
    And I access the cart
    And I proceed to checkout

  @task2 @checkout @negative
  Scenario: Attempt to complete purchase without delivery details (Negative Flow)
    And I try to continue without filling out the form
    Then I should see the checkout error message "Error: First Name is required"


  @task2 @checkout @smoke
  Scenario: Successful purchase (Positive Flow)
    And I fill in the delivery details correctly
    And I complete the purchase
    Then I should see the confirmation message "Thank you for your order!"