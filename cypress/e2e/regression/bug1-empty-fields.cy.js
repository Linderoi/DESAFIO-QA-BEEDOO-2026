/**
 * Regression Test – Bug 1: Cadastro permite campos vazios
 *
 * Reference: registro-de-bugs.md – Bug 1
 *
 * Bug description:
 *   The system allows saving a course even when no fields are filled in.
 *
 * Expected behaviour (after fix):
 *   The system MUST block the submission and display validation errors
 *   when mandatory fields are left empty.
 *
 * Steps to reproduce:
 *   1. Access the course registration page
 *   2. Do NOT fill in any field
 *   3. Click save
 */

describe('Bug 1 – Registration must not allow empty fields', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should prevent saving a course when ALL fields are empty', () => {
    // Navigate to the registration form
    cy.visitRegistrationPage();

    // Attempt to submit the form without filling any fields
    cy.submitCourseForm();

    // ── Assertions: the form must NOT be submitted ──

    // 1. At least one validation error message should be visible
    cy.get(
      '[data-testid="error-message"], .error, .invalid-feedback, ' +
      '[class*="error"], [class*="invalid"], [role="alert"], ' +
      'span[class*="required"], p[class*="error"]'
    ).should('exist').and('be.visible');

    // 2. The URL should still be the registration page (no navigation away)
    cy.url().should('match', /cadastr|create|novo|new|register/i);

    // 3. No success toast / message should appear
    cy.get(
      '[data-testid="success-message"], .toast-success, [class*="success"]'
    ).should('not.exist');
  });

  it('should show an error when only the course name is missing', () => {
    cy.visitRegistrationPage();

    // Fill all fields EXCEPT the name
    cy.fillCourseForm({ name: '' });

    // Clear the name field explicitly in case fillCourseForm skipped it
    cy.get(
      '[data-testid="course-name"], input[name="name"], input[name="courseName"], input[placeholder*="nome" i], input[placeholder*="name" i]'
    )
      .first()
      .clear();

    cy.submitCourseForm();

    // Validation error should be displayed for the name field
    cy.get(
      '[data-testid="error-message"], .error, .invalid-feedback, ' +
      '[class*="error"], [class*="invalid"], [role="alert"]'
    ).should('exist').and('be.visible');
  });

  it('should show an error when only the description is missing', () => {
    cy.visitRegistrationPage();

    cy.fillCourseForm({ description: '' });

    // Clear the description field explicitly
    cy.get(
      '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
    )
      .first()
      .clear();

    cy.submitCourseForm();

    cy.get(
      '[data-testid="error-message"], .error, .invalid-feedback, ' +
      '[class*="error"], [class*="invalid"], [role="alert"]'
    ).should('exist').and('be.visible');
  });

  it('should show an error when only the instructor is missing', () => {
    cy.visitRegistrationPage();

    cy.fillCourseForm({ instructor: '' });

    cy.get(
      '[data-testid="course-instructor"], input[name="instructor"], input[placeholder*="instrutor" i], input[placeholder*="instructor" i]'
    )
      .first()
      .clear();

    cy.submitCourseForm();

    cy.get(
      '[data-testid="error-message"], .error, .invalid-feedback, ' +
      '[class*="error"], [class*="invalid"], [role="alert"]'
    ).should('exist').and('be.visible');
  });
});
