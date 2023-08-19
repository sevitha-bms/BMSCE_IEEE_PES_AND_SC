import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

export default function VantaComponent() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect && vantaEffect.resize) {
        vantaEffect.resize();
      }
    };

    const handleOrientationChange = () => {
      handleResize();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);

      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);


  useEffect(() => {
    const getOptionsBasedOnWidth = (width) => {
      if (width <= 480) {
        return {
          points: 20,
          distance: 6,
          spacing: 20,
        };
      } else if (width <= 768) {
        return {
          points: 20,
          distance: 10,
          spacing: 22,
        };
      } else if (width <= 1024) {
        return {
          points: 25,
          distance: 12,
          spacing: 23,
        };
      } else if (width <= 1200) {
        return {
          points: 30,
          distance: 14,
          spacing: 23,
        };
      } else {
        return {
          points: 25,
          distance: 28,
          spacing: 16,
        };
      }
    };

    const handleWidthBasedOptions = () => {
      const width = window.innerWidth;
      const options = getOptionsBasedOnWidth(width);

      if (vantaEffect) {
        vantaEffect.destroy();
      }

      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          scale: 1.0,
          scaleMobile: 1.0,
          forceAnimate: true,
          backgroundColor: 0x0D0D0D,
          color: 0xA5D7E8,
          ...options,
        })
      );
    };

    handleWidthBasedOptions();
  }, [vantaEffect]);

  return <div ref={vantaRef}></div>;
}

