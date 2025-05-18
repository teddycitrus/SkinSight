"use client"

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Upload() {
    const router = useRouter();
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [diag, setDiag] = useState("")

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraReady(true)
      }
    } catch (err) {
      console.error('Camera access denied or failed:', err)
    }
  }

  const takePicture = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      setImageUrl(dataUrl)
      console.log('Image captured:', dataUrl)
      // Stop the camera after taking a picture
        const stream = video.srcObject
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
        }
    }
  }

  const uploadPicture = async () => {
    if (!imageUrl) {
      console.error('No image to upload')
      return
    }

    setDiag("bruh");
    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageUrl }),
        });
        
        if (!res.ok) {
        throw new Error('Failed to upload image');
        }

        const result = await res.json()
        console.log(result);
        const { illness, confidence } = result;
        console.log('Upload result:', result);
        console.log(`Roboflow says: ${illness} with confidence ${confidence}`);

        router.push(`/diagnosis?illness=${encodeURIComponent(illness)}&confidence=${encodeURIComponent(confidence)}`);
    } catch (error) {
        console.error('Error uploading image:', error)
        setDiag("done");
    }
  }

  let content;
  if(diag!="bruh") {
    content = (<div className="flex justify-center items-center flex-col">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Camera Access</h1>

      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '300px',
          border: '1.5px dashed #D1D5DB',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          position: 'relative',
        }}
      >
        {!cameraReady && (
          <span className="color-#666 pl-5 pr-5">Allow camera access to start recording</span>
        )}
        <video
          ref={videoRef}
          autoPlay
          style={{
            display: cameraReady ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={takePicture}>Take Photo</button>
        {imageUrl && (<button onClick={uploadPicture}>Upload Photo</button>)}
      </div>

      {imageUrl && (
        <div style={{ marginTop: '1rem' }}>
          <p>Preview:</p>
          <img src={imageUrl} alt="Snapshot" style={{ width: '300px', border: '1px solid gray' }} />
        </div>
      )}
    </div>)
  } else {
    content = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="loader">
            <Image
            src="/fav2.svg"
            alt="spinning logo" 
            width={300} 
            height={300} 
            />
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
      {content}
    </div>
  )
}