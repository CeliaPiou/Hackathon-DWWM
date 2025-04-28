import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { drawRect } from './utilities';

// Import du modèle TensorFlow
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

// Import de la gestion localStorage
import { savePrediction } from './utils/storage';

// Import de l'historique
import History from './History';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [net, setNet] = useState(null);

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
    } else {
      alert("Aucun objet détecté !");
    }
    }
  
  };
  return (
    <div className="App">
      <header className="App-header" style={{ position: 'relative', width: "640px", height: "480px", margin: "auto" }}>
        <Webcam
          ref={webcamRef}
          muted={true}
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            textAlign: "center",
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: "auto",
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
      <div>
        <button onClick={handleCapture} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
          Capturer un snapshot 
        </button>
      </div>
      <History />
    </div>
  );
}

export default App;
