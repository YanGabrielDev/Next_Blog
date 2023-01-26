// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Posts } from '../../firebase'

interface Data {
id: string 
}[]

export default async function sendPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string | any  = req.query.id
console.log(id)
  const snapshot = await Posts.get()
  console.log(snapshot.docs)
  const post = snapshot.docs.map((doc) => ({id: doc.id , ...doc.data()}))
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
  if (req.method === 'DELETE') {
    const id: string = req.body.id
    await Posts.doc(id).delete()
    res.status(200).send({msg: "Post deletado com sucesso!"})
    return
  }
  if (req.method === 'PUT'){
    const id: any = req.query.id
    const data = req.body
    await Posts.doc(id).update(data)
    res.status(200).send({msg: "Post atualizado com sucesso!"})
    return
  }
}

