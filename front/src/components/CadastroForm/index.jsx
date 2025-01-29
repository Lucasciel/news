'use client'; //importante para importação
import axios from "axios"; //enviar para o bacokend as informações de usuario

import { useState } from "react"; //guardar os valores do input
import { useRouter } from "next/navigation";//redirecionar para outra pagina

const CadastroForm = () => {
    const router = useRouter() //redirecionar para outra pagina

    const [nome, setNome]= useState('')
    const [email, setEmail]= useState('')
    const [senha, setSenha]= useState('')


    //botão
    const aoSubmeter = async(e) => {
        e.preventDefault()

        try{
            const formulario = { //modelo json dos dados coletados para enviar na api
                nome,
                email,
                senha
            }
            //enviar para a api e fazer cadastro
            const result = await axios.post('http://localhost:8080/usuarios', formulario) //token
            alert("usuario foi cadastrado com sucesso!") //mensagem de sucesso
            router.push('/admin/noticia/criar') //redirecionar para outra pagina
        }catch(error){
            alert(error.response.data.message)
        }
        console.log('submetido', nome, email,senha)
    }

    //input
    const aoAlterarValores = (e) => {
        const {name, value} = e.target
        switch(name){ //nome input
            case 'nome':
                setNome(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'senha':
                setSenha(value)
                break;
            default:
                break;
        }

    }
    
    return (
        <form onSubmit={aoSubmeter}>
            <div>
                <label htmlFor="">Nome</label>
                <input type="text" name="nome" onChange={aoAlterarValores}/>
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" name="email" onChange={aoAlterarValores}/>
            </div>
            <div>
                <label htmlFor="">Senha</label>
                <input type="password" name="senha" onChange={aoAlterarValores} />
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}

export default CadastroForm;
