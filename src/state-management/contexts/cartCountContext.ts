import React from "react"
import type { CartAction } from "../reducers/cartCountReducer"

interface CartCountActionType {
    count: number
    cartCountDispatch: React.ActionDispatch<[action: CartAction]>
}

const CartCountContext = React.createContext<CartCountActionType>({} as CartCountActionType)

export default CartCountContext