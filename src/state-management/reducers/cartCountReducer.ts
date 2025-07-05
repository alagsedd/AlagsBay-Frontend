interface AddCartAction {
    type: "ADD"
}

interface DeleteCartAction {
    type: "DELETE"
}
export type CartAction = AddCartAction | DeleteCartAction

const cartCountReducer = (cartCount:number, action: CartAction): number =>  {
    let newCount = cartCount
    if (action.type === 'ADD')  {newCount = cartCount + 1}
    if (action.type === 'DELETE') {newCount =  cartCount - 1}

    localStorage.setItem("cartCount", String(newCount));

    return newCount
}

export default cartCountReducer