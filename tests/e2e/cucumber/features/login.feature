Feature: Authentication on Swag Labs
  As an e-commerce customer
  I want to access my account
  So that I can purchase products
   
  @task1 @login
  Scenario: Successful login (Positive Flow)
    Given that I am on the login page
    And the login credentials are visable 
    When I fill in valid credentials
    Then I should be redirected to the product showcase
    
   @task1 @login @negative
    Scenario Outline: Failed login attempt (Negative Flows)
    Given that I am on the login page
    When I try to login with user "<usuario>" and password "<senha>"
    Then I should see the error message "<mensagem>"

     Examples:
      | usuario         | senha          | mensagem                                              |
      | standard_user   | senha_errada   | Epic sadface: Username and password do not match any user in this service      |
      | locked_out_user | secret_sauce   | Epic sadface: Sorry, this user has been locked out.   |
      |                 | secret_sauce   | Epic sadface: Username is required                    |