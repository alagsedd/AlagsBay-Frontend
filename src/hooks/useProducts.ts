import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client"; // use your configured axios instance

interface Image {
  id: number;
  image: string;
}

interface Product {
  id: number;
  title: string;
  unit_price: number;
  images: Image[];
}

const useProducts = () => {
  const fetchProducts = () =>
    apiClient.get<Product[]>("store/products/").then((res) => res.data); // No localhost, no hardcoding

  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
