import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

type DataResponse = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
  const client = await clientPromise;
  const db = client.db('CleoTienda')
  if (req.method === 'GET') {
    const products = await db.collection('Productos')
    const allProducts = await products.find({}).toArray()
    res.status(200).json({allProducts})
  } else if (req.method === 'POST') {
    const newProduct = req.body
    const products = await db.collection('Productos')
    const insertProduct = await products.insertOne(newProduct)
    res.status(200).json({insertProduct, status: 'Successfully'})
  } else {
    res.status(400).json({status: 'Error'})
  }
}