import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animeStyles from "../../Components_style/HomePage_css/Animation.module.css";

export default function Animation() {
  return (
    <div className={animeStyles.outer_container_1}>
      <div className={animeStyles.inner_container_1}>
        <div className={animeStyles.text_container}>
          BMSCE IEEE <br></br> PES and Sensors Council
        </div>
      </div>

      <div className={animeStyles.inner_container_2}>
        <div className={animeStyles.animation_1} id="lottie">
          <Player
            src="https://res.cloudinary.com/daa1jvz4n/raw/upload/v1686823559/Animation/hero_ymht5m.json"
            background="transparent"
            speed={1}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
