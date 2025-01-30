import { useState } from "react";
import "./App.css";

const App = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const claveApi = "8380b7895100847cb1187acc2cef6821";
  const convertirACelsius = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [datosClima, setDatosClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${claveApi}&lang=es`);
      const datos = await response.json();
      setDatosClima(datos);
    } catch (error) {
      console.error("Ocurrió el siguiente problema: ", error);
    }
  };

  return (
    <div className="contenedor">
      <h1>App del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {datosClima && (
        <div id="clima">
          <h2>{datosClima.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${datosClima.weather[0].icon}@2x.png`}
          />
          <p>
            Temperatura: 
            <span>
              {parseInt(datosClima?.main?.temp - convertirACelsius)}ºC
            </span>
          </p>
          <p>
            Condición meteorológica:
            <span>{datosClima.weather[0].description}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
