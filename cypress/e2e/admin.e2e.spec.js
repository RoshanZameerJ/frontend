 describe('Admin Dashboard', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.window().then((window) => {
        window.localStorage.setItem('authToken', 'your_valid_token_here');
        window.localStorage.setItem('loginId', 'admin');
      });
      cy.visit('http://localhost:3000/admin-dashboard#!');
      cy.wait(2000); 
  
      cy.url().should('include', '/admin-dashboard');
    });
  
    it('should view products', () => {
      cy.contains('Delete Product').click(); 
      cy.contains('Products List').should('exist');
      cy.get('.product-item').should('be.visible');
      cy.get('.product-item').its('length').should('be.gte', 1); 
    });
  });
   