import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    axios
      .get<CartItem[]>(`http://127.0.0.1:8000/store/carts/${cartId}/items/`)
      .then((res) => res.data);

  return useQuery<CartItem[], Error>({
    queryKey: ["cartItems", cartId],
    queryFn: fetchCarts
  });
};

export default useCartItems;
