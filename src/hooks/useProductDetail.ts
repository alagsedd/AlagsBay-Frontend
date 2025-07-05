import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client"; // Using the configured axios instance

interface Image {
  id: number;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  unit_price: number;
  description: string;
  inventory: number;
  collection: string;
  images: Image[];
}

const useProductsDetail = (id: number) => {
  const fetchProduct = () =>
    apiClient.get<Product>(`store/products/${id}`).then((res) => res.data);

  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });
};

export default useProductsDetail;
