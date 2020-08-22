/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfi = /* GraphQL */ `
  query GetProfi($id: ID!) {
    getProfi(id: $id) {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;
export const listProfis = /* GraphQL */ `
  query ListProfis(
    $filter: ModelProfiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
