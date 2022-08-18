import db from './Database'

export async function getUser(request) {
  if (!request.headers.get('x-replit-user-name')){
    return {
      loggedIn: false
    }
  }

  const users = db.collection('users');
  console.log(users);

  
  const user = await users
    .where("nameLowerCase", "==", req.headers.get('x-replit-user-name').toLowerCase())
    .limit(1)
    .get();
  
  return {
    loggedIn: true,
    user: await user?.docs[0]?.data()
  }
}
