import { atom, selector } from 'recoil';
export const cartState = atom({
    key: 'cart',
    // each item in list has 3 keys: id, product and quantity
    default: [],
});
export const addToCart = (cart, item) => {
    const newCart = [...cart];
    const foundIndex = cart.findIndex(x => x.id === item.id);
    // Increase quantity if existing
    if (foundIndex >= 0) {
        newCart[foundIndex] = {
            ...cart[foundIndex],
            quantity: cart[foundIndex].quantity + 1,
        };
        return newCart;

    }
    // Add new item
    newCart.push({
        id: item.id,
        product: item,
        quantity: 1,
    });
    return newCart;
};
export const minusQty = (cart, item) => {
    const newCart = [...cart];
    const foundIndex = cart.findIndex(x => x.id === item.id);
    newCart[foundIndex] = {
        ...cart[foundIndex],
        quantity: cart[foundIndex].quantity - 1,
    };
    return newCart;
};
export const deleteCart = (cart, item) => {
    const newCart = [...cart];
    const cartList = newCart.filter(x => x.id !== item.id)
    return cartList;
}
export const cartTotal = selector({
    key: 'cartTotal',
    get: ({ get }) => {
        const cart = get(cartState);
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }
});
export const cartLength=selector({ 
    key:'cartLength',
    get:({get})=> {
        const cart=get(cartState);
        return cart.length;
    }
})