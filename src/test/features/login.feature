Feature: User authentication tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    When User enter the username as "user_name_first"
    And User enter the password as "Qwerty123"
    And User click on the login button
    Then Login should be success

  Scenario: Login should not be success
    When User enter the username as "koushik"
    And User enter the password as "Passkoushik"
    And User click on the login button
    But Login should fail
