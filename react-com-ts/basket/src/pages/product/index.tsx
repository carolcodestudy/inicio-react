import { useEffect, useState, useContext } from 'react'
import type { ProductsProps } from '../home'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../service'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../context'
import toast from 'react-hot-toast'

const Product = () => {

    const { id } = useParams()
    const [prod, setProd] = useState<ProductsProps>()
    const { toAdd } = useContext(CartContext)
    const url = useNavigate()

    useEffect(()=>{
        async function toGetRequest(){
            //Precisa passar o mesmo nome em path :''
            const my_request = await request.get(`/products/${id}`)
            setProd(my_request.data)
            console.log(my_request.data);
        }
        toGetRequest()
    }, [id])

    const addCart = (item : ProductsProps) =>{
        toAdd(item)
        toast.success("Produto adicionado!" , {
            style : {
                borderRadius : 10,
                backgroundColor : "#121212",
                color : "#FFF"
            },
            duration : 600
        })
        setTimeout(()=>{
            url('/basket')
        },1500)
    }
    
    return(
    <>
        {prod &&(
            <main className='w-full max-w-7xl px-4 mx-auto my-6'>
                <section className='w-full'>
                    <div className='flex flex-col lg:flex-row'>
                        <img src={prod?.cover} alt={prod?.title} className='flex-1 w-full max-h-72 object-contain' />

                        <div className='flex-1'>
                            <p className='font-bold text-2xl mt-4 mb-2'>{prod?.title}</p>
                            <p className='my-4'>{prod?.description}</p>
                            <strong>
                                {prod?.price.toLocaleString("pt-BR", {
                                    style : "currency",
                                    currency : "BRL"
                                })}
                            </strong>
                            <button className='bg-zinc-900 p-1 rounded ml-3' onClick={() => addCart(prod)}> <BsCartPlus size={20} color='#FFF' cursor={'pointer'}/> </button>
                        </div>
                    </div>
                    </section>
            </main>
        )}
    </>
    )
}

export {Product}