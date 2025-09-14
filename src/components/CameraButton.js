import React, { useState } from "react";

function CameraButton() {
  const [showCameras, setShowCameras] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCameras = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cameras");
      const data = await response.json();
      setCameras(data);
      setShowCameras(true);
    } catch (error) {
      console.error("Failed to fetch cameras:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchCameras}>
        Show Cameras
      </button>

      {loading && <p>Loading...</p>}

      {showCameras && (
        <ul>
          {cameras.map((camera) => (
            <li key={camera.id}>
              <strong>{camera.name}</strong> ({camera.model})<br />
              <em>{camera.description}</em><br />
              Price: ₹{camera.price} per day<br />
              Status: {camera.available ? "Available" : "Not Available"}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CameraButton;
