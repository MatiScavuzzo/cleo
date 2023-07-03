import Image from 'next/image'
import Logo from 'public/logoCleo.svg'

export const Footer = () => {
  return (
    <div className='z-20 flex flex-col items-center justify-center gap-2 p-2 bg-pastel-pink-300 h-fit sm:flex-row'>
      <div className='flex items-center justify-center w-full sm:w-1/3'>
        <Image className='p-1' src={Logo} alt='Logo Cleo Tienda' />
      </div>
      <div className='flex items-center justify-center w-full sm:w-1/3'>
        Ubicación
      </div>
      <div className='flex items-center justify-center w-full sm:w-1/3'>Contacto</div>
    </div>
  )
}