import { Link } from 'react-router-dom'
import  style  from '../header/header.module.css'
import logo from '../../assets/logo.svg'

const Header = () =>{

    return (
        <header className={style.container}>
                <Link to={` /crypto/:key `}>
                <img src={logo} alt="Dev Currency" />
                </Link>
        </header>
    )
}

export { Header }