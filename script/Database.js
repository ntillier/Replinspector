import admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FB_KEY)
    )
  });
} else {
  admin.app();
}


export default admin.firestore();