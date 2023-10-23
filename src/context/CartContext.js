import { cartReducer } from "../reducer/cartReducer";

const { createContext, useContext, useReducer } = require("react")



const initialState={
    cartList: [],
    total:0,
    // addToCart,
    // removeFromCart
}
const CartContext=createContext(initialState);
 export const CartProvider =({children})=>{
    const [ state,dispatch] =useReducer(cartReducer,initialState);
    
    
    const addToCart=(product)=>{
       const updatedCartList= state.cartList.concat(product);
       updatedTotal(updatedCartList);

        dispatch({
            type: "ADD_TO_CART",
            payload:{
                products: updatedCartList
            }
        })
    }
    const removeFromCart=(product)=>{
        // updatedTotal(updatedCartList);

        const updatedCartList=state.cartList.filter(current => current.id !== product.id)
        updatedTotal(updatedCartList);
        dispatch({ 
            type:"REMOVE_FROM_CART",
            payload:{ 
                products: updatedCartList
            }
        })
    }
    
    const updatedTotal =(products)=>{
        let total =0;

        products.forEach(product=> total=total+product.price);
        
        // updatedTotal(updatedCartList);
        dispatch({
            type:"UPDATE_TOTAL",
            payload:{
                total
            }
        })
    }

    const value={
        total:state.total,
        cartList:state.cartList,
        addToCart,
        removeFromCart
    };
    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
}       
export const useCart=()=>
{
    const context=useContext(CartContext)
    return context;
}