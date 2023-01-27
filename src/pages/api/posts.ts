// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Posts } from "../../firebase";

export default async function sendPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = await Posts.get();
  const post = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const { body, method } = req;
  const id: string = body.id;
  const data = body;

  switch (method) {
    case "GET":
      res.status(200).send(post);
      break;

    case "POST":
      await Posts.add(data);
      res.status(201).send({ msg: "Post enviado com sucesso!" });
      break;

    case "DELETE":
      await Posts.doc(id).delete();
      res.status(200).send({ msg: "Post deletado com sucesso!" });
      break;

    case "PUT":
      await Posts.doc(id).update(data);
      res.status(200).send({ msg: "Post atualizado com sucesso" });
      break;
    default:
      res.status(400).end({ msg: "deu ruim" });
  }
}
