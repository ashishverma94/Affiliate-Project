import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { CourseLoader } from "./pages/HomePage.tsx";
import { HomePage, EditCoursePage, RootElement } from "./pages/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootElement />}>
      <Route loader={CourseLoader} index element={<HomePage />} />
      <Route path="edit-course"  element={<EditCoursePage />} />
      <Route path="/print" element={<EditCoursePage />} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
