'use client'
//componentes
import CardNoticia from "../CardNoticia";// componente que cria card pegando os dados do back end

//css
import './style.css'

//função que corta o texto e coloca reticencias
import { truncateWithEllipses } from '../../app/libs/truncateWithEllipses';


//recebe as ultimas noticias e faz card  e resumo para cada uma
export function LateralDireito({noticias}) {
    const noticiasComElipse = () => {
        return noticias.map((noticias, index) => {
            noticias.texto = truncateWithEllipses(noticias.texto, 100);
            return <CardNoticia key={index} noticia={noticias}/>
        })
        
    }
    return (
        <div className="ultimas-noticias">
            <div className="titulo">ULTIMAS NOTICIAS</div>
            {noticias.length && noticiasComElipse()}
        </div>
    );
}

export default LateralDireito;