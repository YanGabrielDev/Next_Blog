// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Posts } from '../../firebase'

export interface Data {
id: string 
}[]

export default async function sendPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const snapshot = await Posts.get()
  const post: Data  = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
  if (req.method === 'GET') {
    
    res.status(200).send(post)
    return
  }
  if (req.method === 'POST') {
    const data = req.body
    await Posts.add(data)
    res.status(201).send({msg: "Post enviado com sucesso!"})
    return
  }
  // const snapshot = await Posts.get()
  // const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
  // res.status(200).send(data)
}

