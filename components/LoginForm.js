
export default function LoginForm () {
  
  function replitLogin(event) {
    event.preventDefault()
    
    window.addEventListener('message', authComplete);

		var left = (screen.width / 2) - 175;
		var top = (screen.height / 2) - 250;

    var authWindow = window.open(
      'https://repl.it/auth_with_repl_site?domain='+location.host,
      '_blank',
      'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=350, height=500, top='+top+', left='+left)

    function authComplete(e) {
      if (e.data !== 'auth_complete') {
        return;
      }

      window.removeEventListener('message', authComplete);

      authWindow.close();
      location.reload();
    }
  }
  
  return (
    <form onSubmit={replitLogin} >
      <button type='submit'>
        Login with Replit
      </button>
    </form>
  );
}