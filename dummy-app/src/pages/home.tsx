import { useEffect, useState } from 'react'
import './home.css'
import secret from '../config/secret'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const gotoSignInPage = () => {
    let params = ''
    params += 'client_id=' + `${secret.SSO_ID}`
    params += '&redirect_uri=' + `${secret.SSO_CALLBACK}`
    params += '&response_type=' + 'code'
    params += '&scope=' + 'openid profile email'
    window.location.href = `${secret.SSO_CLIENT_URL}/login/oauth/authorize?${params}`
  }

  const signOut = () => {
    sessionStorage.removeItem('token')
    window.location.href = secret.APP_URL
  }

  const fetchUser = async () => {
    const token = sessionStorage.getItem('token')

    if (token) {
      try {
        const getUser = await fetch(`${secret.APP_SERVER_URL}/api/getUserInfo?token=${token}`)
        const resUser = await getUser.json()

        if (getUser.status !== 200) return

        setUsername(resUser?.name ?? '')
        setIsLoggedIn(true)
      } catch (err: any) {
        console.log(err?.message ?? 'Failed get user')
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) fetchUser()
  }, [])

  return (
    <div className="login" style={{ textAlign: 'center' }}>
      {
        <span id="result">
          username: <span className="username">{username}</span>
        </span>
      }
      <div style={{ width: '300px', height: '50px' }}>
        {isLoggedIn ? (
          <button id="signOut" style={{ width: '200px', height: '50px' }} onClick={signOut}>
            Logout
          </button>
        ) : (
          <div>
            <button id="signIn" style={{ width: '200px', height: '50px' }} onClick={gotoSignInPage}>
              Login with Casdoor
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
