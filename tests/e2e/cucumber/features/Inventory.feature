Feature :Inventory Page Componet Validation
  As a system user
  I want to validate that all components are present on the inventory page
  So that I can ensure the interface is complete and functional

  Background:
    Given that I am logged into the system
    And I am on the inventory page

  @inventory
  Scenario: Validate main components of the inventory page
    Then I should see the title "Products"
    And I should see the hamburger menu
    And I should see the shopping cart
    And I should see the sorting filter

  @inventory @components @products
  Scenario: Validate list of available products
    Then I should see 6 products in the list
    And each product should have an image
    And each product should have a name
    And each product should have a description
    And each product should have a price
    And each product should have an "Add to cart" button
  
  @inventory  @sorting
  Scenario: Validate sorting options
    Then I should see the following sorting options:
      | Name (A to Z)         |
      | Name (Z to A)         |
      | Price (low to high)   |
      | Price (high to low)   |

  @inventory @components @products-list
  Scenario: Validate specific displayed products
    Then I should see the following products:
      | Sauce Labs Backpack               | $29.99 |
      | Sauce Labs Bike Light             | $9.99  |
      | Sauce Labs Bolt T-Shirt           | $15.99 |
      | Sauce Labs Fleece Jacket          | $49.99 |
      | Sauce Labs Onesie                 | $7.99  |
      | Test.allTheThings() T-Shirt (Red) | $15.99 |