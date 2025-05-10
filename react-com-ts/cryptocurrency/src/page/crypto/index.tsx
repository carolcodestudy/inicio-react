import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home'
import  style  from './crypto.module.css'

interface InfoProps{
    data : CoinProps
}

interface ErrorProp{
    data : CoinProps
    error : string
}

type TypeProps = InfoProps | ErrorProp

export function CryptoCurrency(){  

    const { key } = useParams()
    const navigate = useNavigate()
    const [coin, setCoin] = useState<CoinProps>()
    const [flagLoad, setFlagLoad] = useState(true)

    const showInfo = () =>{

    try {
        const my_key = import.meta.env.VITE_MY_KEY
        //rest.coincap.io/v3/assets?apiKey=YourApiKey
        fetch(`https://rest.coincap.io/v3/assets/${key}?apiKey=${my_key}`)
        .then(response => response.json())
        .then((data : TypeProps) =>{
            const info_datas = data.data
            if("error" in data){
                navigate("/")
                return
            }
            console.log("Resposta: " , info_datas);
            const format_val = Intl.NumberFormat("en-US", {
                style : "currency",
                currency : "USD"
            })

            const compact_val = Intl.NumberFormat("en-US", {
                style : "currency",
                currency : "USD",
                notation : "compact"
            })

            const format_info = {
                ...info_datas,
                coinFormat : format_val.format(Number(info_datas.priceUsd)),
                marketFormat : compact_val.format(Number(info_datas.marketCapUsd)),
                volumeFormart : compact_val.format(Number(info_datas.volumeUsd24Hr))
            }
            setCoin(format_info)
            //Se a pág já tiver carreagada 
            setFlagLoad(false)
        })
    } catch (error) {
        console.log("ERRO: " , error);
        navigate("/")
    }
    }

    useEffect(( () =>{
        showInfo()
    }), [key] )

    //Mensagem que aparece quando a pág. ainda está cargando e não tem nenhuma coin
    if(flagLoad || !coin){
        return(
            <span className={style.span_info}>
                <h1>Carregando as informações...</h1>
            </span>
        )
    }

        return(
            <div className={style.container}>
                <h1 className={style.h1_coin}> {coin?.name} </h1> 
                <h2 className={style.h2_symbol}>{coin?.symbol}</h2>

                <section className={style.section}>
                    <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`} alt={`Logo ${coin?.name}`} />
                    <h3 className={style.h3_info}>
                        {coin?.name} | {coin?.symbol}
                    </h3>
                        <p><strong>Preço:</strong> {coin?.coinFormat} </p>
                        <p><strong>Mercado:</strong> {coin?.marketFormat} </p>
                        <p><strong>Volume:</strong> {coin?.volumeFormart} </p>
                        <p className={Number(coin?.changePercent24Hr) > 0 ? style.profit : style.loss}><strong>Mudança:</strong> {Number(coin?.changePercent24Hr).toFixed(3)} </p>
                        
                </section>
            </div>
        )
    }