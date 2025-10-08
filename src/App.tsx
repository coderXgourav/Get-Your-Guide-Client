import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AddBus from "./pages/Bus/AddBus";
import ViewBuses from "./pages/Bus/ViewBuses";
import TrackBus from "./pages/Bus/TrackBus";
import AddRole from "./pages/Role/AddRole";
import ViewRole from "./pages/Role/ViewRole";
import AddTour from "./pages/Tour/AddTour";
import ViewTour from "./pages/Tour/ViewTour";
import AllocateTour from "./pages/Tour/AllocateTour";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Dashboard Layout */}
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            
            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />
            
            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />

            {/* Role Management */}
            <Route path="add-role" element={<AddRole />} />
            <Route path="view-role" element={<ViewRole />} />

            {/* Bus Management */}
            <Route path="add-bus" element={<AddBus />} />
            <Route path="view-buses" element={<ViewBuses />} />
            <Route path="track-bus" element={<TrackBus />} />

            {/* Tour Management */}
            <Route path="add-tour" element={<AddTour />} />
            <Route path="view-tour" element={<ViewTour />} />
            <Route path="tour-allocate" element={<AllocateTour />} />
          </Route>

          {/* Redirect root to admin */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
