import React, { useState, useEffect } from "react";
import "./Buttons.css";
import axios from "axios";

const peticion = "http://127.0.0.1:8000/dashboard/exportar_csv/";
const peticionPng = "http://127.0.0.1:8000/dashboard/generar_grafico/";
const peticionPdf = "http://127.0.0.1:8000/dashboard/generar_pdf/";
const peticionTipo = "http://127.0.0.1:8000/dashboard/tipo/";

const Buttons = () => {
  const [nombres, setNombre] = useState("");
  const [error, setError] = useState(null);
  const [tipos, setTipos] = useState([]);

  const getTipo = async () => {
    try {
      const res = await axios.get(peticionTipo);
      setTipos(res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const getPdf = async () => {
    try {
      const res = await axios.get(`${peticionPdf}${nombres}`);
      console.log("Respuesta de getPdf:", res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  
  const getPng = async () => {
    try {
      const res = await axios.get(`${peticionPng}${nombres}`);
      console.log("Respuesta de getPng:", res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  

  useEffect(() => {
    getTipo();
  }, []);

  const handleDownloadCSV = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${peticion}${nombres}`);
      const csvData = response.data;

      console.log("Contenido del CSV:", csvData);
      setError(null);

      const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvData], {
        type: "text/csv;charset=UTF-8",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "datos.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="overlap">
      <div className="wrapperOverlap">
        <div className="select">
          {tipos.length > 0 && (
            <select
              name="format"
              id="format"
              onChange={(e) => setNombre(e.target.value)}
            >
              <option value="" disabled>
                Selecciona
              </option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.nombre}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="item-container">
          <div className="item">
            <button className="buttonPremiun" onClick={getPdf}>
              <span className="sprite pdf"></span>
              <span>PDF</span>
              <span className="buttonIcon">+</span>
            </button>
          </div>

          <div className="item">
            <button className="buttonPremiun" onClick={getPng}>
              <span className="sprite png"></span>
              <span>PNG</span>
              <span className="buttonIcon">+</span>
            </button>
          </div>
          <div className="item">
            <button className="buttonPremiun" onClick={handleDownloadCSV}>
              <span className="sprite csv"></span>
              <span>CSV</span>
              <span className="buttonIcon">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
