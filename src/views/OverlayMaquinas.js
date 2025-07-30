// src/views/ListaMaquinasOverlayView.js
import React from "react";
import { useLocation } from "react-router-dom";
import ListaMaquinasOL from "../componets/ListaMaquinasOL";
import "../styles/ListaMaquinasOverlayView.css";

const ListaMaquinasOverlayView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const overlayWidth = params.get("width") || "1920";
  const overlayHeight = params.get("height") || "1080";

  const innerWidth = params.get("boxWidth") || "250";
  const innerHeight = params.get("boxHeight") || "205";
  const x = params.get("x") || overlayWidth - innerWidth;
  const y = params.get("y") || (overlayHeight - innerHeight) / 2;

  return (
    <div
      className="overlay"
      style={{
        width: `${overlayWidth}px`,
        height: `${overlayHeight}px`,
      }}
    >
      <div
        className="inner-box"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${innerWidth}px`,
          height: `${innerHeight}px`,
        }}
      >
        <ListaMaquinasOL
          width={`${innerWidth}px`}
          height={`${innerHeight}px`}
        />
      </div>
    </div>
  );
};

export default ListaMaquinasOverlayView;
