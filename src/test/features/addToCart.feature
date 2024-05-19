@regression
Feature: Add products to cart

  Background:
    Given User navigates to the application
    And User clicks on the login link

  @add
  Scenario Outline: Authenticated user <user> - add to cart
    When User logs in as "<user>"
    Then Login should be success
    When User searches for a "<book>"
    And User adds the book to the cart
    Then The cart badge should get updated

    Examples:
      | user         | book              |
      | admin_user   | Roomies           |
      | lead_user    | The Simple Wild   |

  @fail
  Scenario: Unauthenticated user - add to cart
    When User searches for a "All of Us with Wings"
    And User adds the book to the cart
    Then The cart badge should get updated
