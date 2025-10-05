import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { createPool } from 'mysql2/promise'

export const getAuth = async () => {
  const authInstance = betterAuth({
    database: createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      timezone: process.env.DATABASE_TIMEZONE,
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  })

  return authInstance
}

export const auth = await getAuth()
