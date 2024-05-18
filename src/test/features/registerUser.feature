Feature: Register user

Scenario: Register a new user
  Given I navigate to the register page
  When I create a new user
  Then Registration should be success
