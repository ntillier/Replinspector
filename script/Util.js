
const limits = [
	{
    limit: 60,
    say: 'second'
  },
  {
    limit: 60,
    say: 'minute'
  },
  {
    limit: 24,
    say: 'hour'
  },
  {
    limit: 7,
    say: 'day'
  },
  {
    limit: 4.34524,
    say: 'week'
  },
  {
  	limit: 12,
    say: 'month'
  },
  {
    limit: Infinity,
    say: 'year'
  }
];

export function timeAgo (a, b) {
  try {
    let n = Math.floor(((new Date(b).getTime() || Date.now()) - new Date(a).getTime())/1000);
    
    if (n === 0) return 'now';

  	for (var i = 0; i < limits.length; i++) {
      const item = limits[i];
      if (n < item.limit) {
        if (n < 2) {
          return `${n} ${item.say} ago`;
        } else {
        	return `${n} ${item.say}s ago`;
        }
      } else {
        n = Math.floor(n / item.limit);
      }
    }
  } catch (err) { return null; }
}

