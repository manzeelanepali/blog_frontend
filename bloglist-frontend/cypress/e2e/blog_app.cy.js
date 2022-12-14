describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });
  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("input:first").type("anu");
      cy.get("input:last").type("anu");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("input:first").type("anu");
      cy.get("input:last").type("sanu");
    });
  });
});
