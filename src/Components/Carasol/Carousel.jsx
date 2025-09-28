// src/components/Carousel/Carousel.jsx
import React from "react";
import { Carousel as LibCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselData from "./data";
import styles from "./Carousel.module.css";

const Carousel = () => {
  if (!carouselData || carouselData.length === 0) return null;

  return (
    <div className={styles.carouselWrapper}>
      <LibCarousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        stopOnHover
        emulateTouch
        swipeable
        useKeyboardArrows
      >
        {carouselData.map((item) => (
          <div key={item.id}>
            <img
              src={item.image}
              alt={`Slide ${item.id}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </LibCarousel>

      {/* fade overlay */}
      <div className={styles.fadeBottom}></div>
    </div>
  );
};

export default Carousel;
