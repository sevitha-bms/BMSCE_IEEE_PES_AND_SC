import React, { useState, useEffect, useRef } from "react";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";

export default function VantaComponent({ containerRef }) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: containerRef.current.clientHeight,
          minWidth: window.innerWidth,
          scale: 1.0,
          scaleMobile: 1.0,
          forceAnimate: true,

          color: 0xd0e0e,
          shininess: 30,
          waveHeight: 15,
          waveSpeed: 1.2,
          zoom: 1,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, containerRef]);

  return <div ref={vantaRef}></div>;
}
