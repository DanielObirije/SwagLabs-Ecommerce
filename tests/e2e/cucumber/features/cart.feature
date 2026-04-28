Feature: Add item to cart on Swag Labs
  As an e-commerce customer
  I want to add items to my cart
  So that I can purchase products

 
  @task2 @cart
  Scenario: Add product to cart
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart should contain "Sauce Labs Backpack"

    