import React, { useRef } from "react";
import style from "../../Components_style/HomePage_css/Content_1.module.css";
import Lanime from "../lottie_animation";
import Lanime1 from "../lottie_anim_6";
import VantaComponent from "./Vanta(Home)";
import "aos/dist/aos";

export default function Content_1() {
  const containerRef = useRef(null);

  return (
    <>
      <div className={style.outer_container_2}>
        <div className={style.inner_container_3}>
          <div className={style.text_container_1}>
            <p id={style.heading1}>About Us</p>
            <p id={style.summary1}>
              The Power and Energy Society is the world's largest forum for
              sharing the latest technological developments in the electric
              power industry. This Society provides a great platform to empower
              development of technology & software in all areas of Electric
              Power and Energy.<br></br> The PES Society at BMSCE not only aims
              at encouraging young learners to pursue research in the field of
              Power and Energy but also helps students gain the required skills
              for the industry. Various workshops, technical talks and seminars
              are conducted along with frequent industrial trips making the
              society a great hub for innovation and networking.
            </p>
          </div>
          <div className={style.animation_3}>
            <Lanime filename="about" />
          </div>
        </div>

        <div className={style.vanta_wrap} ref={containerRef}>
          <VantaComponent containerRef={containerRef} />

          <div className={style.inner_container_4}>
            <p id={style.heading2}>Objectives</p>
            <p id={style.summary2}>
              BMSCE IEEE PES aims to advance power engineering, promote
              knowledge exchange, education and sustainable energy solutions,
              provide career development opportunities, enhance public
              awareness, and support standards for safe and reliable power
              systems.
            </p>

            <div
              className={style.inner}
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.one}>
                  <Lanime1 filename="lottie_1" />
                </div>
                <div className={style.title}>Internet of Things</div>
              </div>

              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.two}>
                  <Lanime1 filename="lottie_2" />
                </div>
                <div className={style.title}>Sensors and Actuators</div>
              </div>

              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.three}>
                  <Lanime1 filename="lottie_3" />
                </div>
                <div className={style.title}>
                  Sustainable Energy and Power Systems
                </div>
              </div>
              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.four}>
                  <Lanime1 filename="lottie_4" />
                </div>
                <div className={style.title}>
                  Control Systems and Automation
                </div>
              </div>

              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.five}>
                  <Lanime1 filename="lottie_5" />
                </div>
                <div className={style.title}>Sensor Circuit Design</div>
              </div>

              <div className={style.wrapper}>
                <div className={style.lottie_animation} id={style.six}>
                  <Lanime1 filename="lottie_6" />
                </div>
                <div className={style.title}>Electrical Smart Grid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
