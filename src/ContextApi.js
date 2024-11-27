import React, { createContext, useContext, useEffect, useState } from 'react';
import OffcanvasExample from './offcanvas/Offcanvace';
const UserContext = createContext();
function ContextApi({ children }) {
    const [open,setIsOpen]=useState(false);
    const [cartItem,setCartItem]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):[]);
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(cartItem))
    },[cartItem])
    const getItemQuantity = (id) => {
        const item = cartItem.find((item) => item.id === id);
        return item ? item.quantity : 0;
    };
    const increaseQuantity=(id)=>{

          setCartItem((curritem)=>{
            if(curritem.find((item)=>item.id==id)==null){
                 return [...curritem, { id, quantity: 1 }];
            }
            else{
                return curritem.map((item)=>{
                    if(item.id===id){
                        return {...item,quantity:item.quantity+1}
                    }
                    return item;
                })
            }
          })
    }
    const getTotal=(basket)=>{
        basket.reduce((amout,item)=>{
            return amout+item.price 
        },0)
    }
    const decreaseQuantity=(id)=>{
        setCartItem((currItem)=>{
        if(currItem.find((item)=>item.id==id)==null){
              return currItem.filter((item)=>item.id !==id)
        }
        else{
            return currItem.map((item)=>{
                if(item.id==id){
                    return {...item,quantity:item.quantity-1}
                }
                return item;
            })
          
        }
        })
    }
    const removeItem=(id)=>{
        setCartItem((curritem)=>curritem.filter((item)=>item.id!==id))
    }
    const handleClose=()=>{
        setIsOpen(false)
    }
    const handleShow=()=>{
        setIsOpen(true)
    }
  return (
    <UserContext.Provider value={{getTotal,open,handleClose,handleShow,increaseQuantity,cartItem,getItemQuantity,decreaseQuantity,removeItem}}>
      {children}
    </UserContext.Provider>
  );
}

export const useShareData = () => {
  return useContext(UserContext);
}

export default ContextApi;