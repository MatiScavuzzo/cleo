import { useState, useEffect } from "react"
import Link from "next/link"
import { HiOutlineShoppingBag, HiOutlineMenu } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { useUser } from "@auth0/nextjs-auth0/client"
import { CircularProgress } from '@mui/material'

const adminUser = process.env.ADMIN_USER


export const NavBar = () => {
  // Cuando haya usuario cambiar 'Iniciar sesión / Registrarse' a 'Cerrar sesión' y viceversa
  const [userIsActive, setUserIsActive] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(true)
  const [transitionMobile, setTransitionMobile] = useState<boolean>(false)
  const [admin, setAdmin] = useState<boolean>(false)
  const { user, error, isLoading } = useUser()

  console.log(user)
  useEffect(() => {
    if (user?.name === adminUser) {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [user])

  if (error) {
    console.log(error)
  }

  const handleResize = () => {
    const windowWidth = window.innerWidth
    if (windowWidth <= 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
      setIsActive(false)
    }
  }

  const handleActive = () => {
    setIsActive(prev => !prev)
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setTransitionMobile(true)
      }, 100)
    } else {
      setTransitionMobile(false)
    }
  }, [isActive])

  useEffect(() => {
    window.addEventListener('resize', () => handleResize)
    handleResize()
    return () => window.removeEventListener('resize', () => handleResize)
  }, [])
  return (
    <nav className="flex items-center justify-end w-1/2 gap-4 font-semibold sm:w-3/4">
      <button onClick={handleActive} className={isActive ? 'hidden' : 'flex items-center justify-end w-1/2 sm:hidden'}><HiOutlineMenu className="w-8 h-8" /></button>
      <button onClick={handleActive} className={isActive ? 'flex items-center justify-end w-1/2 relative sm:hidden' : 'hidden'}><MdClose className="w-8 h-8" /></button>
      {isMobile && isActive ? (
        <ul className={`absolute right-0 z-20 flex opacity-0 flex-col items-end h-full text-black top-16 bg-pastel-pink-100 bg-opacity-80 rounded-l-xl w-fit ${transitionMobile ? 'opacity-100 transition-opacity duration-300 ease-in-out' : ''}`}>
          <li className="w-full p-2 hover:bg-black hover:bg-opacity-70 hover:text-white hover:rounded-tl-xl">
            <Link className="flex items-center justify-end w-full" href='/nosotros'>Nosotros</Link>
          </li>
          <li className="w-full p-2 transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-70 hover:text-white">
            <Link className="flex items-center justify-end w-full" href='/categorias'>Categorías</Link>
          </li>
          <li className="w-full p-2 transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-70 hover:text-white">
            {isLoading ?
              <CircularProgress color='inherit' /> :
              user ?
                <Link className="flex items-center justify-end w-full" href='/api/auth/logout'>Cerrar Sesión</Link> :
                <Link className="flex items-center justify-end w-full" href='/api/auth/login'>Iniciar Sesión / Registrarse</Link>}
          </li>
          {admin ?
            <li className="w-full p-2 transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-70 hover:text-white">
              <Link className="flex items-center justify-end w-full" href='/admin'>Administrador</Link>
            </li> :
            null}
          <li className="flex items-center justify-end w-full p-2 transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-70 hover:text-white"><Link className="flex items-center justify-end w-full" href='/carrito'><HiOutlineShoppingBag className="w-6 h-6" /></Link></li>
        </ul>) : isMobile === false ? (
          <div className="flex items-center justify-around w-full p-2">
            <Link href='/nosotros'>Nosotros</Link>
            <Link href='/categorias'>Categorías</Link>
            {isLoading ?
              <CircularProgress color='inherit' /> :
              user ?
                <Link href='/api/auth/logout'>Cerrar Sesión</Link> :
                <Link href='/api/auth/login'>Iniciar Sesión / Registrarse</Link>}
            {admin ?
              <Link href='/admin'>Administrador</Link> :
              null}
            <Link href='/carrito'><HiOutlineShoppingBag className="w-6 h-6" /></Link>
          </div>) : null}
    </nav>
  )
}