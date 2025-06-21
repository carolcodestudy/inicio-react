import { useState, useEffect, useContext } from 'react'
import { request } from '../../service'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../context'
import { toast } from 'react-hot-toast'

export interface ProductsProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;    
}

const Home = () => {
    const { toAdd } = useContext(CartContext)
    const [ product, setProduct ] = useState<ProductsProps[]>([])

    useEffect(()=>{
        //Renderizar a requisição
        async function toGetRequest(){
            const my_request = await request.get("/products")
            setProduct(my_request.data)
        }
        toGetRequest()
    }, [])

    function toAddCart (item : ProductsProps){
        toast.success("Item adicionado" , {
            style :{
                color : 'green',
                backgroundColor : 'black'
            },
            duration : 500
        })
            toAdd(item)
    }

    return(
        <main className="w-full max-w-7xl px-4 mx-auto cursor-context-menu">
            <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">

            {product.map(( item )=>(
            <section key={item.id} className="w-full">
                <img className="w-full rounded-lg max-h-70 mb-2" src={item.cover} alt={item.title} />
                <p className="font-medium mt-1 mb-2">{item.title}</p>

                <div className="flex gap-3 items-center">
                        <strong className="text-zinc-700/90">{item.price.toLocaleString("pt-br", {
                            style : "currency",
                            currency : "BRL"
                        })}</strong>

                    <button className="bg-zinc-900 p-1 rounded" onClick={ () => toAddCart(item) }>
                        <BsCartPlus size={20} color='#FFF' cursor={'pointer'}/>
                        </button>
                </div>
            </section>
            ))}

            </div>
        </main>
    )
}

export {Home}