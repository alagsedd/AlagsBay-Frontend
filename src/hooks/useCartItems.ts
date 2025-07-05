import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client"; // Use configured axios instance

interface Image {
  image: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  total_price: number;
  product: {
    title: string;
    unit_price: number;
    images: Image[];
  };
}

const useCartItems = (cartId: string | null) => {
  const fetchCarts = () =>
    apiClient
      .get<CartItem[]>(`store/carts/${cartId}/items/`)
      .then((res) => res.data);

  return useQuery<CartItem[], Error>({
    queryKey: ["cartItems", cartId],
    queryFn: fetchCarts,
    enabled: !!cartId, // Prevents running if cartId is null
  });
};

export default useCartItems;
