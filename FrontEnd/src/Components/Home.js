import React, { useState, useEffect, lazy, Suspense } from "react";
import AnimatedCube from "./AnimatedCube";
import homeStyles from "../Components_style/Home.module.css";

const Animation = lazy(() => import("./HomePage/Animation"));
const Content = lazy(() => import("./HomePage/Content"));

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <div className={homeStyles.home_container}>
        <div
          className={`${homeStyles.loading_container} ${
            showContent === true && homeStyles.fade_out
          }`}
        >
          <AnimatedCube />
          <h1>Hang tight, we're almost there!</h1>
        </div>
        <div
          className={`${homeStyles.homepage_container} ${
            showContent === true && homeStyles.fade_in
          }`}
        >
          <Suspense fallback={<AnimatedCube />}>
            <Animation />
            <Content />
          </Suspense>
        </div>
      </div>
    </>
  );
}
