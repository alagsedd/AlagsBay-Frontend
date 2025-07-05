import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Image {
    id: number
    image: string
}
export interface Product {
    id: number
    title: string
    unit_price:number
    description:string
    inventory: number
    collection: string
    images: Image[]
}

const useProductsDetail = (id:number) => {
    const fetchProducts = () =>
    axios.get<Product>(`http://127.0.0.1:8000/store/products/${id}`)
    .then(res => res.data)

    return useQuery<Product, Error>({
        queryKey: ['products', id],
        queryFn: fetchProducts
    })
}

export default useProductsDetail
