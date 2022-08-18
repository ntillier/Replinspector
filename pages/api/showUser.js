import db from 'script/Database'

const repls = db.collection('repls');

export default async function (req, res) {
  if (!req.query.user) {
    return res.json({
      error: 'Can\'t find the user.',
      repls: []
    });
  }

  const replsRef = await repls
    .where('authorName', '==', req.query.user)
    .get();

  const repl = replsRef.docs.map(i => i.data());

  res.json({ repls: repl })
}