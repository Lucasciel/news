"use client";
import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"; //icones gratis

const Menu = () => {
  const router = useRouter();
  const [menuLateral, setMenuLateral] = useState(false);
  return (
    <>
      <nav className="menu">
        <button onClick={() => setMenuLateral(!menuLateral)}>
          <FontAwesomeIcon icon={faBars} size="2x" color="#333" />
        </button>

        <div className="logo-container">
          <FontAwesomeIcon icon={faMugHot} size="2x" />
          <div className="marca">The News</div>
        </div>
        <button className="login" onClick={() => router.push("/login")}>
          Login
        </button>
      </nav>

      {menuLateral && (
        <div className="menu_lateral">
          <div className="fechar" onClick={() => setMenuLateral(!menuLateral)}>
          <FontAwesomeIcon icon={faXmark} size="2x" color="#333" />
          </div>
          <ul>
            <li>
              <a href="/home"> Home</a>
            </li>
            <li>
              <a href="/noticias/produto"> Produto</a>
            </li>
            <li>
              <a href="/noticias/tecnologia"> Tecnologia</a>
            </li>
            <li>
              <a href="/noticias/rh"> RH</a>
            </li>
            <li>
              <a href="/noticias/vendas"> Vendas</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
