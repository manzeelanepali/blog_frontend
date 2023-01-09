/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "manjila",
      username: "manjila",
      password: "manjila",
    };

    const user3 = {
      name: "sonika ",
      username: "sonika",
      password: "sonika",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.request("POST", "http://localhost:3003/api/users/", user3);
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

    cy.contains("invalid username or password");
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

    it("user who hasnot created the blog cannot delete it", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("new story created by cypress");
      cy.contains("logout").click();

      cy.contains("login").click();
      cy.get("#username").type("sonika");
      cy.get("#password").type("sonika");
      cy.get("#login-button").click();

      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("new story created by cypress").should("exist");
    });

    it.only("blogs are arranged according to the likes", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("new story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello");
      cy.get("#button-type").click();
      cy.contains("new story created by cypress").contains("view").click();
      cy.contains("like").click();
      cy.wait(500);

      cy.contains("like").click();
      cy.wait(500);
      cy.contains("like").click();
      cy.wait(500);

      cy.contains("new blog").click();
      cy.get("#title").type("again story created by cypress");
      cy.get("#author").type("manjila");
      cy.get("#url").type("hello1");
      cy.get("#button-type").click();
      cy.contains("again story created by cypress");
      cy.contains("view").click();
      cy.contains("like").click();
      cy.wait(500);
    });
  });
});
