describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // Open the site
    cy.visit("/");
    
    // Click on Tuesday
    // Check that the nav item is highlighted
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");

  });
});
