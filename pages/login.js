
import LoginForm from 'components/LoginForm'


export default function () {  
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  if (req.headers['x-replit-user-id']) {
    return {
      redirect: {
        destination: '/dashboard'
      }
    }
  }
  return { props: {} }
}
