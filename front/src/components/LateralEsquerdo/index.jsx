'use client'
//componentes
import CardNoticia from "../CardNoticia";// componente que cria card pegando os dados do back end

//css
import './style.css'

//função que corta o texto e coloca reticencias
import { truncateWithEllipses } from '../../app/libs/truncateWithEllipses';


export function LateralEsquerdo({noticia}) {

    noticia.texto = truncateWithEllipses(noticia.texto, 50);
    return (
        <div className="mais-popular">
            <div className="titulo">MAIS POPULAR</div>
            <CardNoticia noticia={ noticia } temHover={true}/> 
        </div>
    );
}

export default LateralEsquerdo;