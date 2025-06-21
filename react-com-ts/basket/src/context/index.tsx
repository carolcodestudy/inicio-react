import { createContext, useState, type ReactNode } from 'react'
import type { ProductsProps } from '../pages/home'

//O context da data que vai passar as informações
interface CartContextData{
 cart : ProductProps[]
 cartLenght : number,
 toAdd : (newItem : ProductsProps) => void,
 toRemove : (product : ProductProps) => void,
 total : string
}

//Interface dos dados
interface ProductProps{
  id: number,
  title: string,
  description: string,
  price: number,
  cover: string,
  amount : number,
  total : number  
}

//Tipar o ReactNode, conteúdo da página
interface ProvCardProps{
 children : ReactNode
}

export const CartContext = createContext({} as CartContextData)

 function CartProvider({children} :  ProvCardProps){

    const [cart, setCart ] = useState<ProductProps[]>([])
    const [total, setTotal] = useState("")

    const toAdd = (newItem : ProductsProps) => {

        let itemIndex = cart.findIndex(item => item.id === newItem.id)

        //Adiciona mais de um mesmo produto
        if(itemIndex !== -1){
            //Quanti. dos produtos
            let cartList = [...cart]
            let myItem = cartList[itemIndex]

            const objItem = {
                ...myItem,
                amount : myItem.amount + 1,
                price :  (myItem.amount + 1) * myItem.price//price é o valor total da lista
            }

            cartList[itemIndex] = objItem
            setCart(cartList)
            toUpdateCart(cartList)
            return
        }
        else{
            const prod = {
                ...newItem,
                amount :  1 ,
                total : newItem.price
            }
          
            setCart(products => [...products, prod])
            toUpdateCart([...cart, prod])      
    }
}

    //Remove item
    const toRemove = (product : ProductProps) => {
        
        let indexItem = cart.findIndex( item => item.id === product.id)
        //Diminui a quantidade dos itens
        if(cart[indexItem]?.amount > 1){
          let cartList = cart
          cartList[indexItem].amount = cartList[indexItem].amount - 1
          cartList[indexItem].price = cartList[indexItem].price - cartList[indexItem].total//total é o preço do produto

          setCart(cartList)
          toUpdateCart(cartList)
          return
        }
        else{
        //Tira o item da lista
        const removeItem = cart.filter(item => item.id !== product.id)
        //Atualiza o valor da variável cart
        setCart(removeItem)
        toUpdateCart(removeItem)
        }
    }

    //Atualiza o valor total da lista
    function toUpdateCart(items : ProductProps[]){
        let cartItems = items
        let result = cartItems.reduce((acc, obj) => { return acc + obj.price}, 0)
        const format = result.toLocaleString("pt-BR", { style : "currency", currency : "BRL"})
        setTotal(format)
        console.log("tipo " ,typeof(format));
    }

    return(
        <CartContext.Provider value={{ cart,  cartLenght : cart.length, toAdd, toRemove, total}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider