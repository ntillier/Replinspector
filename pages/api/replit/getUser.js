/*
query CoverImage($username: String!) {  user: userByUsername(username: $username) {    id    ...CoverImageUser    __typename  }}fragment CoverImageUser on User {  id  coverImage {    url    offsetY    __typename  }  hasPrivacyRole  __typename}

operationName	"CoverImage"
query: 

query CoverImage($username: String!) {
  user: userByUsername(username: $username) {\n id\n ...CoverImageUser\n __typename\n }\n}\n\nfragment CoverImageUser on User {\n id\n coverImage {\n url\n offsetY\n __typename\n }\n hasPrivacyRole\n __typename\n}\n"
variables	{…}
username	"IroncladDev"
*/

/*
{
    operationName:	'ProfilePage',
    query: `
    query ProfilePage($username: String!) {
      user: userByUsername(username: $username) {
        id
        ...ProfilePageUser
        __typename
      }
    }
    
    fragment ProfileHeaderUser on User {
      id
      fullName
      username
      image
      bio
      isHacker
      roles(
        only: [ADMIN, MODERATOR, CONTENT_CREATOR, DETECTIVE, LANGUAGE_JAMMER, FEATURED]
      ) {
        id
        name
        key
        tagline
        __typename
      }
      languages(limit: 3) {
        id
        key
        displayName
        tagline
        icon
        __typename
      }
      __typename
    }
    
    fragment UserLinkUser on User {
      id
      url
      username
      __typename
    }
    `,
    variables: {
      username: 'nathanTi'
    }
  }
*/
// 
import get from 'script/Graphql'


export default async function (req, res) {
  if (!req.query.user) {
    return res.json({
      error: 'Error'
    });
  }
  
  const data = await get([{
      operationName:	'UserCard',
      query: `
      query UserCard($username: String!) {
        userByUsername(username: $username) {
          id
          fullName
          username
          url
          bio
          image
          isHacker
          isModerator: hasRole(role: MODERATOR)
          isAdmin: hasRole(role: ADMIN)
          isVerified
          followerCount
          followCount
          roles(only:  [MODERATOR, CONTENT_CREATOR, DETECTIVE, LANGUAGE_JAMMER]) {
            name
            key
            tagline
          }
          languages(limit: 3) {
            id
            displayName
            icon
          }
        }
      }
      `,
      variables: {
        username: req.query.user
      }
    }, {
      operationName: 'CoverImage',
      query: `
      query CoverImage($username: String!) {
        user: userByUsername(username: $username) {
          coverImage {
            url
          }
        }
      }`,
      variables: {
        username: req.query.user
      }
    }/*,
    {
      operationNme: 'PresenceBadge',
      query: `
      query PresenceBadge($username: String!) {
        user: userByUsername(username: $username) {
          id
          presenceStatus {
            lastSeen
            isOnline
            __typename
          }
          hasPrivacyRole 
          __typename
        }
      }
      `,
      variables: {
        username: req.query.user
      }
    }*/]);
  res.json({ 
    user: data[0]?.data?.userByUsername,
    coverImage: data[1]?.data?.user?.coverImage?.url
  });
}