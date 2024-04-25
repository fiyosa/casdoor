import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import secret from '../config/secret'

export default function Callback() {
  const [query] = useSearchParams()

  useEffect(() => {
    ;(async () => {
      const code = query.get('code')

      if (!code) {
        window.location.href = '/'
        return
      }

      const getToken = await fetch(secret.APP_SERVER_URL + '/api/signin?code=' + query.get('code'), {
        method: 'POST',
      })
      const resToken = await getToken.json()

      if (getToken.status !== 200) return console.log('error')

      if (!resToken?.token) {
        window.location.href = '/'
        return
      }

      sessionStorage.setItem('token', resToken?.token)

      window.location.href = '/'
    })()
  }, [])

  return <div style={{ margin: 'auto auto' }}>loading</div>
}
