import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client"; // use the shared Axios instance

interface Collection {
  id: number;
  title: string;
}

const useCollections = () => {
  const fetchCollections = () =>
    apiClient.get<Collection[]>("store/collections/").then((res) => res.data);

  return useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });
};

export default useCollections;
