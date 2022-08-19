// https://replit.com/data/repls/@nathanTi/MyChat
import get from 'script/Graphql'


export default async function (req, res) {
  if (!req.query.user || !req.query.repl) {
    return res.json({
      error: 'Error'
    });
  }
  /* "query ReplView($url: String!) {
  repl(url: $url) {
    ... on Repl {
      id
      imageUrl
      ...ReplViewRepl
      __typename
    }
    __typename
  }}n
  
  fragment ReplViewRepl on Repl {
    id
    title
    timeCreated
    imageUrl\n publicReleasesForkCount
    publicForkCount
    owner {
      ... on Team {
        id
        username
        url
        image
        __typename
      }
      ... on User {
        id\n use…eButtonCurrentUser\n ...CrosisContextCurrentUser\n __typename\n}
        
        fragment LikeButtonCurrentUser on CurrentUser {\n id\n isVerified\n __typename\n}
        
        fragment CrosisContextCurrentUser on CurrentUser {\n id\n username\n isSubscribed\n roles {\n name\n __typename\n }\n flagTrackOtClientDataLoss: gate(feature: \"flag-ot-data-loss-client-tracking\")\n flagPid1Ping: gate(feature: \"flag-pid1-ping-sample\")\n flagNoPongReconnect: gate(feature: \"flag-no-pong-reconnect\")\n __typename\n}\n"*/
  const data = await get({
    operationName:	'ReplView',
    query: `
    query ReplView($url: String!) {
      repl(url: $url) {
        ... on Repl {
          ...ReplViewRepl
        }
      }
    }

    fragment ReplViewRepl on Repl {
      id
      title
      timeCreated
      imageUrl
      timeUpdated
      url
      publicForkCount
      imageUrl
      iconUrl
      commentCount
      owner { 
        ...on User {
          id
          image
          username
          url 
        }
      }
      tags {
        ...on Tag {
          id
        }
      }
    }
    `,
    variables: {
      url: `/@${req.query.user}/${req.query.repl}`
    }
  });
  res.json(data?.data);
}