import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Link = {
  __typename?: 'Link';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  expirationToken: Scalars['String'];
  token: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type MetaData = {
  __typename?: 'MetaData';
  emoticons: Array<Scalars['String']>;
  id: Scalars['ID'];
  links: Array<Link>;
  mentions: Array<Scalars['String']>;
  messageId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResult;
  message: MetaData;
  register: RegisterResult;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationMessageArgs = {
  message: Scalars['String'];
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  messages: Array<Message>;
  metadata: MetaData;
  metadatas: Array<MetaData>;
  user?: Maybe<User>;
};

export type QueryMessagesArgs = {
  userId: Scalars['ID'];
};

export type QueryMetadataArgs = {
  messageId: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  expirationToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type MessagesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;

export type MessagesQuery = {
  __typename?: 'Query';
  messages: Array<{ __typename?: 'Message'; id: string; text: string }>;
};

export type MetadataQueryVariables = Exact<{
  messageId: Scalars['ID'];
}>;

export type MetadataQuery = {
  __typename?: 'Query';
  metadata: {
    __typename?: 'MetaData';
    id: string;
    messageId: string;
    mentions: Array<string>;
    emoticons: Array<string>;
    links: Array<{ __typename?: 'Link'; title: string; url: string }>;
  };
};

export type MetadatasQueryVariables = Exact<{ [key: string]: never }>;

export type MetadatasQuery = {
  __typename?: 'Query';
  metadatas: Array<{
    __typename?: 'MetaData';
    id: string;
    messageId: string;
    mentions: Array<string>;
    emoticons: Array<string>;
    links: Array<{ __typename?: 'Link'; title: string; url: string }>;
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    role: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    role: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type MessageMutationVariables = Exact<{
  message: Scalars['String'];
}>;

export type MessageMutation = {
  __typename?: 'Mutation';
  message: {
    __typename?: 'MetaData';
    id: string;
    emoticons: Array<string>;
    mentions: Array<string>;
    links: Array<{ __typename?: 'Link'; title: string; url: string }>;
  };
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'RegisterResult';
    token: string;
    user: { __typename?: 'User'; id: string; email: string; username: string; role: string };
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResult'; token: string; expirationToken: string };
};

export const MessagesDocument = gql`
  query Messages($userId: ID!) {
    messages(userId: $userId) {
      id
      text
    }
  }
`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
}
export function useMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MetadataDocument = gql`
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

/**
 * __useMetadataQuery__
 *
 * To run a query within a React component, call `useMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetadataQuery({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useMetadataQuery(
  baseOptions: Apollo.QueryHookOptions<MetadataQuery, MetadataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
}
export function useMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MetadataQuery, MetadataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
}
export type MetadataQueryHookResult = ReturnType<typeof useMetadataQuery>;
export type MetadataLazyQueryHookResult = ReturnType<typeof useMetadataLazyQuery>;
export type MetadataQueryResult = Apollo.QueryResult<MetadataQuery, MetadataQueryVariables>;
export const MetadatasDocument = gql`
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

/**
 * __useMetadatasQuery__
 *
 * To run a query within a React component, call `useMetadatasQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetadatasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetadatasQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetadatasQuery(
  baseOptions?: Apollo.QueryHookOptions<MetadatasQuery, MetadatasQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MetadatasQuery, MetadatasQueryVariables>(MetadatasDocument, options);
}
export function useMetadatasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MetadatasQuery, MetadatasQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MetadatasQuery, MetadatasQueryVariables>(MetadatasDocument, options);
}
export type MetadatasQueryHookResult = ReturnType<typeof useMetadatasQuery>;
export type MetadatasLazyQueryHookResult = ReturnType<typeof useMetadatasLazyQuery>;
export type MetadatasQueryResult = Apollo.QueryResult<MetadatasQuery, MetadatasQueryVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const MessageDocument = gql`
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
export type MessageMutationFn = Apollo.MutationFunction<MessageMutation, MessageMutationVariables>;

/**
 * __useMessageMutation__
 *
 * To run a mutation, you first call `useMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageMutation, { data, loading, error }] = useMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<MessageMutation, MessageMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MessageMutation, MessageMutationVariables>(MessageDocument, options);
}
export type MessageMutationHookResult = ReturnType<typeof useMessageMutation>;
export type MessageMutationResult = Apollo.MutationResult<MessageMutation>;
export type MessageMutationOptions = Apollo.BaseMutationOptions<
  MessageMutation,
  MessageMutationVariables
>;
export const RegisterDocument = gql`
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
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      expirationToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
