/// <reference types="cypress" />

import { user } from '../fixtures/user';
import { randomString, setup, tearDown } from '../support/helper';

describe('API Testing with cypress', () => {
  let userId;
  let userEmail;

  before('setup', async () => {
    const createUserRequest = await setup();
    userId = await createUserRequest.body.data.id;
    userEmail = await createUserRequest.body.data.email;

    expect(createUserRequest.status).to.equal(201);
    expect(createUserRequest.body.data.name).to.equal('cypress API automation');
    expect(createUserRequest.body.data.gender).to.equal('male');
    expect(createUserRequest.body.data.status).to.equal('active');
    expect(createUserRequest.body.data.email).to.equal(userEmail);
  });

  after('tear down', async () => {
    const response = await tearDown(userId);
    expect(response.status).to.equal(204);
  });

  it('get user', async () => {
    const getUserRequest = await cy.request({
      method: 'GET',
      url: `/public/v1/users/${userId}`,
      headers: {
        Authorization: Cypress.env('token'),
      },
    });

    expect(getUserRequest.status).to.equal(200);
    expect(getUserRequest.body.data.name).to.equal('cypress API automation');
    expect(getUserRequest.body.data.gender).to.equal('male');
    expect(getUserRequest.body.data.status).to.equal('active');
    expect(getUserRequest.body.data.email).to.equal(userEmail);
  });

  it('Update user', async () => {
    const response = await cy.request({
      method: 'PUT',
      url: `/public/v1/users/${userId}`,
      headers: {
        Authorization: Cypress.env('token'),
      },
      body: user,
    });

    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal('cypress Updated User');
    expect(response.body.data.gender).to.equal('female');
    expect(response.body.data.status).to.equal('active');
  });
});
