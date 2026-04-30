Feature: Product Checkout
  As a logged-in user
  I want to complete the purchase of items in the cart
  So that I can receive the products at my home

  Background:
    Given that I am logged in
    And I have added the product "Sauce Labs Backpack" to the cart

  @task2 @checkout @smoke
  Scenario: Successful purchase (Positive Flow)
    When I access the cart
    And I proceed to checkout
    And I fill in the delivery details correctly
