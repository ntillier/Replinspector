import db from 'script/Database'

const users = db.collection('users');
const repls = db.collection('repls');

export default async function (req, res) {
  const userRef = await users
    .doc(req.query.user.toLowerCase())
    .get();

  const user = userRef?.data();

  if (!user) {
    return res.json({
      error: 'Can\'t find the user.',
      repls: []
    });
  }

  const replsRef = await repls
    .where('authorName', '==', user.username)
    .get();

  const repl = replsRef.docs.map(i => i.data());

  res.json({ repls: repl })
}