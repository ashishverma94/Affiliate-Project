import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { loader as CourseLoader } from "./pages/HomePage.tsx";
import { HomePage, EditCoursePage, RootElement } from "./pages/index.tsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootElement />} >
//       <Route loader={CourseLoader} index element={<HomePage />} />
//       <Route path="edit-course"  element={<EditCoursePage />} />
//       <Route path="/print" element={<EditCoursePage />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    children: [
      {
        path: "/",
        element: <Outlet />,
        children: [
          { index: true, lazy: () => import("./pages/HomePage.tsx") },
          {
            path: "/main",
            Component: HomePage,
            loader: CourseLoader,
          },
        ],
      },
      {
        path: "edit-course",
        element: <EditCoursePage />,
      },
      {
        path: "/print",
        element: <EditCoursePage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
