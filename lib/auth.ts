import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'
import baseConfig from './baseConfig'

const { secret } = baseConfig

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies

    if (!token) {
      res.status(401)
      return res.json({ error: 'Not authorized' })
    }
    let user
    try {
      const { id } = jwt.verify(token, secret)
      user = await prisma.user.findUnique({
        where: { id },
      })
      if (!user) {
        throw new Error('Not real user')
      }
    } catch (e) {
      res.status(401)
      return res.json({ error: 'Not authorized' })
    }
    return handler(req, res, user)
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, secret)
  return user
}
