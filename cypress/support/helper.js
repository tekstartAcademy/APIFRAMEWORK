export const randomString = Math.floor(Math.random() * 1000);

export const setup = async () => {
  const createUserRequest = await cy.request({
    method: 'POST',
    url: '/public/v1/users',
    headers: {
      Authorization: 'Bearer 0985021c6690565071ec312df0459a7a2ad9a034b76d32fbc0813ec1249bd0b3',
    },
    body: {
      name: 'cypress API automation',
      email: `cypressAutomationEmail${randomString}@tsi.com`,
      gender: 'male',
      status: 'active',
    },
  });

  return createUserRequest;
};

export const tearDown = async (userId) => {
  const response = await cy.request({
    method: 'DELETE',
    url: `/public/v1/users/${userId}`,
    headers: {
      Authorization: 'Bearer 0985021c6690565071ec312df0459a7a2ad9a034b76d32fbc0813ec1249bd0b3',
    },
  });

  return response;
};
