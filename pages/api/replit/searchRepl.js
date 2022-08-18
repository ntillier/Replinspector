/*

fragment ProfilePublicReplsRepl on Repl {
    id
    description(plainText: true)
    isOwner
    pinnedToProfile
    timeCreated
    title
    url
    iconUrl
    ...ReplLinkRepl
    user {
      id
      ...UserLinkUser
      __typename
    }
    templateInfo {
      label
      iconUrl
      __typename
    }
    multiplayers {
      id
      image
      username
      __typename
    }
    __typename
  }
  
  fragment ReplLinkRepl on Repl {
    id
    url
    nextPagePathname
    __typename
  }
  
  fragment UserLinkUser on User {
    id
    url
    username
    __typename
  }
}
*/

import get from 'script/Graphql'

export default async function (req, res) {
  const data = await get({
    operationName:	"ProfilePublicRepls",
    query	: `
  query ProfilePublicRepls($username: String!, $after: String, $search: String, $count: Int) {
    user: userByUsername(username: $username) {
      repls: profileRepls(after: $after, search: $search, count: $count) {
        items {
          id
          ...ProfilePublicReplsRepl
        }
        pageInfo {
          hasNextPage
          nextCursor
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment ProfilePublicReplsRepl on Repl {
    id
    timeCreated
    title
    iconUrl
  }`,
    variables: {
      search:	"",
      username:	req.query.user,
      count: 10
    }
  });
  
  res.json({ data: data?.data?.user });
}