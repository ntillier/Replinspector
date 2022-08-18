
export default async function (body) {
  return await fetch('https://replit.com/graphql', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'replit',
      'Origin': 'https://replit.com',
      'Accept': 'application/json',
      'Referrer': 'https://replit.com',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Host': 'replit.com',
      'x-requested-with': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0',
      // "cookie": "connect.sid=" + this.sid
    },
      body: JSON.stringify(body)
    }).then(r => {
      return r.json()
  });
}