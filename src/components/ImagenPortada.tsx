'use client'
import Image from "next/image"
import PortadaMovil from 'public/temporada-2023.jpg'
import PortadaDesktop from 'public/temporada-2023-desktop.jpg'
import { useEffect, useState } from "react"
import { portada } from "../utils/types/types"

const initialState = {
  src: '',
  height: 0,
  width: 0
}
export const ImagenPortada = () => {
  const [imagenPortada, setImagenPortada] = useState<portada>(initialState)
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setImagenPortada({
        src: PortadaMovil.src,
        height: PortadaMovil.height,
        width: PortadaMovil.width
      })
    } else {
      setImagenPortada({
        src: PortadaDesktop.src,
        height: PortadaDesktop.height,
        width: PortadaDesktop.width
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className={`rounded-lg`}>
      <Image className={`rounded-lg shadow-2xl shadow-pastel-pink-700`} src={imagenPortada.src} alt='temporada-2023' width={imagenPortada.width} height={imagenPortada.height} />
    </section>
  )
}