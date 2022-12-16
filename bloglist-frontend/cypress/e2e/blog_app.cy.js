describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it.only("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("iran");
    cy.get("#password").type("kiran");
    cy.get("#login-button").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("kiran");
    cy.get("#password").type("kiran");
    cy.get("#login-button").click();
  });
});

//   describe("when logged in", function () {
//     beforeEach(function () {
//       cy.contains("login").click();
//       cy.get("input:first").type("kiran");
//       cy.get("input:last").type("kiran");
//       cy.get("#login-button").click();
//     });

//     it("a blog can be created", function () {
//       cy.contains("new blog").click();
//       cy.get("input").type("a note created by cypress");
//       cy.contains("save").click();
//       cy.contains("a note created by cypress");
//     });
//   });
// });
