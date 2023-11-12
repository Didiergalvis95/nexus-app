import React, { useEffect, useRef } from "react";
import './Trailers.css'

export const Trailers = ({ videoUrl, onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
          videoRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
      }, []);

  return (
    <div className="video-modal">
        <div className="video-container">
      <span className="close-video" onClick={onClose}>
        &times;
      </span>
      <iframe
        title="video"
        width="1000"
        height="615"
        src={videoUrl}
        frameBorder="0"
        allowFullScreen
        ref={videoRef}
      ></iframe>
    </div>
    </div>
  );
};
