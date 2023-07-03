import { ImagenPortada } from '@/components/ImagenPortada'
import { CardContainer } from '@/components/CardContainer'
import { Josefin_Sans } from 'next/font/google'

export const josefinSans = Josefin_Sans({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <main className="flex flex-col items-center min-h-screen gap-4 p-2 bg-pastel-pink-200">
      <ImagenPortada />
      <CardContainer />
    </main>
    </>
  )
}
