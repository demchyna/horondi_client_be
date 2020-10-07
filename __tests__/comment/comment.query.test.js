/* eslint-disable no-undef */
const { gql } = require('@apollo/client');
const client = require('../../utils/apollo-test-client');
require('dotenv').config();
const { COMMENT_NOT_FOUND } = require('../../error-messages/comment.messages');
const { adminLogin, setupApp } = require('../helper-functions');

const {
  newComment,
  validEmail,
  invalidEmail,
  productId,
  wrongData,
} = require('./comment.variables');

let commentId = '';
let operations;
describe('Comment queries', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const res = await operations
      .mutate({
        mutation: gql`
          mutation($productId: ID!, $comment: commentInput!) {
            addComment(productId: $productId, comment: $comment) {
              ... on Comment {
                _id
              }
              ... on Error {
                message
              }
            }
          }
        `,
        variables: { productId: productId, comment: newComment },
      })
      .catch(e => e);
    expect(res.data.addComment).toMatchSnapshot();
    console.log(res);
    commentId = res.data.addComment._id;
  });

  afterAll(async () => {
    await operations
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            deleteComment(id: $id) {
              ... on Comment {
                _id
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: { id: commentId },
      })
      .catch(e => e);
  });

  it(' Should receive all comments writen by selected user', async () => {
    const res = await operations
      .query({
        variables: {
          userEmail: validEmail,
        },
        query: gql`
          query($userEmail: String!) {
            getAllCommentsByUser(userEmail: $userEmail) {
              text
              date
              product {
                _id
              }
              show
            }
          }
        `,
      })
      .catch(e => e);
    console.log(res);

    expect(res.data.getAllCommentsByUser).toMatchSnapshot();
    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser).toContainEqual({
      __typename: 'Comment',
      text: newComment.text,
      user: newComment.user,
      product: productId,
      show: true,
    });
  });

  it(' should return error messagePassing unexisting email ', async () => {
    const res = await operations.query({
      variables: {
        userEmail: invalidEmail,
      },
      query: gql`
        query($userEmail: String) {
          getAllCommentsByUser(userEmail: $userEmail) {
            ... on Comment {
              text
              date
              product {
                _id
              }
              show
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
    });
    console.log(res);
    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser).toHaveProperty('statusCode', 404);
    expect(res.data.getAllCommentsByUser).toHaveProperty(
      'message',
      COMMENT_NOT_FOUND
    );
  });

  it(' should return error message Passing not email string ', async () => {
    const res = await operations.query({
      variables: {
        userEmail: wrongData,
      },
      query: gql`
        query($userEmail: String) {
          getAllCommentsByUser(userEmail: $userEmail) {
            ... on Comment {
              text
              date
              product {
                _id
              }
              show
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
    });
    console.log(res);
    expect(res.data.getAllCommentsByUser).toBeDefined();
    expect(res.data.getAllCommentsByUser).toHaveProperty('statusCode', 404);
    expect(res.data.getAllCommentsByUser).toHaveProperty(
      'message',
      COMMENT_NOT_FOUND
    );
  });
});
