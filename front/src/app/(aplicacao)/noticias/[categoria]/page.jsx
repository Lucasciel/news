'use client'
import GridNoticias from "@/components/GridNoticias" // importando o componente GridNoticias
import { useEffect, useState } from "react" 
import axios from "axios"



const NoticiasPage = ({params}) => {

    const [noticias, setNoticias] = useState([])

    const getNoticias = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/noticias?categoria=${params.categoria}`)
            setNoticias(result.data)
            
        } catch (error) {
            alert(error.response.data.message)
            }
    }

    useEffect(() => {
        getNoticias()
    },[])  


    return(
        <div>
            <h1>{params.categoria.toUpperCase()}</h1>
            <GridNoticias noticias={noticias}/>
        </div>
    )
}

export default NoticiasPage