import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Form, useLocation } from "react-router-dom";

const EditCoursePage: React.FC = () => {
  const location = useLocation();
  const course = (location.state as any)?.data;

  let names: Array<string> = course?.students?.map((name: any): string => {
    return name.name;
  });

  const [allTags, setAllTags] = useState(course?.tags);
  const [allStudents, setAllStudents] = useState(names && names);
  const [flagNamesApi, setFlagNamesApi] = useState(false);
  const [flagTagsApi, setFlagTagsApi] = useState(false);

  // CALLING /tags
  const callTagsApi = async () => {
    if (flagTagsApi === false) {
      const tagsData = await fetch(
        "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json"
      );
      const tagsResult = await tagsData.json();
      setAllTags(tagsResult.tags);
      setFlagTagsApi(true);
    }
  };

  // CALLING /students
  const callNamesApi = async () => {
    if (flagNamesApi === false) {
      const namesData = await fetch(
        "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json"
      );
      const namesResult = await namesData.json();
      const newNames: Array<string> = namesResult.enrolledList.map(
        (name: any) => {
          return name?.name;
        }
      );
      setAllStudents(newNames);
      setFlagNamesApi(true);
    }
  };

  // UPDATING NEW DATA
  const [newCourseName, setNewCourseName] = useState(course?.courseName);
  const [newStudents, setNewStudents] = useState(course?.students);
  const [newTags, setNewTags] = useState(course?.tags);
  const [newInstructorName, setNewInstructorName] = useState(
    course?.instructorName
  );

  const handleTagsInput = (e: React.SyntheticEvent, value: string[]) => {
    e.preventDefault();
    setNewTags(value);
  };

  const handleStudentsInput = (e: React.SyntheticEvent, value: string[]) => {
    e.preventDefault();
    setNewStudents(value);
  };

  // CONSOLE NEW DATA (OUTPUT)
  const [messageFlag, setMessageFlag] = useState(false);

  const printForm = () => {
    const arr: Array<string> = newStudents.map((val: string) => ({
      name: val,
    }));
    const newData = {
      courseId: course?.courseId,
      instructorName: newInstructorName,
      courseName: newCourseName,
      tags: newTags,
      students: arr,
    };

    console.log(newData);
    setMessageFlag(true);
    setTimeout(() => {
      setMessageFlag(false);
    }, 4000);
  };

  return (
    <div className=" h-[90vh] bg-[#e6e1e1] w-full flex  flex-col items-center justify-center">
      <div className="bg-[white] p-3 md:p-6 rounded-lg w-[85%] md:w-[65%] lg:w-[50%]">
        <h1 className="font-[600] md:font-[700] pb-4 text-[27px] md:text-[35px] ">
          Edit Course Details
        </h1>
        <Form
          className=" flex items-center flex-col justify-center"
          onSubmit={printForm}
          action="/edit-course"
        >
          <div className="w-full my-2">
            <TextField
              onChange={(e) => setNewCourseName(e.target.value)}
              className="w-full mt-4 "
              id="outlined-helperText"
              label="Name"
              defaultValue={course?.courseName}
            />
          </div>
          <div className="w-full my-2">
            <TextField
              onChange={(e) => setNewInstructorName(e.target.value)}
              className="w-full p-5"
              id="outlined-helperText"
              label="Instructor"
              defaultValue={course?.instructorName}
            />
          </div>

          {/* tags  */}
          {allTags && (
            <div className=" p-2 items-center my-2 border-[1px] border-[#c0bbbb] w-full flex flex-wrap gap-2  min-h-[60px] rounded-[4px]">
              <Stack className="w-full" spacing={3}>
                <Autocomplete
                  multiple
                  id="tags"
                  onChange={handleTagsInput}
                  options={allTags}
                  getOptionLabel={(option) => option}
                  defaultValue={course?.tags}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onFocus={() => callTagsApi()}
                      variant="standard"
                      placeholder="Enter tags name..."
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
          )}

          {/* students  */}
          {allStudents && (
            <div className=" p-2 items-center my-2 border-[1px] border-[#c0bbbb] w-full flex flex-wrap gap-2  min-h-[60px] rounded-[4px]">
              <Stack className="w-full" spacing={3}>
                <Autocomplete
                  multiple
                  id="names"
                  onChange={handleStudentsInput}
                  options={allStudents}
                  getOptionLabel={(option) => option}
                  defaultValue={allStudents}
                  renderInput={(params) => (
                    <TextField
                      onFocus={() => callNamesApi()}
                      {...params}
                      variant="standard"
                      placeholder="Enter students name..."
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
          )}

          <div className="w-full">
            <Button
              type="submit"
              style={{ backgroundColor: "orange" }}
              variant="contained"
            >
              EDIT COURSE
            </Button>
          </div>
        </Form>
      </div>

      <div className="text-[red] font-[500] h-[40px] flex items-center">
        {messageFlag && <p>See the console</p>}
      </div>
    </div>
  );
};

export default EditCoursePage;
