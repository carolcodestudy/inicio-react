import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context'

const Basket = () => {

    const { cart, toAdd, toRemove, total } = useContext(CartContext)

    return(
        <div className="w-full max-w-7xl mx-auto">

            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

            {cart.length === 0 && (
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium'>Carrinho vazio! Adicione um produto na Home.</p>
                    <Link to={'/'} className='bg-slate-600 my-4 pl-2 pr-2 text-white font-medium rounded'>
                     Página inicial
                    </Link>
                </div>
            )}

            { cart.map((item)=> (

                <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300">
                    <img className="w-28" src={item.cover} alt={item.description} />

                    <strong>Preço: {item.total.toLocaleString("pt-BR" , {
                        style : "currency",
                        currency : "BRL"
                    })} </strong>

                    <div className="flex items-center justify-center gap-3">

                        <button onClick={ () => toRemove(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center cursor-pointer">-</button>

                        {item.amount}

                       <button onClick={ () => toAdd(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center cursor-pointer">+</button>

                        </div>
                        <strong className="float-right">SubTotal: {item.price.toLocaleString("pt-BR" , {
                            style : "currency",
                            currency : "BRL"
                        })}</strong>
                </section>      
            )) }
            {cart.length !== 0 && (<p className="font-bold mt-4">Total: {total}</p>)}
        </div>
    )
}

export {Basket}