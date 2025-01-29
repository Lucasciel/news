'use client'; //importante para importação

import axios from "axios"; //enviar para o bacokend as informações de usuario

import { useState } from "react"; //guardar os valores do input
import { useRouter } from "next/navigation";//redirecionar para outra pagina

const LoginForm = () => {

    const router = useRouter() //redirecionar para outra pagina

    //guardar email e senha digitados o input
    const [formulario, setFormulario]= useState({
        email: '',
        senha: ''
    })

    //função para usar a api, rota e body
    const aoSubmeter = async(e) => {
        e.preventDefault()
        try{
            const result = await axios.post('http://localhost:8080/login', formulario) //token
            alert(result.data.message) //mensagem de sucesso
            router.push('/admin/noticia/criar') //redirecionar para outra pagina
        }catch(error){
            alert(error.response.data.message)
        }
        console.log(result)
        console.log('submeteu', formulario)
    }

    //função para guardar os valores do input na constante
    const aoAlterarValores = (e) => {
        const {name, value} = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        })

    }
    return(
        <form onSubmit={aoSubmeter}>
            <div>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="" onChange={aoAlterarValores} />
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input type="password" name="senha" onChange={aoAlterarValores}/>
            </div>

            <button type="submit">enviar</button>
        </form>
    )
}

export default LoginForm