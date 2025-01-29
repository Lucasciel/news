'use client'

import { useState } from "react";
import axios from "axios"; //usando api no front
import { useRouter } from "next/navigation";//redirecionar para outra pagina

const CadastroNoticiaForm = ()=> {
    const router = useRouter() //redirecionar para outra pagina

    const [titulo, setTitulo] = useState('');
    const [img, setImg] = useState('');
    const [texto, setTexto] = useState('');
    const [categoria, setCategoria] = useState('');

    const  aoSubmeter = async(e)=> {
        e.preventDefault();
        try{
            const formulario = {
                titulo,
                img,
                texto,
                categoria,
            };
            const result = await axios.post('http://localhost:8080/noticias', formulario) //enviando noticia
            alert("Noticia criada com sucesso") //mensagem de sucesso
            router.push('/home')//redirecionar para outra pagina

            }catch(error){
                alert(error.response.data.message)
            }
    }  

    //função para guardar os valores do input na constante
    const aoAlterarValores =(e) => {
        const {name, value} = e.target
        if(name === 'titulo'){
            setTitulo(value)
        }

        if(name === 'img'){
            setImg(value)
        }

        if(name === 'texto'){
            setTexto(value)
        }

        if(name === 'categoria'){
            setCategoria(value)
        }

    }

    return(
        <form onSubmit={aoSubmeter}>
            <div>
                <label htmlFor="titulo">titulo</label>
                <input type="text" name="titulo" onChange={aoAlterarValores} />
            </div>

            <div>
                <label htmlFor="img">img</label>
                <input type="text" name="img" onChange={aoAlterarValores} />
            </div>

            <div>
                <label htmlFor="texto">texto</label>
                <textarea type="text" name="texto" onChange={ aoAlterarValores} />
            </div>
            <div>
                <label htmlFor="categoria">categoria</label>
                <select name="categoria" onChange={ aoAlterarValores}>
                    <option value="Produto">Produto</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="rh">RH</option>
                    <option value="vendas">Vendas</option>
                </select>
            </div>
            <button type="submit" onClick={ aoSubmeter}>Criar Noticia</button>
        </form>
    )
}

export default CadastroNoticiaForm