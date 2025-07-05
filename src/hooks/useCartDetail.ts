import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/api-client"

interface Product {
    id: number
    title: string
    unit_price: number
}
interface Item  {
    id: number
    product: Product
    quantity: number
    total_price: number
}
interface Cart {
    id: number
    items: Item[]
    totalPrice: number
}
const useCartDetail =(cartId: number) => {
    const fetchCard = () =>
        apiClient.get<Cart>('/store/carts/')
    .then(res => res.data)
    return useQuery<Cart, Error>({
        queryKey: ['cart', cartId],
        queryFn: fetchCard
    })
}
export default useCartDetail