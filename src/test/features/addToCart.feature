Feature: Add products to cart

  Background:
    Given User navigates to the application
    And User click on the login link

  @add
  Scenario Outline: Authenticated Users - Add to cart
    When User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the login button
    Then Login should be success
    When User search for a "<book>"
    And User add the book to the cart
    Then The cart badge should get updated

    Examples:
      | username | password  | book            |
      | ortoni11 | Pass1234  | Roomies         |
      | ortonikc | pass1234  | The Simple Wild |

  @fail
  Scenario: UnAuthenticated User - Add to cart
    When User search for a "All of Us with Wings"
    And User add the book to the cart
    Then The cart badge should get updated
