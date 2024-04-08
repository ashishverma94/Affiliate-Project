import { Button } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  course: {
    courseId: string;
    instructorName: string;
    courseName: string;
    tags: Array<string>;
    students: Array<string>;
  };
}

const CourseCard: FC<Course> = ({ course }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-full md:w-[95%] lg:w-[60%] flex-row border-[2px]  rounded-[6px] border-[#da6e1b] hover:bg-[#f5f4f3] bg-[#ffffff]"
    >
      <div className="w-[80%] flex my-4  ">
        <div className=" flex flex-col justify-center pl-4">
          <div className="font-[500] md:text-[18px]">{course?.courseName}</div>
          <div>
            <span className="font-[10px] md:font-[12px] ">
              Instructor: <span>{course.instructorName}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-[20%] flex justify-center items-center ">
        {isHovered && (
          <Button
          style={{backgroundColor:"orange", color:"black"}}
            onClick={() => {
              navigate("/edit-course", {
                replace: true,
                state: { data: course },
              });
            }}
          >
            click
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
