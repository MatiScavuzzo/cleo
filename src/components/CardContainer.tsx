'use client'
import useSWR from 'swr'
import { Card } from './Card'
import { CircularProgress } from '@mui/material'

type Product = {
  _id: number,
  name: string,
  price: { $numberDecimal: string },
  description: string,
  image: string[],
  category: string,
}


export const CardContainer = () => {
  const { data: products, isLoading } = useSWR('/api/products')
  return (
    <section className={`flex flex-col items-center gap-2 justify-center sm:flex-row sm:flex-wrap sm:justify-around`}>
      {isLoading ? <CircularProgress color='primary' /> : products.allProducts?.map((product: Product) => {
        const price = parseFloat(product.price.$numberDecimal)
        return (
          <Card
            key={product._id}
            category={product.category.toLowerCase()}
            name={product.name}
            price={price}
            description={product.description}
            image={product.image}
          />
        )
      }
      )}
    </section>
  )
}