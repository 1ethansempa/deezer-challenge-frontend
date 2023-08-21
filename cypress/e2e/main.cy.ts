describe("home page tests", () => {
  it("visits the home page", () => {
    cy.visit("/");
  });

  it("displays a result on enter key press", () => {
    cy.visit("/");

    cy.get("[data-cy=search-bar]").type("rihanna{enter}");

    cy.wait(5000);

    cy.get("[data-cy=track-result]").first().as("firstResult");

    cy.get("@firstResult").find("[data-cy=track-title]").should("exist");
  });

  it("displays a result on button click", () => {
    cy.visit("/");

    cy.get("[data-cy=search-bar]").type("rihanna");

    cy.get("[data-cy=search-btn]").click();

    cy.wait(5000);

    cy.get("[data-cy=track-result]").first().as("firstResult");

    cy.get("@firstResult").find("[data-cy=track-title]").should("exist");
  });

  it("should redirect to artist page on artist click", () => {
    cy.visit("/");

    cy.get("[data-cy=search-bar]").type("rihanna{enter}");

    cy.wait(5000);

    cy.get("[data-cy=track-result]").first().as("firstResult");

    cy.get("@firstResult").find("[data-cy=artist-link]").click();

    cy.url().should("include", "artist");
  });
});

describe("artist page tests", () => {
  it("visits an artist page", () => {
    cy.visit("/artist/564");
  });
});
