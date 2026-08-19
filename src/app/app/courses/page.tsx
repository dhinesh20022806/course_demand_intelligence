"use client";
import { useState } from "react";

import Search from "@/components/Search";
import { NavLink } from "@/components/NavLink";
import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard";
import { PriceHistory } from "@/components/PriceHistory";
import { Button } from "@/components/Button";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const [text, setText] = useState("");

  const handleText = (text: string) => {
    setText(text);
  };

  const obj = {
    title: "Modern React with Redux",
    description:
      "Master React and Redux. Apply modern design patterns to build apps with React Router, TailwindCSS, Context, and Hooks!",
    author: "Stephen Grider",
    price: 10.99,
    imageUrl: "https://img-c.udemycdn.com/course/240x135/2887266_c696_5.jpg",
    courseUrl:
      "https://www.udemy.com/course/microservices-with-node-js-and-react/",
  };

  return (
    <div className="w-full h-fit ">
      <Search text={text} handleText={handleText} />

      <div className="grid gap-10 my-10 justify-items-center  grid-cols-3 ">
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />

        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
        <CourseCard {...obj} />
      </div>

      {/* <CourseCardSkeleton />
      <PriceHistory />
      <Button size="md" variant="normal" handleClick={() => {}}>
        Buy Course
      </Button>

      <Button size="md" variant="outline" handleClick={() => {}}>
        {" "}
        Price History{" "}
      </Button> */}
      <div className="flex  justify-center">
        <Pagination />
      </div>
    </div>
  );
}
