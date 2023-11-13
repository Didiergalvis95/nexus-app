import React, { useState } from "react";
import "./Buttons.css";
import axios from "axios";

const peticion = "http://127.0.0.1:8000/home/exportar-csv/";

const Buttons = () => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);

  const handleDownloadCSV = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${peticion}${nombre}`);
      const csvData = response.data;
      setError(null);
      console.log(csvData);
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
      console.log(url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="overlap">
      <div className="wrapperOverlap">
        <div class="select">
          <select name="format" id="format">
            <option selected disabled>
              Selecciona
            </option>
            <option value="pdf">..-</option>
            <option value="txt">...</option>
            <option value="epub">...</option>
            <option value="fb2">...</option>
            <option value="mobi">...</option>
          </select>
        </div>
        <div className="item-container">
        <div className="item">
          <div className="buttonPremiun">
            <span className="sprite pdf"></span>
            <span>PDF</span>
            <span className="buttonIcon">+</span>
          </div>
        </div>
        
        <div className="item">
          <div className="buttonPremiun">
            <span className="sprite png"></span>
            <span>PDF</span>
            <span className="buttonIcon">+</span>
          </div>
        </div>
        <div className="item">
          <div className="buttonPremiun">
            <span className="sprite csv"></span>
            <span>PDF</span>
            <span className="buttonIcon">+</span>
          </div>
        </div>
        <div className="item">
          <div className="buttonPremiun">
            <span className="sprite svg"></span>
            <span>PDF</span>
            <span className="buttonIcon">+</span>
          </div>

        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Buttons;
