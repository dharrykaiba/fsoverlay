// src/services/VehicleService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const handleServiceError = (error, message) => {
  console.error("API Error:", error);
  return new Error(message || "Error en el servicio.");
};

// Servicio para obtener todos los vehículos
export const obtenerVehiculos = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehicle`);
    return response.data; // Devuelve el objeto con "ok" y "vehiculos"
  } catch (error) {
    throw handleServiceError(error, "No se pudieron obtener los vehículos.");
  }
};
