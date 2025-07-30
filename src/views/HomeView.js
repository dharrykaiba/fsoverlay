// src/views/HomeView.js
import React from "react";
import ListaMaquinasOL from "../componets/ListaMaquinasOL";
const HomeView = () => {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div>
        <h2>Rutas disponibles:</h2>
        <ul>
          <li>
            <a href="/overlay">Ir a Overlay</a>
          </li>
          <li>
            <a href="/overlayid/1">Ir a Overlay por ID (ejemplo ID 1)</a>
          </li>
          <li>
            <a href="/editor">Ir al Editor de Overlay</a>
          </li>{" "}
          <li>
            <a href="/overlay-maquinas">Ir a overlay-maquinas</a>
          </li>
        </ul>
      </div>
      <ListaMaquinasOL />
    </div>
  );
};

export default HomeView;
