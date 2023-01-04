/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "manjila",
      username: "manjila",
      password: "manjila",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("iran");
    cy.get("#password").type("siran");
    cy.get("#login-button").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("manjila");
    cy.get("#password").type("manjila");
    cy.get("#login-button").click();

    cy.contains("manjila logged-in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("manjila");
      cy.get("input:last").type("manjila");
      cy.get("#login-button").click();
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("new story created by cypress");
    });

    it(" a user can like the blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("new story created by cypress");
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });
    it("user who created the blog can delete it ", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("a blog created by cypress").should("not.exist");
    });

    it.only("blogs are arraanged according to the likes", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("new story created by cypress").contains("view").click();
      cy.get("#likeButton").click();
      cy.wait(500);
      cy.get("#likeButton").click();
      cy.wait(500);
      cy.contains("hide").click();

      cy.contains("new blog").click();
      cy.get("#title").type("here is another blogs");
      cy.get("#author").type("sonika");
      cy.get("#url").type("hello1");
      cy.get("#button-type").click();
      cy.contains("here is another blogs").contains("view").click();
      cy.get("#likeButton").click();
      cy.wait(500);
      cy.get("#likeButton").click();
      cy.wait(500);
      cy.get("#likeButton").click();
      cy.wait(500);
      cy.contains("hide").click();

      cy.get(".blog").eq(0).should("contain", "here is another blogs");
      cy.get(".blog").eq(1).should("contain", "new story created by cypress");
    });
  });
});
