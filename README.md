<!DOCTYPE html>
<html>
<body>

<p id="demo">Click the button to change the layout of this paragraph</p>

<button onclick="myFunction()">Click Me!</button>

<script>
const arr = [
	{
    	limit: 60000,
        divide: 1000,
        say: 'second'
    },
    {
    	limit: 3600000,
        divide: 60000,
        say: 'minute'
    },
    {
    	limit: 86400000,
        divide: 3600000,
        say: 'hour'
    }
];
function timeAgo (date) {
	const diff = Date.now() - date;
    
    if (diff <= 1000) {
    	return 'now';
    } else {
    	for (var i = 0; i < arr.length; i++) {
        	const item = arr[i];
        	if (diff < item.limit) {
            	const n = Math.floor(diff / item.divide);
                if (n < 2) {
                	return `${n} ${item.say} ago`;
                } else {
                	return `${n} ${item.say}s ago`;
                }
            }
        }
    }/*else if (diff < 60000) {
    	return Math.floor(diff / 1000) + ' seconds ago';
    } else if (diff < 3600000) {
    	return Math.floor(diff / 60000) + ' minutes ago';
    } else if (diff < 86400000) {
    	return Math.floor(diff / 3600000) + ' hours ago';
    }*/
    return 'lol';
}

function myFunction () {
	var d = new Date('08/18/2022 03:41:00 PM').getTime();
    alert(timeAgo(d))
}
</script>

</body>
</html>
