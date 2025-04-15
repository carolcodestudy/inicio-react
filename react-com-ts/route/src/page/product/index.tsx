import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export function Product(){
    const { key } = useParams();
    return(
        <div>
            <h1>Tela de produto {key}</h1>
            <Link to="/">Página Home</Link>
        </div>
    )
}