import prisma from "./lib/prisma";
import { EventEmitter } from "node:events";

export const batchEvent = new EventEmitter();

type CourseType = {
  course_title: string;
  description: string;
  author: string;
  input: {
    url: string;
  };
  price:
    | {
        value: number;
        currency: string;
        symbol: string;
      }
    | string;
};

type NewCourseType = {
  title: string;
  description: string;
  price: number;
  author: string;
  courseUrl: string;
  imageUrl: string;
};

batchEvent.on("data", async (collection_id: string) => {
  console.log("received:", collection_id);

  const data = await fetch(
    "https://api.brightdata.com/dca/dataset?id=j_mszj9ubfs6ztvtwpg",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer c71faf77-5f36-4235-a9ab-f0cfceda5282",
      },
    },
  );

  const results = await data.json();

  const courses = results
    .map((result: CourseType) => {
      let price = null;

      if (!result?.price) {
        return null;
      }

      if (typeof result.price === "string") {
        price = +result.price;
      } else {
        console.log(result);
        price = result.price.value;
      }

      return {
        title: result.course_title,
        description: result?.description || "",
        price,
        author: result.author,
        courseUrl: result.input.url,
        imageUrl: "https://placehold.co/600x400",
      };
    })
    .filter(
      (course: unknown): course is NonNullable<typeof course> =>
        course !== null,
    );

  // courses.forEacth(async (course: NewCourseType) => {
  //   const isExists = await prisma.course.findUnique({
  //     where: {
  //       courseUrl: course.courseUrl,
  //     },
  //   });

  //   console.log(isExists);

  //   let resultCourse;

  //   if (!isExists) {
  //     resultCourse = await prisma.course.create({
  //       data: course,
  //     });
  //   } else {
  //     resultCourse = await prisma.course.update({
  //       where: {
  //         id: isExists.id,
  //       },
  //       data: course,
  //     });
  //   }

  //   await prisma.priceHistory.create({
  //     data: {
  //       courseId: resultCourse.id,
  //       price: resultCourse.price,
  //     },
  //   });
  // });

  await Promise.all(
    courses.map(async (course: NewCourseType) => {
      const resultCourse = await prisma.course.upsert({
        where: {
          courseUrl: course.courseUrl,
        },
        create: course,
        update: course,
      });

      await prisma.priceHistory.create({
        data: {
          courseId: resultCourse.id,
          price: resultCourse.price,
        },
      });
    }),
  );

  console.log("COMPLETED");
});
