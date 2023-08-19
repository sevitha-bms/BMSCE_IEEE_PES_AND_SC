import React,{ useEffect, useRef } from "react";
import axios from 'axios';
import lottie from "lottie-web";

export default function Lanime(props) {
  const container = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    const fetchLottieAnimation = async () => {
      try {
        const filename = props.filename;
        const response = await axios.get(`/api/animations/${filename}`);
        const animationData = response.data;
        anim.current = lottie.loadAnimation({
          container: container.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
        });
        return () => {
          anim.current.stop();
        };
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      }
    };

    fetchLottieAnimation();
  }, [props.filename]);

  return <div ref={container}></div>;
}