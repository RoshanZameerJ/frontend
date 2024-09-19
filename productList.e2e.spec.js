describe('ProductList Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/Product'); // Ensure your app is running
    });

    it('should display a list of products', () => {
        cy.get('.card', { timeout: 20000 }).should('have.length.greaterThan', 0);
    });

  

    it('should select a product and display the quantity input', () => {
        cy.get('button').contains('Select').first().click();
        cy.get('input[type="number"]').should('exist');
    });

    
    it('should cancel selection and hide quantity input', () => {
        cy.get('button').contains('Select').first().click();
        cy.get('button').contains('Cancel').click();
        cy.get('input[type="number"]').should('not.exist');
    });
});
