import React, { useEffect, useState, useRef } from "react";
import { obtenerVehiculos } from "../services/VehicleService";
import { io } from "socket.io-client";
import "../styles/ListaMaquinasOL.css";

const ListaMaquinasOL = ({
  width = "300px",
  height = "800px",
  backgroundColor = "rgba(0, 0, 0, 0)",
}) => {
  const [maquinas, setMaquinas] = useState([]);
  const [error, setError] = useState("");
  const [indexActual, setIndexActual] = useState(0);
  const [pausado, setPausado] = useState(false); // ⏸️ Estado para la pausa larga

  const socketRef = useRef(null);

  const categoriasMaquinas = [
    "tractorsS",
    "tractorsM",
    "tractorsL",
    "harvesters",
    "cutters",
    "cultivators",
    "discHarrows",
    "powerHarrows",
    "cars",
    "riceHarvesters",
    "ricePlanters",
    "trucks",
    "planters",
    "seeders",
    "mowers",
    "forestryWinches",
    "plows",
    "misc",
  ];

  const cargarMaquinas = async () => {
    try {
      console.log("🔄 Consultando al backend...");
      const data = await obtenerVehiculos();
      console.log("📦 Datos recibidos:", data);
      if (data.ok) {
        const soloMaquinas = data.vehiculos
          .filter((v) => categoriasMaquinas.includes(v.categoria))
          .sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));
        setMaquinas(soloMaquinas);
      } else {
        setError("Error al obtener las máquinas.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarMaquinas();
  }, []);

  useEffect(() => {
    if (maquinas.length === 0 || pausado) return;

    const intervalo = setInterval(() => {
      setIndexActual((prev) => {
        const nuevoIndex = prev + 1;

        if (nuevoIndex >= maquinas.length) {
          // 💤 Pausa vacía
          setPausado(true);
          setIndexActual(null); // valor especial para no mostrar nada
          setTimeout(() => {
            setPausado(false);
            setIndexActual(0); // volver al primero
          }, 10000); // pausa de 3 segundos
          return prev; // no cambiar el index aún
        }

        return nuevoIndex;
      });
    }, 10000);

    return () => clearInterval(intervalo);
  }, [maquinas, pausado]);

  const maquinaActual = indexActual !== null ? maquinas[indexActual] : null;

  useEffect(() => {
    socketRef.current = io(
      process.env.REACT_APP_API_URL || "http://localhost:3001"
    );

    socketRef.current.on("vehiculo_agregado", (nuevoVehiculo) => {
      console.log("📥 Nuevo vehículo recibido desde socket:", nuevoVehiculo);

      if (categoriasMaquinas.includes(nuevoVehiculo.categoria)) {
        setMaquinas((prev) => [nuevoVehiculo, ...prev]);
        setIndexActual(0); // 🔄 Mostrar inmediatamente el nuevo vehículo
        setPausado(false); // por si estaba en pausa
      }
      cargarMaquinas();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="overlay-container">
      {error && <p className="overlay-error">{error}</p>}

      {maquinaActual && (
        <div className="overlay-item fade-in" key={maquinaActual.id}>
          <img
            src={`${process.env.REACT_APP_API_URL}/images/${maquinaActual.imagen}`}
            alt={maquinaActual.nombre}
            className="overlay-img"
          />
          <div className="overlay-info">
            <div className="overlay-nombre-container">
              <h4 className="overlay-nombre">
                {(() => {
                  const nombreLimpio = maquinaActual.nombre.replace(
                    /\.[^/.]+$/,
                    ""
                  );
                  return /^[a-zA-Z]/.test(nombreLimpio)
                    ? nombreLimpio.charAt(0).toUpperCase() +
                        nombreLimpio.slice(1)
                    : nombreLimpio;
                })()}
              </h4>
            </div>
            <div className="overlay-detalle-container">
              <p className="overlay-detalle">{maquinaActual.marca}</p>
              <p className="overlay-detalle">
                $
                {parseInt(maquinaActual.precioBase)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaMaquinasOL;
