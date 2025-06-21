import { Outlet } from 'react-router-dom'
import { Header } from '../header'

export function Layout(){
    return(
        <>
        <Header/>
        {/*Conteúdo abaixo do Header*/}
        <Outlet/>
        </>
    )
}