Feature: Authentication on Swag Labs
  As an e-commerce customer
  I want to access my account
  So that I can purchase products
   
  @task1 @login
  Scenario: Successful login (Positive Flow)
    Given that I am on the login page
    When I fill in valid credentials
    Then I should be redirected to the product showcase