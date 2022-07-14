
describe("Navigation", () => {
  it("Visit app and login", () => {
    cy.visit("https://okay.blogs.com")

    cy.get("button").contains("Login").click()

    cy.get('input[name="email"]').type("test@gmail.com")
    cy.get('input[name="password"]').type("test1234")
    cy.get("button[type='submit']").contains("Login").click()
    cy.get("button").contains("Login").should("not.exist")
    cy.get("button").contains("Logout").should("exist").click()
    cy.get("button").contains("Login").should("exist")

  })
})

export {}

