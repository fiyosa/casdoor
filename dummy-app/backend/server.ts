import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()

const secret = {
  APP_URL: process.env.APP_URL,
  SSO_SERVER_URL: process.env.SSO_SERVER_URL,
  SSO_ID: process.env.SSO_ID,
  SSO_SECRET: process.env.SSO_SECRET,
  SSO_CALLBACK: process.env.SSO_CALLBACK,
}

app.use(
  cors({
    origin: secret.APP_URL,
    credentials: true,
  })
)

app.get('/api/getUserInfo', async (req: Request, res: Response) => {
  try {
    const token = req.query?.token as string

    const getUser = await fetch(secret.SSO_SERVER_URL + '/api/userinfo', {
      headers: { Authorization: 'Bearer ' + token },
    })
    const resUser = await getUser.json()

    if (getUser.status !== 200) return res.send(null)
    res.send(JSON.stringify(resUser))
  } catch (err: any) {
    console.log('err getUserInfo:', err?.message)
  }
})

app.post('/api/signin', async (req, res) => {
  try {
    const code = req.query?.code as string

    const postToken = await fetch(secret.SSO_SERVER_URL + '/api/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: secret.SSO_ID,
        client_secret: secret.SSO_SECRET,
        redirect_uri: secret.SSO_CALLBACK,
        code: code,
      }),
    })
    const resToken = await postToken.json()

    if (postToken.status !== 200) return res.send(JSON.stringify({ token: '' }))

    res.send(JSON.stringify({ token: resToken?.access_token ?? '' }))
  } catch (err: any) {
    console.log('err signin:', err?.message)
  }
})

app.listen(8081, () => {
  console.log('Server listening at http://localhost:8081')
})
