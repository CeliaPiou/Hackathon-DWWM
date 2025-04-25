import React from 'react'
import Webcam from 'react-webcam'
import { useEffect } from "react"

const WebcamAccess = () => {

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(() => {
            console.log('Permission demandée (ou accordée)');
          })
          .catch((err) => {
            console.error('Erreur webcam :', err);
          });
      }, []);

  return (
    <div>WebcamAccess
        <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            videoConstraints={{
            facingMode: "user"
            }}
            style={{ border: '2px solid red' }}
    />

    </div>
  )
}

export default WebcamAccess