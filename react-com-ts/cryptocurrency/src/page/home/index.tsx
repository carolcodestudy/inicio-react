import { useState, FormEvent, useEffect } from 'react'
import style from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

//Precisa passar o menos nome da chave da api dentro da interface! Se não dá indefinido!
//Exporta para passar para a pasta de crypto onde contém os detalhes da moeda
export interface CoinProps{
    id : string,
    name : string,
    symbol : string,
    priceUsd : string,
    vwap24Hr : string,
    changePercent24Hr : string, 
    rank : string,
    supply : string,
    maxSupply :string,
    marketCapUsd :  string,
    volumeUsd24Hr : string,
    explorer : string,
    coinFormat ?: string,
    marketFormat ?: string,
    volumeFormart ?: string
}

interface DatesProp{
    //Indica o tipo da variavel que recebe um array
    data : CoinProps[]
}

export function Home(){

    const [coin, setCoin] = useState("")
    const [datesCoin, setDatesCoin] = useState<CoinProps[]>([])
    const navigate = useNavigate()
    const [load, setLoad] = useState(0)

    const searchCoin = (e :  FormEvent) =>{
        e.preventDefault() 
        if(coin === "") return;
        navigate(`/crypto/${coin.toLocaleLowerCase()}`)
    }
    
    useEffect(()=>{
        takeAPI()
    }, [load])

    const loadMore = () =>{
        //Caso não tenha apertado o botão ainda
        if(load === 0){
            //Vai preencher o offset com 10, para que acrregue as outras criptomoeadas
            setLoad(10)
        }
        //caso já tenha apertado vai adicionar na tela mais 10 criptomoedas
        setLoad(load + 10)
    }

    const takeAPI = async () => {

        const my_key = '1ac40ba472bb76e33096880930d13f019bcc23f5c57c91da110893370e2fb9b3'

        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${load}&apiKey=${my_key}`)
        .then(response => response.json()).then((data : DatesProp) =>{
            //Precisa percorrer a lista de objeto e formatar a moeda 
            const list_coin = data.data
            console.log(list_coin);
            
            //Biblioteca de intercionalização = Intl
            const format_val = Intl.NumberFormat("en-US", {
                style : "currency",
                currency : "USD"
            })

            const compact_val = Intl.NumberFormat("en-US", {
                style : "currency",
                currency : "USD",
                //Diminui a exibição do numerro, como se fosse arredondar
                notation : "compact"
            })
                 
           const maping_data = list_coin.map((item)=>{     
                const format_info = {
                    ...item,
                    coinFormat : format_val.format(Number(item.priceUsd)),
                    marketFormat : compact_val.format(Number(item.marketCapUsd)),
                    volumeFormart : compact_val.format(Number(item.volumeUsd24Hr))
                }
                return format_info
             })

             const all_cryptos = [...datesCoin, ...maping_data]

             setDatesCoin(all_cryptos)
        })
    }

    return(
        <main className={style.container}>
            <form className={style.form} onSubmit={searchCoin}>
                <input type="text" value={coin} onChange={(e)=>setCoin(e.target.value)} placeholder='Pesquisar criptomoeda' />
                <button type="submit"> <BsSearch/> </button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th scope='col' className={style.th}>Moeda</th>
                            <th scope='col' className={style.th}>Valor mercado</th>
                            <th scope='col' className={style.th}>Preço</th>
                            <th scope='col' className={style.th}>Volume</th>
                            <th scope='col' className={style.th}>Mudança 24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datesCoin.length > 0 && datesCoin.map( (item)=> (
                        <tr className={style.tr} key={item.id}>
                            <td className={style.td} data-label="Moeda">
                                <div className={style.div_coin}>
                                    <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} alt={`Logo ${item.id}`} />
                                    <Link to ={`crypto/${item.id}`}>
                                            <span>{item.name}</span> | {item.symbol}
                                    </Link>
                                </div>
                            </td>
                            <td className={style.td} data-label="Valor mercado">{item.marketFormat}</td>
                            <td className={style.td} data-label="Preço">{item.coinFormat}</td>
                            <td className={style.td} data-label="Volume">{item.volumeFormart}</td>
                            <td className={Number(item.changePercent24Hr) > 0 ? style.tdProfit : style.tdLoss} data-label="Mudança 24h">
                                <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                            </td>
                        </tr>
                        ) )}
                    </tbody>
                </table>

                <button className='button_load' onClick={loadMore}>Carregar mais</button>
        </main>
    )
}