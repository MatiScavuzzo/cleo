export type portada = {
  src: string;
  height: number;
  width: number;
}

export type Producto = {
  name: string,
  price: {$numberDecimal: string},
  description: string,
  color: string[],
  category: string,
  stock: number,
  image: string[],
  size: object[],
}