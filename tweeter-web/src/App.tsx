import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfo from "./components/userInfo/UserInfoHook";
import { FolloweePresenter } from "./presenters/user/FolloweePresenter";
import { FollowerPresenter } from "./presenters/user/FollowerPresenter";
import { FeedPresenter } from "./presenters/status/FeedPresenter";
import { StoryPresenter } from "./presenters/status/StoryPresenter";
import { ItemListView } from "./presenters/PagedPresenter";
import { Status, User } from "tweeter-shared";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route path="feed" element=
          {
            <ItemScroller
              key={"feed"}
              presenterGenerator={(view: ItemListView<Status>) => new FeedPresenter(view)}
              itemComponent={(item: Status) => <StatusItem item={item}/>}
            />
          } 
        />
        <Route path="story" element=
          {
            <ItemScroller
              key={"story"}
              presenterGenerator={(view: ItemListView<Status>) => new StoryPresenter(view)}
              itemComponent={(item: Status) => <StatusItem item={item}/>}
            />
          } 
        />
        <Route
          path="followees"
          element={
            <ItemScroller
              key={"followees"}
              presenterGenerator={(view: ItemListView<User>) => new FolloweePresenter(view)}
              itemComponent={(item: User) => <UserItem item={item}/>}
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller
              key={"followers"}
              presenterGenerator={(view: ItemListView<User>) => new FollowerPresenter(view)}
              itemComponent={(item: User) => <UserItem item={item}/>}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
