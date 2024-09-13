import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import { HomeContextProvider } from "./pages/HomePageContext";
import ExplorePage from "./pages/ExplorePage";
import PostPage from "./pages/PostPage";
import SubPage from "./pages/SubPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import CreateSub from "./pages/CreateSub";
import { loadToken, logoutAction } from "./util/auth";
import { AuthProvider } from "./store/authContext";
import ProtectedRoute from "./components/util/ProtectedRoutes";
import SearchPage from "./pages/SearchPage";

function App() {
  const exp = new Date(localStorage.getItem("expiration"));

  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootPage />,
      loader: loadToken,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/create",
              element: <CreateSub />,
            },
            {
              path: "/g/:subName/create",
              element: <CreatePostPage />,
            },
            {
              path: "/explore",
              element: <ExplorePage />,
            },
          ],
        },
        {
          path: "/",
          element: <HomeContextProvider />,
        },
        {
          path: "/logout",
          action: logoutAction,
          element: <Navigate to={"/"} />,
        },

        {
          path: "/g/:subName",
          element: <SubPage />,
        },
        {
          path: "/search/:query",
          element: <SearchPage />,
        },

        {
          path: "/u/:username",
          element: <ProfilePage />,
        },
        {
          path: "/g/:subName/:postSlug",
          element: <PostPage />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
