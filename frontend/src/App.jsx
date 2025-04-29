import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import './index.css'

import Webcam from 'react-webcam';
import { drawRect } from './utilities';

// Import du modèle TensorFlow
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

// Import de la gestion localStorage
import { savePrediction, getPredictions } from './utils/storage';

// Import de l'historique
import History from './History';
import Header from './templates/Header';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [net, setNet] = useState(null);
  const [predictions, setPredictions] = useState([]);

    // Charger les prédictions au démarrage
    useEffect(() => {
      const storedPredictions = getPredictions();
      setPredictions(storedPredictions);
    }, []);

  // Chargement du modèle COCO-SSD
  useEffect(() => {
    const loadModel = async () => {
      const model = await cocossd.load();
      setNet(model);
    };
    loadModel();
  }, []);
  // Prise de photo et prédiction
  useEffect(() => {
    if (net) {
      const interval = setInterval(() => {
        detectAndDraw();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [net]);

  const detectAndDraw = async () => {
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);
    }
}

  const handleCapture = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      net
    ) {
      const video = webcamRef.current.video;
      const imageSrc = webcamRef.current.getScreenshot();
      const obj = await net.detect(video);

      if(obj.length > 0 && imageSrc){
        const label = obj[0].class;
        const date = new Date().toLocaleString();
        const prediction = {
          label: label,
          date: date,
          imageSrc: imageSrc,
        };
        savePrediction(prediction);
        setPredictions(prev => [...prev, prediction]);

      } else {
      alert("Aucun objet détecté !");
    }
    }

  };
  return (
    <div className="App">
      <Header/>
    <section
  className="relative border-5 border-solid border-slate-800 rounded-lg hover:shadow-[0px_0px_15px_3px_rgba(76,_29,_149,_0.70)] bg-slate-950 hover:border-fuchsia-700 transition duration-800 w-full lg:w-[70%] mx-auto aspect-[4/3]"
>
  <div className="absolute top-0 left-0 w-full h-full">
    <Webcam
      ref={webcamRef}
      muted={true}
      screenshotFormat="image/jpeg"
      className="w-full h-full object-cover rounded-lg z-8"
    />
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-9"
    />
  </div>
</section>
      <div className='p-5'>

          <button onClick={handleCapture} className='px-7 py-4 bg-purple-800 rounded-lg leading-none border-2 border-solid border-slate-900 text-white hover:shadow-[0px_0px_15px_3px_rgba(76,_29,_149,_0.70)] bg-slate-950 hover:border-fuchsia-700 transition duration-800'>
          Capture
          </button>

      </div>
      <History predictions={predictions} setPredictions={setPredictions} />    </div>
  );
}

export default App;
