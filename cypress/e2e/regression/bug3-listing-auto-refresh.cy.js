/**
 * Regression Test – Bug 3: Listagem nao atualiza automaticamente
 *
 * Reference: registro-de-bugs.md – Bug 3
 *
 * Bug description:
 *   After registering a new course, navigating to the course listing
 *   does not show the newly created course immediately.
 *
 * Expected behaviour (after fix):
 *   The listing page should display the newly created course as soon
 *   as the user navigates to it (automatic refresh / real-time update).
 *
 * Steps to reproduce:
 *   1. Register a new course successfully
 *   2. Navigate to the course listing page
 *   3. Verify the new course appears in the list
 */

describe('Bug 3 – Listing must auto-refresh after course creation', () => {
  const uniqueSuffix = Date.now();
  const courseName = `Curso Regressao ${uniqueSuffix}`;

  it('should show the newly created course in the listing immediately', () => {
    // Step 1: Navigate to registration and create a course
    cy.visit('/');
    cy.visitRegistrationPage();

    cy.fillCourseForm({ name: courseName });
    cy.submitCourseForm();

    // Wait for the submission to complete – either a redirect or a success message
    cy.get('body').then(($body) => {
      const hasSuccess =
        $body.find(
          '[data-testid="success-message"], .toast-success, [class*="success"]'
        ).length > 0;

      if (hasSuccess) {
        cy.log('Success message detected after submission.');
      }
    });

    // Step 2: Navigate to the course listing
    cy.visitListingPage();

    // Step 3: The new course MUST be visible without a manual page reload
    cy.contains(courseName, { timeout: 15000 }).should('be.visible');
  });

  it('should show the newly created course without requiring a manual page reload', () => {
    const secondCourseName = `Curso Refresh ${uniqueSuffix}`;

    // Create a course
    cy.visit('/');
    cy.visitRegistrationPage();

    cy.fillCourseForm({ name: secondCourseName });
    cy.submitCourseForm();

    // Navigate to listing
    cy.visitListingPage();

    // The course must appear without cy.reload() — that is the whole point
    // of this regression test. We explicitly do NOT call cy.reload() here.
    cy.contains(secondCourseName, { timeout: 15000 }).should('be.visible');
  });

  it('should list multiple courses created in sequence', () => {
    const courseA = `Curso A ${uniqueSuffix}`;
    const courseB = `Curso B ${uniqueSuffix}`;

    // Create first course
    cy.visit('/');
    cy.visitRegistrationPage();
    cy.fillCourseForm({ name: courseA });
    cy.submitCourseForm();

    // Create second course
    cy.visitRegistrationPage();
    cy.fillCourseForm({ name: courseB });
    cy.submitCourseForm();

    // Navigate to the listing
    cy.visitListingPage();

    // Both courses should be visible
    cy.contains(courseA, { timeout: 15000 }).should('be.visible');
    cy.contains(courseB, { timeout: 15000 }).should('be.visible');
  });
});
