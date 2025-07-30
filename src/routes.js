import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView.js";
import Overlay from "./views/Overlay";
import OverlayID from "./views/OverlayID";
import OverlayEditorView from "./views/OverlayEditorView";
import OverlayMaquinas from "./views/OverlayMaquinas";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/overlay" element={<Overlay />} />
      <Route path="/overlayid/:id" element={<OverlayID />} />
      <Route path="/editor" element={<OverlayEditorView />} />
      <Route path="/overlay-maquinas" element={<OverlayMaquinas />} />
    </Routes>
  );
};

export default AppRouter;
