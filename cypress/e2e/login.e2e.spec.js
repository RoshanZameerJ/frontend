describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('should display error when login ID is empty', () => {
      cy.get('button[type="submit"]').click(); 
      cy.get('.alert.alert-danger').should('contain', 'Login ID is required');
    });
  
    it('should display error when password is empty', () => {
      cy.get('#loginId').type('testUser'); 
      cy.get('button[type="submit"]').click(); 
      cy.get('.alert.alert-danger').should('contain', 'Password is required');
    });
  
    it('should display error for invalid credentials', () => {
      cy.get('#loginId').type('wrongUser'); 
      cy.get('#password').type('wrongPassword'); 
      cy.get('button[type="submit"]').click();
      cy.get('.alert.alert-danger').should('contain', 'Login failed. Please check your credentials.');
    });
  
    it('should redirect to Product page on valid login', () => {
      cy.get('#loginId').type('testUser'); 
      cy.get('#password').type('testPassword');
      cy.intercept('POST', 'http://localhost:5000/api/v1.0/shopping/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token' }, 
      }).as('loginRequest');
  
      cy.get('button[type="submit"]').click(); 
      cy.wait('@loginRequest'); 
      cy.url().should('include', '/Product');
    });
  
    it('should redirect to admin dashboard for admin credentials', () => {
      cy.get('#loginId').type('admin'); 
      cy.get('#password').type('admin123'); 
      cy.intercept('POST', 'http://localhost:5000/api/v1.0/shopping/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token' }, 
      }).as('loginRequest');
  
      cy.get('button[type="submit"]').click(); 
      cy.wait('@loginRequest');
      cy.url().should('include', '/admin-dashboard'); 
    });
  });
  