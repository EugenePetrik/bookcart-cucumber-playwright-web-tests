@regression
Feature: User authentication tests

  Background:
    Given User navigates to the application
    And User clicks on the login link

  Scenario: Login should be success
    When User logs in as "admin_user"
    Then Login should be success

  Scenario: Login should not be success
    When User enters the username as "koushik"
    And User enters the password as "Passkoushik"
    And User clicks on the login button
    But Login should fail
