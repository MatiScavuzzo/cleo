import { supabase } from "./supabase"

export const uploadFile = async (file: File, fileName:string) => {
  const {data, error} = await supabase.storage.from('products').upload(fileName, file)
  if (error) {
    console.error(error)
  }
  return data
}

export const getImageUrl = (fileName:string) => {
  const {data} = supabase.storage.from('products').getPublicUrl(fileName)
  if (data) return data.publicUrl
}

export const deleteFile = async (fileName:string) => {
  const {data, error} = await supabase.storage.from('products').remove([fileName])
  if (error) {
    console.error(error)
  }
  return data
}

export const listFiles = async () => {
  const {data, error} = await supabase.storage.from('products').list()
  if (error) {
    console.error(error)
  }
  return data
}
