'use client'
import { useState, useRef } from "react"
import Image from "next/image"
import { Producto } from "@/utils/types/types"
import { deleteFile, getImageUrl, uploadFile } from "@/lib/supabase/storage"
import useSWR from 'swr'

export default function Admin() {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const sizeInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<Number>(0)
  const [colorName, setColorName] = useState<string>('')
  const [colors, setColors] = useState<string[]>([])
  const [category, setCategory] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [sizeQuantity, setSizeQuantity] = useState<number>(0)
  const [sizes, setSizes] = useState<{talle: string, cantidad: number}[]>([])
  const [stock, setStock] = useState<number>(0)
  const [imageName, setImageName] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [product, setProduct] = useState<Producto | null>(null)

  const sendRequest = async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' && setName(e.target.value)
  }
  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' && setDescription(e.target.value)
  }
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' && setPrice(parseFloat(e.target.value))
  }
  const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' &&setColorName(e.target.value)
  }
  const addColorHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (colors.length === 0) {
      setColors([colorName])
      setColorName('')
    
    } else {
      setColors([...colors, colorName])
      setColorName('')
    }
    if (colorInputRef.current) {
      colorInputRef.current.value = ''
    }
  }
  const deleteColorHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setColors(colors.filter(color => color !== e.currentTarget.value))
  }
  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value !== '' && setCategory(e.target.value)
  }
  const sizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' && setSize(e.target.value)
  }
  const sizeQuantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' && setSizeQuantity(Number(e.target.value))
  }
  const addSizeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (sizes.length === 0) {
      setSizes([{talle: size, cantidad:sizeQuantity}])
    } else {
      setSizes([...sizes, {talle: size, cantidad:sizeQuantity}])
    }
    if (sizeInputRef.current) {
      sizeInputRef.current.value = ''
    }
    const sumSizeQuantity = sizes.reduce((total, size) => total + size.cantidad, sizeQuantity)
    setStock(sumSizeQuantity)
  }
  const deleteSizeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const sizeToDelete = e.currentTarget.value
    setSizes(sizes.filter(size => size.talle !== sizeToDelete))
    const sumSizeQuantity = sizes.reduce((total, size) => total + size.cantidad, sizeQuantity)
    setStock(sumSizeQuantity)
  }
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const name = e.target.files[0].name.toLowerCase()
      console.log(name)
      setImageName(name)
      setImage(e.target.files[0])
    }
  }

  const addImageHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    uploadFile(image!, imageName)
    .then
    const imageUrl = getImageUrl(imageName)
    if (imageUrl) {
      if (images.length === 0) {
        setImages([imageUrl])
      } else {
        setImages([...images, imageUrl])
      }
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }
  const deleteImageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const imageToDelete = e.currentTarget.value
    const fileNameEncoding = imageToDelete.substring(imageToDelete.lastIndexOf('/') + 1)
    const fileNameDecoding = fileNameEncoding.replaceAll('%20', ' ')
    deleteFile(fileNameDecoding)
    setImages(images.filter(image => image !== imageToDelete))
  }
  const submitProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        })
        if (response.ok) {
          alert('Producto cargado correctamente')
        } else {
          alert('Error al cargar el producto')
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const previewHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProduct({
      category: category,
      color: colors,
      description: description,
      image: images,
      name: name,
      price: { $numberDecimal: price.toString() },
      size: sizes,
      stock: stock
    })
    if (product) {
      console.log(product)
    }
  }
  // Lógica para previsualización
  // Lógica para carga de producto completo a DB
  return (
    <main className="flex flex-col items-center min-h-screen gap-4 p-2 bg-pastel-pink-200">
      <div className='bg-pastel-pink-100 text-black w-full sm:w-3/4 rounded-xl'>
        <form onSubmit={submitProductHandler} className="flex flex-col w-full items-center justify-center gap-2 p-4">
          <div className="flex flex-col sm:flex-row w-full md:w-3/5 sm:items-center sm:justify-between border border-pastel-pink-400 p-2 rounded-lg gap-2">
            <label className="p-2" htmlFor='name'>Nombre del producto</label>
            <input onChange={nameHandler} className="p-2 rounded-xl" type='text' name='name' id='name' />
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-3/5 sm:items-center sm:justify-between border border-pastel-pink-400 p-2 rounded-lg gap-2">
            <label className="p-2" htmlFor='description'>Descripción</label>
            <input onChange={descriptionHandler} className="p-2 rounded-xl" type='text' name='description' id='description' />
          </div>
          <div className="flex flex-col w-full md:w-3/5 sm:items-center sm:justify-between border border-pastel-pink-400 p-2 rounded-lg sm:flex-row gap-2">
            <label className="p-2" htmlFor='price'>Precio</label>
            <input onChange={priceHandler} className="p-2 rounded-xl" type='number' name='price' id='price' />
          </div>
          <div className="flex flex-col border w-full md:w-3/5 sm:items-center sm:justify-center flex-wrap border-pastel-pink-400 p-2 rounded-lg sm:flex-row gap-2">
            <div className="flex flex-col sm:flex-row sm:w-full sm:justify-between gap-2">
              <label className="p-2" htmlFor='color'>Color</label>
              <input ref={colorInputRef} onChange={colorHandler} className="p-2 rounded-xl" type='text' name='color' id='color' />
            </div>
            {colors && colors.length > 0 ?
              <div className="flex w-full">
                <ul className="flex flex-wrap gap-2">
                  {colors.map((color: string) => <li key={color}><button className="text-black font-bold" onClick={deleteColorHandler} value={color} name="color">{color}</button></li>)}
                </ul>
              </div> : null}
            <button onClick={addColorHandler} className="bg-white p-2 rounded-xl">Agregar</button>
          </div>
          <div className="flex flex-col w-full md:w-3/5 sm:items-center sm:justify-between border border-pastel-pink-400 p-2 rounded-lg sm:flex-row gap-2">
            <label className="p-2" htmlFor='category'>Categoría</label>
            <select name='category' id='category' onChange={categoryHandler} className="p-2 rounded-xl">
              <option className='p-2' defaultValue='' value=''></option>
              <option className='p-2' value='JEANS'>JEANS</option>
              <option className='p-2' value='REMERITAS-TOPS'>REMERITAS-TOPS</option>
              <option className='p-2' value='BUZOS'>BUZOS</option>
              <option className='p-2' value='SHORTS-MINIS'>SHORTS-MINIS</option>
              <option className='p-2' value='BLAZERS'>BLAZERS</option>
              <option className='p-2' value='VESTIDOS'>VESTIDOS</option>
            </select>
          </div>
          <div className="flex flex-col border w-full md:w-3/5 sm:items-center sm:justify-center flex-wrap border-pastel-pink-400 p-2 rounded-lg sm:flex-row gap-2">
            <div className="flex flex-col sm:w-full sm:justify-between sm:flex-row gap-2">
              <label className="p-2" htmlFor='size'>Talles</label>
              <input onChange={sizeHandler} className="p-2 rounded-xl" type='text' name='size' id='size' />
            </div>
            <div className='flex flex-col sm:flex-row sm:w-full sm:justify-between gap-2'>
              <label className="p-2" htmlFor='sizeQuantity'>Cantidad</label>
              <input onChange={sizeQuantityHandler} className="p-2 rounded-xl" type='number' name='sizeQuantity' id='sizeQuantity' />
            </div>
            {sizes && sizes.length > 0 ?
              <div className="flex w-full">
                <ul className="flex flex-wrap gap-2">
                  {sizes?.map(({talle, cantidad}) => <li key={talle}><button className="text-black font-bold" onClick={deleteSizeHandler} value={talle} name="size">&quot;{talle}&quot;:{cantidad}</button></li>)}
                </ul>
              </div> : null}
            <button onClick={addSizeHandler} className="bg-white p-2 rounded-xl">Agregar</button>
          </div>
          <div className="flex flex-col w-full md:w-3/5 sm:items-center sm:justify-between sm:flex-wrap border border-pastel-pink-400 p-2 rounded-lg sm:flex-row gap-2">
            <label className="p-2" htmlFor='image'>Imágen</label>
            <input onChange={imageHandler} className="p-2 rounded-xl" type='file' accept='image/*' name='image' id='image' />
            {images && images.length > 0 ?
              <div className="flex w-full">
                <ul className="flex flex-wrap gap-2">
                  {images?.map((image:string) => <li key={image}><button className="text-black font-bold" onClick={deleteImageHandler} value={image} name="image"><Image className="rounded-xl" src={image} alt="Imagen del producto" width={100} height={100} /></button></li>)}
                </ul>
              </div> : null}
            <div className='flex w-full items-center gap-2 justify-around'>
              <button onClick={addImageHandler} className="bg-white p-2 rounded-xl">Agregar</button>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full md:w-3/5 sm:justify-between gap-2'>
            <button onClick={previewHandler} className="bg-white p-2 rounded-xl">Previsualizar</button>
            <button className="bg-white p-2 rounded-xl" type="submit">Cargar producto</button>
          </div>
        </form>
      </div>
    </main>
  )
}