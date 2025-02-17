import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [sateliteData, setSateliteData] = useState([]); // saved data in empty arr
  const [loadData, setLoadData] = useState(true); // initial load
  const [errorData, setErrorData] = useState(false); // set default err on false

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    fetch("https://backend-five-alpha-72.vercel.app/api/satellite")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSateliteData(data);
        setLoadData(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setErrorData(true);
        setLoadData(false);
      });
  }, []);
  console.log("Data:", sateliteData);
  return (
    <>
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default App;
