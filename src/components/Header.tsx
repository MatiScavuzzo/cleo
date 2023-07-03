import Image from 'next/image'
import Logo from 'public/logoCleo.svg'
import { NavBar } from './NavBar'
import Link from 'next/link'

export const Header = ({ className }: any) => {
  return (
    <div className={`flex h-fit w-full gap-2 p-2 bg-pastel-pink-300 items-center justify-between ${className}`}>
      <div className='flex items-center justify-center w-1/2 sm:w-1/4'>
        <Link href='/'><Image className='p-1' src={Logo} alt="Logo Cleo Tienda" /></Link>
      </div>
      <NavBar />
    </div>
  )
}