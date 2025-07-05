import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Image {
    id: number
    image: string
}
interface Product {
    id: number
    title: string
    unit_price:number
    images: Image[]
}

const useProducts = () => {
    const fetchProducts = () =>
    axios.get<Product[]>('http://127.0.0.1:8000/store/products/')
    .then(res => res.data)

    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts
    })
}

export default useProducts
