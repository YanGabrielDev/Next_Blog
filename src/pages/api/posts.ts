// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = await Users.get()
  const user = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
  res.send(user)
}
