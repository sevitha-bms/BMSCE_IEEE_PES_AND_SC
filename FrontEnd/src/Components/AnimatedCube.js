import React from "react";
import "../Components_style/AnimatedCube.css";

export default function AnimatedCube() {
  return (
    <>
      <div className="preloader">
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="none"
          overflow="hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#cube" x="128" y="128" strokeWidth="2">
            <animate
              attributeName="stroke"
              dur="6s"
              repeatCount="indefinite"
              values="#00FF66;#00FF33;#00FFFF;#099FFF;#0062FF;#0062FF;#099FFF;#00FFFF;#00FF33;#00FF66;"
            />
          </use>

          <defs>
            <g id="cube">
              <use
                href="#cube_outline"
                strokeLinejoin="round"
                strokeWidth="16"
                fill="url(#stars)"
              />
              <use href="#cube_base" strokeWidth=".5" />
              <use
                href="#cube_outline"
                strokeLinejoin="round"
                strokeWidth="6"
                stroke="#141417"
              />
            </g>

            <g id="cube_outline">
              <path>
                <animate
                  attributeName="d"
                  dur="1.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9"
                  values="M10 64 L128 0 L246 64 L246 192 L128 256 L10 192Z;
					M40 20 L216 20 L216 108 L216 236 L40 236 L40 172Z;
					M216 20 L40 20 L40 108 L40 236 L216 236 L216 172Z;
					M246 64 L128 0 L10 64 L10 192 L128 256 L246 192Z"
                />
              </path>
            </g>

            <g id="cube_base">
              <path fill="#fff1">
                {" "}
                <animate
                  attributeName="d"
                  dur="1.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9"
                  values="M10 64 L128 0 L246 64 L128 128Z;
					M40 20 L216 20 L216 108 L40 108Z;
					M128 0 L246 64 L128 128 L10 64Z"
                />
              </path>
              <path>
                {" "}
                <animate
                  attributeName="d"
                  dur="1.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9"
                  values="M10 64 L128 128 L128 256 L10 192Z;
					M40 20 L40 108 L40 236 L40 172Z;
					M216 20 L216 108 L216 236 L216 172Z;
					M246 64 L128 128 L128 256 L246 192Z"
                />
                <animate
                  attributeName="fill"
                  dur="1.5s"
                  repeatCount="indefinite"
                  keyTimes="0;0.5;0.5;1"
                  values="#fff0;#fff0;#fff2;#fff2"
                />
              </path>
              <path fill="#407080">
                {" "}
                <animate
                  attributeName="d"
                  dur="1.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.8 0.2 0.6 0.9; 
						0.8 0.2 0.6 0.9"
                  values="M246 64 L128 128 L128 256 L246 192Z;
					M216 108 L40 108 L40 236 L216 236Z;
					M128 128 L10 64 L10 192 L128 256Z"
                />
                <animate
                  attributeName="fill"
                  dur="1.5s"
                  repeatCount="indefinite"
                  keyTimes="0;0.5;1"
                  values="#fff2;#fff1;#fff0"
                />
              </path>
            </g>
            <linearGradient id="fade" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.25" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="sky" gradientTransform="rotate(90)">
              <stop offset="0.5" stopColor="#141417" />
              <stop offset="1" stopColor="#40354a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
