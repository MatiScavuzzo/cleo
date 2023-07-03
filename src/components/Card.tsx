import Image from "next/image"
import { Database } from "../utils/types/supabase"
import Link from "next/link"

type CardData = {
  category: string,
  name: string,
  price: number,
  description: string,
  image: string[],
  key: number
}

export const Card = ({ name, description, price, image, category }: CardData, key: any) => {
  return (
    <div key={key} className="flex flex-col items-center justify-center p-2 text-black rounded-lg shadow-xl w-80 bg-pastel-pink-50 shadow-pastel-pink-300">
      <Link href={`/categorias/${category}/${name.toLowerCase().replace(/\s/g, '-')}`} passHref={true}>
        <div className='w-[300px] flex items-center justify-center h-80 rounded-lg'>
          <Image className="object-cover w-full h-full rounded-lg" src={image[0]} alt={`Imágen de ${name}`} width={300} height={300} />
        </div>
      </Link>
      <div className='grid grid-cols-1 justify-items-start place-items-center grid-rows-5 w-full gap-1 p-2'>
        <p className='w-full text-2xl'>{name}</p>
        <p className='w-full row-span-2 text-lg'>{description}</p>
        <p className='w-full text-xl row-start-4 font-bold'>$ {price}</p>
        <button className='w-1/3 p-2 text-white place-self-center rounded-lg cursor-cleo bg-pastel-pink-400'>Comprar</button>
      </div>
    </div>
  )
}