import db from 'script/Database'
const users = db.collection('users');

export default async function (req, res) {
  if (!req.query.user) {
    return res.json({ error: 'Error.' });
  }
  const user = await users
    .doc(req.query.user.toLowerCase())
    .get();
  res.json({ 
    user: await user?.data() || null
  });
}