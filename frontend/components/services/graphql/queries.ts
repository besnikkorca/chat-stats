import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
  query Messages($userId: ID!) {
    messages(userId: $userId) {
      id
      text
    }
  }
`;

export const MESSAGE_METADATA_QUERY = gql`
  query Metadata($messageId: ID!) {
    metadata(messageId: $messageId) {
      id
      messageId
      mentions
      emoticons
      links {
        title
        url
      }
    }
  }
`;

export const METADATAS_QUERY = gql`
  query Metadatas {
    metadatas {
      id
      messageId
      mentions
      emoticons
      links {
        title
        url
      }
    }
  }
`;

export const ME_QUERY = gql`
  query ME {
    me {
      id
      role
      email
      username
      createdAt
      updatedAt
    }
  }
`;

export const USER_QUERY = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      role
      email
      username
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation Message($message: String!) {
    message(message: $message) {
      id
      emoticons
      mentions
      links {
        title
        url
      }
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      user {
        id
        email
        username
        role
      }
      token
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      expirationToken
    }
  }
`;
