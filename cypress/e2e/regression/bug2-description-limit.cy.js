/**
 * Regression Test – Bug 2: Campo descricao aceita texto ilimitado
 *
 * Reference: registro-de-bugs.md – Bug 2
 *
 * Bug description:
 *   The description field accepts text without any character limit.
 *
 * Expected behaviour (after fix):
 *   There should be a character limit on the description field.
 *   When the user tries to enter more than the allowed limit (e.g. 2000
 *   characters), the system should either truncate the input, prevent
 *   further typing, or display a validation error.
 *
 * Steps to reproduce:
 *   1. Access the course registration page
 *   2. Enter more than 2000 characters in the description field
 *   3. Click save
 */

const MAX_DESCRIPTION_LENGTH = 2000;

/**
 * Generate a string of exactly `length` characters.
 */
function generateText(length) {
  const base = 'A';
  return base.repeat(length);
}

describe('Bug 2 – Description field must enforce a character limit', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.visitRegistrationPage();
  });

  it('should accept a description within the allowed limit', () => {
    const validText = generateText(MAX_DESCRIPTION_LENGTH);

    cy.get(
      '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
    )
      .first()
      .clear()
      .type(validText, { delay: 0 });

    // The value should be exactly MAX_DESCRIPTION_LENGTH characters
    cy.get(
      '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
    )
      .first()
      .invoke('val')
      .should('have.length.lte', MAX_DESCRIPTION_LENGTH);
  });

  it('should reject or truncate a description exceeding the limit', () => {
    const oversizedText = generateText(MAX_DESCRIPTION_LENGTH + 500);

    cy.get(
      '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
    )
      .first()
      .clear()
      .type(oversizedText, { delay: 0 });

    // Strategy A: The field should have truncated the text to the max length
    // Strategy B: A validation error should be visible
    // We check BOTH: the field value must not exceed the limit OR an error is shown.
    cy.get(
      '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
    )
      .first()
      .invoke('val')
      .then((value) => {
        if (value.length > MAX_DESCRIPTION_LENGTH) {
          // If the field still holds more than the limit, expect a validation error on submit
          cy.log(
            `Field accepted ${value.length} chars (>${MAX_DESCRIPTION_LENGTH}). ` +
            'Checking for validation error on submission.'
          );

          // Fill remaining required fields to isolate the description error
          cy.fillCourseForm({ description: oversizedText });
          cy.submitCourseForm();

          cy.get(
            '[data-testid="error-message"], .error, .invalid-feedback, ' +
            '[class*="error"], [class*="invalid"], [role="alert"]'
          ).should('exist').and('be.visible');
        } else {
          // The input was correctly truncated
          expect(value.length).to.be.at.most(MAX_DESCRIPTION_LENGTH);
        }
      });
  });

  it('should NOT save a course whose description exceeds the limit', () => {
    const oversizedText = generateText(MAX_DESCRIPTION_LENGTH + 500);

    // Fill the form with an oversized description
    cy.fillCourseForm({ description: oversizedText });

    cy.submitCourseForm();

    // The system must block submission – either:
    //   a) show a validation error
    //   b) remain on the registration page (no redirect to listing)
    cy.url().should('match', /cadastr|create|novo|new|register/i);

    // No success feedback
    cy.get(
      '[data-testid="success-message"], .toast-success, [class*="success"]'
    ).should('not.exist');
  });
});
