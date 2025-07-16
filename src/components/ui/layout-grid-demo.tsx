"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export default function LayoutGridDemo() {
  return (
    <div className="h-[400px] md:h-[600px] w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-lg md:text-4xl text-white">
        Premium Farmhouse Plots
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-sm md:text-base my-2 md:my-4 max-w-lg text-neutral-200">
        Spacious plots ranging from 500-2000 sq. yards in the serene Aravalli hills, 
        perfect for your dream farmhouse just 2.5 hours from Delhi.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-lg md:text-4xl text-white">
        Natural Beauty
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-sm md:text-base my-2 md:my-4 max-w-lg text-neutral-200">
        Surrounded by lush greenery and peaceful landscapes, offering a 
        pollution-free environment away from city life.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-lg md:text-4xl text-white">
        Modern Amenities
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-sm md:text-base my-2 md:my-4 max-w-lg text-neutral-200">
        Well-planned infrastructure with 80-ft wide roads, water supply, 
        solar lighting, and gated security for your peace of mind.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-lg md:text-4xl text-white">
        Investment Opportunity
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-sm md:text-base my-2 md:my-4 max-w-lg text-neutral-200">
        Legally approved freehold plots with clear documentation, 
        perfect for weekend homes or rental income potential.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "col-span-2 md:col-span-2",
    thumbnail: "/gallery/image1.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/gallery/image2.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "/gallery/image3.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "col-span-2 md:col-span-2",
    thumbnail: "/gallery/image4.png",
  },
];
