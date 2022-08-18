// https://replit.com/data/repls/@nathanTi/MyChat
import get from 'script/Graphql'

/*
query ReplViewComments($replId: String!, $count: Int = 100, $after: String) {  currentUser {    id    username    __typename  }  repl(id: $replId) {    ... on Repl {      id      title      url      owner {        ... on User {          id          ...ReplViewCommentsUser          __typename        }        ... on Team {          id          __typename        }        __typename      }      multiplayers {        id        ...ReplViewCommentsUser        __typename      }      currentUserPermissions {        changeCommentSettings        __typename      }      commentSettings {        id        enabled        __typename      }      comments(count: $count, after: $after) {        items {          id          ...ReplViewCommentsReplCommentThread          __typename        }        pageInfo {          nextCursor          __typename        }        __typename      }      ...ReplViewReplCommentsHeaderRepl      __typename    }    __typename  }}fragment ReplViewCommentsUser on User {  id  username  image  fullName  isBlockingCurrentUser  ...UserLinkUser  __typename}fragment UserLinkUser on User {  id  url  username  __typename}fragment ReplViewCommentsReplCommentThread on ReplComment {  id  ...ReplViewCommentsReplComment  replies {    id    ...ReplViewCommentsReplComment    __typename  }  __typename}fragment ReplViewCommentsReplComment on ReplComment {  id  body  timeCreated  currentUserPermissions {    id    edit    delete    canHideComment    __typename  }  user {    id    ...ReplViewCommentsUser    __typename  }  post {    id    title    canPin    canHide    canChangeBoard    canReport    hasReported    __typename  }  isHidden  __typename}fragment ReplViewReplCommentsHeaderRepl on Repl {  id  commentCount  currentUserPermissions {    changeCommentSettings    __typename  }  commentSettings {    id    enabled    __typename  }  __typename}
query ReplViewComments($replId: String!, $count: Int = 100, $after: String) {
      repl(id: $replId) {
        ... on Repl {
          id
          title
          url
          owner {
            ... on User {
              id
              ...ReplViewCommentsUser
              __typename
            }
            ... on Team {
              id
              __typename
            }
            __typename
          }
          multiplayers {
            id
            ...ReplViewCommentsUser
            __typename
          }
          currentUserPermissions {
            changeCommentSettings
            __typename
          }
          
          commentSettings {
            id
            enabled
            __typename
          }
          
          comments(count: $count, after: $after) {
            items {
              id
              ...ReplViewCommentsReplCommentThread
              __typename
            }
            pageInfo {
              nextCursor
              __typename
            }
            __typename
          }
          ...ReplViewReplCommentsHeaderRepl
          __typename
        }
        __typename
      }
    }
    
    fragment ReplViewCommentsUser on User {
      id
      username
      image
      fullName
      isBlockingCurrentUser
      ...UserLinkUser
      __typename
    }
    
    fragment UserLinkUser on User {
      id
      url
      username
      __typename
    }
    
    fragment ReplViewCommentsReplCommentThread on ReplComment {
      id
      ...ReplViewCommentsReplComment
      replies {
        id
        ...ReplViewCommentsReplComment
        __typename
      }
      __typename
    }
    
    fragment ReplViewCommentsReplComment on ReplComment {
      id
      body
      timeCreated
      currentUserPermissions {
        id
        edit
        delete
        canHideComment
        __typename
      }
      user {
        id
        ...ReplViewCommentsUser
        __typename
      }
      post {
        id
        title
        canPin
        canHide
        canChangeBoard
        canReport
        hasReported
        __typename
      }
      isHidden
      __typename
    }
    
    fragment ReplViewReplCommentsHeaderRepl on Repl {
      id
      commentCount
      currentUserPermissions {
        changeCommentSettings
        __typename
      }
      commentSettings {
        id
        enabled
        __typename
      }
      __typename
    }
*/

export default async function (req, res) {
  if (!req.query.replid) {
    return res.json({
      error: 'Error'
    });
  }

  const data = await get({
    operationName:	'ReplViewComments',
    query: `
    query ReplViewComments($replId: String!, $count: Int = 100, $after: String) {
      repl(id: $replId) {
        ... on Repl {
          commentSettings {
            id
            enabled
          }
          
          comments(count: $count, after: $after) {
            items {
              id
              ...ReplViewCommentsReplCommentThread
            }
            pageInfo {
              nextCursor
            }
          }
          ...ReplViewReplCommentsHeaderRepl
        }
      }
    }
    
    fragment ReplViewCommentsUser on User {
      id
      username
      image
      fullName
      ...UserLinkUser
    }
    
    fragment UserLinkUser on User {
      id
      url
      username
    }
    
    fragment ReplViewCommentsReplCommentThread on ReplComment {
      id
      ...ReplViewCommentsReplComment
      replies {
        id
        ...ReplViewCommentsReplComment
      }
    }
    
    fragment ReplViewCommentsReplComment on ReplComment {
      id
      body
      timeCreated
      user {
        id
        ...ReplViewCommentsUser
      }
      post {
        id
        title
        canPin
        canHide
        canChangeBoard
        canReport
        hasReported
      }
      isHidden
    }
    
    fragment ReplViewReplCommentsHeaderRepl on Repl {
      commentCount
      commentSettings {
        id
        enabled
      }
    }
    `,
    variables: {
      count: 25,
      replId: req.query.replid,
    }
  });
  res.json(data);
}

/*
comments(count: $count, after: $after) {
            items {
              id
              ...ReplViewCommentsReplCommentThread
            }
            pageInfo {
              nextCursor
            }
          }
          ...ReplViewReplCommentsHeaderRepl
        }
    
    fragment ReplViewCommentsUser on User {
      id
      username
      image
      fullName
    }
    
    
    fragment ReplViewCommentsReplCommentThread on ReplComment {
      id
      ...ReplViewCommentsReplComment
      replies {
        id
        ...ReplViewCommentsReplComment
      }
    }
    
    fragment ReplViewCommentsReplComment on ReplComment {
      id
      body
      timeCreated
      user {
        id
        ...ReplViewCommentsUser
      }
      post {
        id
        title
      }
      isHidden
      __typename
    }
    
    fragment ReplViewReplCommentsHeaderRepl on Repl {
      id
      commentCount
      commentSettings {
        id
        enabled
      }
    }
*/