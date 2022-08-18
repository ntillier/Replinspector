import db from 'script/Database'
const users = db.collection('users');

export default async function (req, res) {
  // console.log(process.env.REPL_IDENTITY)
  // 13613037
  
  if (!req.headers['x-replit-user-name']) {
    return res.json({ loggedIn: false });
  }
  const user = await users
    .where("nameLowerCase", "==", req.headers['x-replit-user-name'].toLowerCase())
    .limit(1)
    .get();
  res.json(Object.assign({
    loggedIn: true
  }, await user?.docs[0]?.data()));
}