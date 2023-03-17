import { faker } from "@faker-js/faker";

describe("creating and deleting the box -API", () => {
  it("box creating", () => {
    let fakeName = faker.word.noun();
    let fakeName1 = faker.word.adjective();
    let fakeKey = faker.random.word();
    let picture = "tree";
    let picture2 = "mittens";
    // login
    cy.request({
      method: "POST",
      headers: {
        Cookie:
          "connect.sid=s%3AIhIligq2lq7tKjRASq36NEJDjRcU0VbL.wctv6uVkYxZcJsmZLyAH02FVyYdDo02697p6XI7EfUo",
      },
      url: "/api/login",
      body: {
        email: Cypress.env("email"),
        password: Cypress.env("password"),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });

    //creating the box
    cy.request({
      method: "POST",
      headers: {
        Cookie:
          "connect.sid=s%3AIhIligq2lq7tKjRASq36NEJDjRcU0VbL.wctv6uVkYxZcJsmZLyAH02FVyYdDo02697p6XI7EfUo",
      },
      url: "/api/box",
      body: {
        cashLimit: null,
        cashLimitCurrency: null,
        createAdminCard: null,
        email: null,
        isArchived: null,
        isCreated: true,
        isInviteAfterDraw: null,
        isPhoneRequired: false,
        key: fakeKey,
        logo: null,
        name: fakeName1,
        picture: picture,
        useCashLimit: null,
        useCircleDraw: null,
        useNames: true,
        usePost: false,
        useWish: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.box.key).to.eq(fakeKey),
        expect(response.body.box.name).to.eq(fakeName1);
    });
    //changing the box settings
    cy.request({
      method: "PUT",
      headers: {
        Cookie:
          "connect.sid=s%3AIhIligq2lq7tKjRASq36NEJDjRcU0VbL.wctv6uVkYxZcJsmZLyAH02FVyYdDo02697p6XI7EfUo",
      },
      url: "/api/box",
      body: {
        cashLimit: "15",
        cashLimitCurrency: "eur",
        createAdminCard: null,
        email: null,
        isArchived: null,
        isCreated: null,
        isInviteAfterDraw: null,
        isPhoneRequired: true,
        key: fakeKey,
        logo: null,
        name: fakeName,
        picture: picture2,
        useCashLimit: true,
        useCircleDraw: null,
        useNames: true,
        usePost: true,
        useWish: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.box.key).to.eq(fakeKey),
        expect(response.body.box.name).to.eq(fakeName);
      expect(response.body.box.cashLimit).to.eq(15);
    });
    //list of the boxes
    cy.request("GET", "/api/account/boxes").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length(5);
    });

    //deleting the box
    cy.request("DELETE", `/api/box/${fakeKey}`).then((response) => {
      expect(response.status).to.equal(200);
    });

    //list of the boxes
    cy.request("GET", "/api/account/boxes").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length(4);
    });
  });
});
