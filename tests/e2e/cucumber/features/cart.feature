Feature: Add item to cart on Swag Labs
  As an e-commerce customer
  I want to add items to my cart
  So that I can purchase products

  Background:
    Given that I am logged into the system
    And the cart is empty

  @task2 @cart
  Scenario: Successful add to cart (Positive Flow)
    When I select a product
    And I click the "Add to cart" button
    Then the product should be added to my cart
    And the cart badge should display the correct number of items

    