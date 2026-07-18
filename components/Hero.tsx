"use client";

import { useEffect, useState } from "react";


const images = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
];


export default function Hero() {

  const [current, setCurrent] = useState(0);


  useEffect(() => {

    const timer = setInterval(() => {

      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 4000);


    return () => clearInterval(timer);

  }, []);



  return (

    <section className="relative h-screen overflow-hidden">


      {/* Hero Images */}

      {images.map((image, index) => (

        <img
          key={image}
          src={image}
          alt="The Aumera Gifts"
          className={`
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-all
            duration-[2000ms]
            ease-in-out
            ${
              current === index
              ? "opacity-100 scale-105"
              : "opacity-0 scale-100"
            }
          `}
        />

      ))}



      {/* Dark Overlay */}

      <div className="
        absolute
        inset-0
        bg-[#0A3323]/40
      "/>



      {/* Content */}

      <div className="
        relative
        z-10
        h-full
        flex
        items-center
        px-8
        md:px-20
      ">


        <div className="max-w-4xl text-[#F7F4D5]">


          <p className="
            text-[#839958]
            tracking-[6px]
            text-sm
            mb-8
          ">
            LUXURY GIFTING STUDIO
          </p>



          <h1 className="
            text-6xl
            md:text-8xl
            leading-tight
            mb-8
          ">
            Curated gifting
            <br />
            for every bond
          </h1>



          <p className="
            text-lg
            max-w-xl
            mb-10
          ">
            Thoughtfully designed hampers
            that transform moments into memories.
          </p>



          <button className="
            bg-[#F7F4D5]
            text-[#0A3323]
            px-10
            py-4
            rounded-full
          ">
            Explore Collections
          </button>


        </div>


      </div>




      {/* Slider Indicators */}

      <div className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        flex
        gap-3
        z-20
      ">


        {images.map((_, index)=>(

          <div
            key={index}
            className={`
              h-2
              rounded-full
              transition-all
              duration-500
              ${
                current === index
                ? "w-10 bg-[#F7F4D5]"
                : "w-2 bg-[#839958]"
              }
            `}
          />

        ))}


      </div>


    </section>

  );
}