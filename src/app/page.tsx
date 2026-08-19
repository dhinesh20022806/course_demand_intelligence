"use client";
import { useState } from "react";

import Search from "@/components/Search";
import { NavLink } from "@/components/NavLink";
import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard";
import { PriceHistory } from "@/components/PriceHistory";
import { Button } from "@/components/Button";
import { SideBar } from "@/components/SideBar";

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
    <div className="flex gap-10 w-full">
      <div className="overflow-y-scroll  h-screen  mt-10">
        <div className="w-[60%] flex justify-center flex-col">
          <Search text={text} handleText={handleText} />

          <NavLink href="/app" className="" activeClassName="">
            App
          </NavLink>

          <div className="grid grid-cols-3">
            <CourseCard {...obj} />
            <CourseCard {...obj} />
            <CourseCard {...obj} />
            <CourseCard {...obj} />
            <CourseCard {...obj} />
            <CourseCard {...obj} />
          </div>

          <CourseCardSkeleton />
          <PriceHistory />
          <Button size="md" variant="normal" handleClick={() => {}}>
            Buy Course
          </Button>

          <Button size="md" variant="outline" handleClick={() => {}}>
            {" "}
            Price History{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
