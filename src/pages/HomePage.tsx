import { FC } from "react";
import CourseCard from "../components/CourseCard";
import { useLoaderData } from "react-router-dom";

interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
  tags: Array<string>;
  students: Array<string>;
}

const HomePage: FC = () => {
  const result: any = useLoaderData();
  return (
    <>
      <div className="flex items-center flex-col justify-center">
        <h1 className="font-[700] text-[35px] p-8">Our Courses</h1>
        <div className=" flex flex-col md:w-[80%] items-center gap-4 p-9 h-[700px]">

          {result?.courses?.map((course: Course) => (
            <CourseCard key={course?.courseId} course={course} />
          ))}

        </div>
      </div>
    </>
  );
};

export default HomePage;

export const CourseLoader = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json"
  );
  const jsonResult = await res.json();
  return jsonResult;
};
