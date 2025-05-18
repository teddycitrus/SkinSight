"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DiagnosisClient() {
  const searchParams = useSearchParams();
  const illness = searchParams.get("illness");
  const [loading, setLoading] = useState("");
  const [prgphs, setPrgphs] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading("start");

      const res = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ illness }),
      });

      // Parse JSON once
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        // data might be an object, so stringify error message
        throw new Error(data.error || JSON.stringify(data));
      }

      setLoading("end");
      const responseString = data.info;
      const paragraphs = responseString.split("\n\n").map(prgph => prgph.trim());

      setPrgphs(paragraphs);
    } catch (error) {
      console.error("🔥 Error fetching diagnosis data:", error);
      setLoading("error");
    }
  };

  fetchData();
}, []);


    const [lat, setLat] = useState(null);
const [lng, setLng] = useState(null);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(4));
        setLng(position.coords.longitude.toFixed(4));
      },
      (error) => {
        console.error("geolocation error:", error.message);
      }
    );
  } else {
    console.error("geolocation not supported");
  }
}, []);

const handleClinicClick = () => {
  if (lat && lng && illness) {
    const radius = "5000m";
    const gmapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      illness + " clinic"
    )}/@${lat},${lng},${radius}`;
    window.open(gmapsUrl, "_blank");
  } else {
    alert("Location or illness info missing!");
  }
};


    let content;

    if(loading === "start") {
        content = (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="loader">
                <Image
                src="/fav2.svg" 
                alt="spinning logo" 
                width={300} 
                height={300} 
                />
            </div>
        </div>)
    } else if(loading === "error") {
        content = (<div style={{ overflowX: 'hidden', overflowY: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="error">sum went wrong gang ts cooked 😭🙏💔💔💔💔💔</div>
        </div>)
    } else {
        content = (<div style={{overflowX: 'hidden', overflowY: 'hidden'}}>
            <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Your Diagnosis:{" "}
        <span className="text-red-600 text-5xl">
          {illness || "Unknown Condition"}
        </span><br />
        <span className="text-gray-500 text-lg">
            {" (" + searchParams.get("confidence") + " confident)"}
        </span>
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold">What is it?</h2>
          <p className="text-gray-600">
            {prgphs[0] || "A brief description of the condition"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Treatment</h2>
          <p className="text-gray-600">
            {prgphs[1] || "Concise treatment options, including over-the-counter and prescription medications"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Prevention</h2>
          <p className="text-gray-600">
            {prgphs[2] || "A simple bit of preventive measures."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Recovery Tips</h2>
          <p className="text-gray-600">
            {prgphs[3] || "Tips for a speedy recovery"}
          </p>
        </section>
        
        <section className="flex justify-center items-center mt-4">
            <button onClick={handleClinicClick} className="inline-block bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-6 mb-8 mr-8 text-center">
            Find a Clinic
          </button>
          <a
            href={`https://www.amazon.com/s?k=${encodeURIComponent(illness)}+medicine`}
            className="inline-block bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-6 mb-8 text-center"
            target="_blank"
            rel="noopener noreferrer">
            Medicine (Non-prescription)
          </a>
        </section>
      </div>
    </div>
        </div>)
    }

  return ( <div>
    {content}
  </div>
  );
}
