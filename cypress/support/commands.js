// ***********************************************
// Custom Cypress commands for course registration
// ***********************************************

/**
 * Navigate to the course registration page.
 */
Cypress.Commands.add('visitRegistrationPage', () => {
  cy.visit('/');
  cy.get('[data-testid="create-course"], a[href*="cadastr"], button')
    .contains(/cadastr|criar|novo|create|new/i)
    .first()
    .click();
});

/**
 * Fill all required course fields with valid data.
 * Override individual fields via the `overrides` parameter.
 */
Cypress.Commands.add('fillCourseForm', (overrides = {}) => {
  const defaults = {
    name: 'Curso de Teste Automatizado',
    description: 'Descricao do curso de teste automatizado para regressao.',
    instructor: 'Instrutor Teste',
    imageUrl: 'https://via.placeholder.com/300',
    startDate: '2026-05-01',
    endDate: '2026-06-01',
    seats: '30',
    courseType: 'Online',
  };

  const data = { ...defaults, ...overrides };

  // Name
  cy.get(
    '[data-testid="course-name"], input[name="name"], input[name="courseName"], input[placeholder*="nome" i], input[placeholder*="name" i]'
  )
    .first()
    .clear()
    .type(data.name);

  // Description
  cy.get(
    '[data-testid="course-description"], textarea[name="description"], textarea[name="courseDescription"], textarea[placeholder*="descri" i]'
  )
    .first()
    .clear()
    .type(data.description);

  // Instructor
  cy.get(
    '[data-testid="course-instructor"], input[name="instructor"], input[placeholder*="instrutor" i], input[placeholder*="instructor" i]'
  )
    .first()
    .clear()
    .type(data.instructor);

  // Image URL
  cy.get(
    '[data-testid="course-image"], input[name="imageUrl"], input[name="image"], input[placeholder*="imagem" i], input[placeholder*="image" i], input[placeholder*="url" i]'
  )
    .first()
    .clear()
    .type(data.imageUrl);

  // Start date
  cy.get(
    '[data-testid="course-start-date"], input[name="startDate"], input[name="dateStart"], input[type="date"]'
  )
    .first()
    .clear()
    .type(data.startDate);

  // End date
  cy.get(
    '[data-testid="course-end-date"], input[name="endDate"], input[name="dateEnd"], input[type="date"]'
  )
    .eq(1)
    .clear()
    .type(data.endDate);

  // Seats
  cy.get(
    '[data-testid="course-seats"], input[name="seats"], input[name="vacancies"], input[name="numberOfVacancies"], input[placeholder*="vagas" i], input[type="number"]'
  )
    .first()
    .clear()
    .type(data.seats);

  // Course type
  cy.get(
    '[data-testid="course-type"], select[name="courseType"], select[name="type"]'
  )
    .first()
    .select(data.courseType);
});

/**
 * Click the save / submit button on the registration form.
 */
Cypress.Commands.add('submitCourseForm', () => {
  cy.get(
    '[data-testid="submit-course"], button[type="submit"], button'
  )
    .contains(/salvar|cadastrar|enviar|save|submit|criar/i)
    .first()
    .click();
});

/**
 * Navigate to the course listing page.
 */
Cypress.Commands.add('visitListingPage', () => {
  cy.visit('/');
  cy.get('body').then(($body) => {
    const listLink = $body.find(
      'a[href*="lista"], a[href*="cursos"], a[href*="courses"], [data-testid="course-list"]'
    );
    if (listLink.length) {
      cy.wrap(listLink.first()).click();
    }
    // If no link found, the homepage may already be the listing page
  });
});
