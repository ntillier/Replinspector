import 'styles/globals.css'

import { AuthProvider } from 'contexts/Auth'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user && typeof window === 'object') {
      fetch('/api/auth/me')
        .then(r => r.json())
        .then(j => {
          setUser(j);
        });
    }
  }, []);
  /*return (
    <AuthProvider user={user || { loggedIn: false }}>
      <link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" />
        <Component {...pageProps} />
    </AuthProvider>
  );*/
  return (
    <AuthProvider user={user}>
      {
        user &&
          <Component {...pageProps} />
      }
    </AuthProvider>
  );
}

export default MyApp
