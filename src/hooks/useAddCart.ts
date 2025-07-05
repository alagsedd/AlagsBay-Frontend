import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface ItemData {
  product_id: number;
  quantity: number;
}
const useAddCart = (onAddSuccess: () => void) => {
     return useMutation({
    mutationFn: (itemData: ItemData) => {
      let cartId = localStorage.getItem("cartId");

      if (cartId) {
        return apiClient
          .post<ItemData>(`/store/carts/${cartId}/items/`, itemData)
          .then((res) => {
            console.log("Item added: ", res.data);
          })
          .catch((err) => {
            console.log("Error 1");
            console.log("Error adding item: ", err);
          });
      } else {
        //create cart
        return apiClient.post(`/store/carts/`).then((res) => {
          cartId = res.data.id;
          localStorage.setItem("cartId", String(cartId));

          return apiClient
            .post<ItemData>(`/store/carts/${cartId}/items/`, itemData)
            .then((res) => {
              console.log("Item added to new cart:", res.data);
            })
            .catch((error) => {
              console.error("Error creating cart or adding item:", error);
            });
        });
      }
    },
    onSuccess:()=> onAddSuccess(),
    onError: () => {
      console.log("React Query: onError called");
    },
  });

}
export default useAddCart
