'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Noticia from "../../../components/Noticia"
import './style.css'

//componentes
import LateralEsquerdo from "@/components/LateralEsquerdo"
import LateralDireito from "@/components/LateralDireito"


const HomePage = () => {
    const [noticias, setNoticias] = useState([])//constante para guardar todas as noticias do db


    //função que pega todas as noticias do db e manda para constante noticias
    const getNoticias = async () => {
    try {
        const result = await axios.get('http://localhost:8080/noticias')
        setNoticias(result.data)
        
    } catch (error) {
        alert(error.response.data.message)
        }
    }

    //função que pega a noticia mais popular
    const getNoticiasMaisPopulares = () => {
        if(noticias){
            return noticias.find(noticia => noticia.isPopular)
        }}
    //função que pega as ultimas noticias
    const getUltimasNoticias = () => {
        if(noticias){
            return noticias.filter(noticia => noticia.isUltimas)}}
    
    //quando a pagina carregar, chama a função de pegar noticias do db e mostrar na tela
    useEffect(() => {
        getNoticias()
    }, []);

    return (
        <div className="grid-home" >
            {getNoticiasMaisPopulares() && <LateralEsquerdo  noticia={getNoticiasMaisPopulares()}/>}
            <div>
                { noticias.map(noticia=>
                    <Noticia key={noticia.id} noticia={noticia} />)
                }
            </div>
            { getUltimasNoticias() && <LateralDireito noticias={getUltimasNoticias()}/>}
            
        </div>
    )
}

export default HomePage

