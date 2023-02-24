describe("Appointments", () => {
  it.skip("should book an interview", () => {  
    cy.request("http://localhost:8001/api/debug/reset");

    // Visits the root of our web server
    cy.visit("http://localhost:8000/");

    // Clicks on the "Add" button in the second appointment
    cy.contains("[data-testid=appointment]", "1pm")
      .find('.appointment__add-button')
      .click().then(() => {
        // Enters their name

        cy.get('input').type('Kristy Gislason');

        // Chooses an interviewer

        cy.get("[data-testid=interviewer]").find("[alt='Sylvia Palmer']").click();

        // Clicks the save button
        cy.get('.button--confirm').click();

        // Sees the booked appointment
        cy.get("[data-testid=appointment] h2").should(($h2) => {
          expect($h2.eq(1)).to.contain("Kristy Gislason");
        });
      });

      cy.request("http://localhost:8001/api/debug/reset");
  });

  // If we edit the existing appointment booked for "Archie Cohen", then we don't need to create an appointment first.
  it("should edit an interview", () => {
    // Visits the root of our web server
    cy.visit("/");

    // Clicks the edit button for the existing appointment
    cy.contains("[data-testid=appointment]", "12pm").then( ($appointment) => {
      $appointment.find('.appointment__card').trigger("mouseover");
    })
      
      // .find('img[alt="Edit"]')
      // .click();
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment   
    
    // Reset Database
    cy.request("http://localhost:8001/api/debug/reset");
  });

  // We can also perform a test to cancel an existing interview. It is for this reason that we need to reset the database after each test. If one test cancels and interview and the next test expects that interview to exist, then our tests can break for reasons unrelated to our code quality.
  it.skip("should cancel an interview", () => {
    // Visits the root of our web server
    cy.visit("/");

    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty

    // Reset Database
    cy.request("http://localhost:8001/api/debug/reset");
  });
});
