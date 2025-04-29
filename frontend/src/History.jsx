import React, { useState, useEffect} from "react";
import { getPredictions, clearPredictions } from "./utils/storage";
import './index.css'


// import CSS
import './index.css';


function History({ predictions, setPredictions }) {


    useEffect(() => {
        const storedPredictions = getPredictions();
        setPredictions(storedPredictions);
    }, []);

    const handleClearHistory = () => {
      clearPredictions();
      setPredictions([]);
    };

    return (

        <div className="text-white">
        <h2 className="pb-5">Historique des Prédictions</h2>



        {predictions.length === 0 ? (
          <p className="pt-5 text-gray-400">Aucune prédiction enregistrée pour l'instant.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {predictions.map((prediction, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                }}
              >
                {prediction.imageSrc && (
                  <img
                    src={prediction.imageSrc}
                    alt={prediction.label}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                )}
                <p><strong>Objet :</strong> {prediction.label}</p>
                <p><strong>Date :</strong> {prediction.date}</p>
              </div>
            ))}
          </div>
        )}

      <button onClick={handleClearHistory} className='m-10 px-7 py-4 bg-slate-950 rounded-lg leading-none border-2 border-solid border-slate-900 text-white hover:shadow-[0px_0px_15px_3px_rgba(76,_29,_149,_0.70)] bg-slate-950 hover:border-violet-950 transition duration-800'>
          Vider l'historique
        </button>
      </div>
    );
  }

  export default History;