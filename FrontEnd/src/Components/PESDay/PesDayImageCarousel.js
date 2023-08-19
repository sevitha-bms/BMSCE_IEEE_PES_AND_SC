import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../Components_style/PESDay_css/PesDayImageCarousel.css";

export default function PesDayImageCarousel() {
  let [width, setWidth] = useState(0);
  let currIndex = useRef(0);
  let intervalTime = 4000;
  let intervalRef = useRef(null);
  let [initialized, setInitialized] = useState(false);

  let [documents, setDocuments] = useState([]);
  const poster = "Timeline";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`/api/images/${poster}`);
        setDocuments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [poster]);

  useEffect(() => {
    let carousel = document.getElementsByClassName("carousel")[0];
    let slider = carousel.getElementsByClassName("carousel__slider")[0];
    let prevBtn = carousel.getElementsByClassName("carousel__prev")[0];
    let nextBtn = carousel.getElementsByClassName("carousel__next")[0];
    let margin = 20;

    function init() {
      resize();
      move(0);
      bindEvents();
      timer();
      setInitialized(true);
    }

    function resize() {
      const newWidth = 500;
      const newHeight = 450;
      const newTotalWidth = newWidth * documents.length;

      setWidth(newWidth);

      slider.style.width = newTotalWidth + "px";

      let items = slider.getElementsByClassName("carousel__slider__item");

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let box = item.getElementsByClassName("item__3d-frame")[0];
        let img = item.getElementsByTagName("img")[0];

        item.style.width = newWidth - margin * 2 + "px";
        item.style.height = newHeight + "px";
        box.style.width = newWidth - margin * 2 + "px";
        box.style.height = newHeight + "px";
        img.style.width = newWidth - margin * 2 + "px";
        img.style.height = newHeight + "px";
      }
    }

    function move(index) {
      const newIndex = (index + documents.length) % documents.length;
      currIndex.current = newIndex;

      for (let i = 0; i < documents.length; i++) {
        let item = document.getElementById(`item-${i}`);
        let box = item.getElementsByClassName("item__3d-frame")[0];
        if (i === newIndex) {
          item.classList.add("carousel__slider__item--active");
          box.style.transform = "perspective(1200px) rotateY(0deg)";
        } else {
          item.classList.remove("carousel__slider__item--active");
          const rotation = i < newIndex ? 40 : -40;
          box.style.transform = `perspective(1200px) rotateY(${rotation}deg)`;
        }
      }

      slider.style.transform =
        "translate3d(" +
        ((newIndex + 1) * -width + width / 2 + window.innerWidth / 2) +
        "px, 0, 0)";

      clearTimeout(intervalRef.current);
      intervalRef.current = setTimeout(() => {
        move(newIndex + 1);
      }, intervalTime);
    }

    function timer() {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        move(++currIndex.current);
      }, intervalTime);
    }

    function prev() {
      if (initialized) {
        move(--currIndex.current);
        timer();
      }
    }

    function next() {
      move(++currIndex.current);
      timer();
    }

    function bindEvents() {
      window.addEventListener("resize", resize);
      prevBtn.addEventListener("click", prev);
      nextBtn.addEventListener("click", next);
    }

    if (documents.length > 0) {
      init();
    }

    return () => {
      window.removeEventListener("resize", resize);
      prevBtn.removeEventListener("click", prev);
      nextBtn.removeEventListener("click", next);
      clearInterval(intervalRef.current);
    };
  }, [documents, width, intervalTime, initialized]);

  return (
    <>
      <div className="carousel">
        <div className="carousel__body">
          <div className="carousel__slider">
            {documents.map((doc, index) => (
              <div
                className="carousel__slider__item"
                id={`item-${index}`}
                key={doc._id}
              >
                <div className="item__3d-frame">
                  <div className="item__3d-frame__box item__3d-frame__box--front">
                    <img src={doc.imgLink} alt="Carousel Item" />
                  </div>
                  <div className="item__3d-frame__box item__3d-frame__box--left"></div>
                  <div className="item__3d-frame__box item__3d-frame__box--right"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="navigation">
            <div className="carousel__prev">
              <FaAngleLeft />
            </div>
            <div className="carousel__next">
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
