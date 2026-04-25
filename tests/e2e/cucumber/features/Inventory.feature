Feature: Inventory Page Componet Validation
  As a system user
  I want to validate that all components are present on the inventory page
  So that I can ensure the interface is complete and functional

  Background:
    Given that I am logged into the system
    And I am on the inventory page

  @inventory @components 
  Scenario: Validate main components of the inventory page
    Then I should see the title "Products"
    And I should see the hamburger menu
    And I should see the shopping cart
    And I should see the sorting filter

  