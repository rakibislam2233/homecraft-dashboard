import { CiSettings, CiUser } from "react-icons/ci";
import { FaServicestack, FaUser } from "react-icons/fa6";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";
import { PiUsersThree, PiUsersThreeFill } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import AccountVarification from "../pages/Main/AccountVarification/AccountVarification";
import Professional from "../pages/Main/AllUsers/Professional";
import ProfessionalDetails from "../pages/Main/AllUsers/ProfessionalDetails";
import Users from "../pages/Main/AllUsers/Users";
import CategoryNew from "../pages/Main/Category/CategoryNew";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import EarningNew from "../pages/Main/Earnings/EarningNew";
import Notifications from "../pages/Main/Notifications/Notifications";
import TabSubscription from "../pages/Main/Subscription/TabSubscription";
import ProfessionalMessage from "../pages/Main/Support/ProfessionalMessage";
import Report from "../pages/Main/Support/Report";
import UserMessage from "../pages/Main/Support/UserMessage";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import MyProfile from "../pages/Profile/MyProfile";
import About from "../pages/Settings/About";
import EditAbout from "../pages/Settings/EditAbout";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import TermsConditions from "../pages/Settings/TermsConditions";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },

  {
    name: "All User's",
    rootPath: "all-users",
    icon: PiUsersThreeFill,
    children: [
      {
        name: "Client/Users",
        path: "all-users/users",
        icon: FaUser,
        element: <Users />,
      },

      {
        name: "Professional",
        icon: FaUser,
        path: "all-users/professional",
        element: <Professional />,
      },

      {
        path: "all-users/professional/:id",
        element: <ProfessionalDetails />,
      },
    ],
  },
  {
    name: "A.C Varification",
    path: "account-varification",
    icon: PiUsersThree,
    element: <AccountVarification />,
  },
  {
    name: "Category",
    path: "category",
    icon: PiUsersThree,
    element: <CategoryNew />,
  },

  {
    name: "Earning",
    path: "earning",
    icon: PiUsersThree,
    element: <EarningNew />,
  },
  {
    name: "Subscription",
    path: "subscription",
    icon: PiUsersThree,
    element: <TabSubscription />,
  },
  {
    name: "Support",
    rootPath: "support",
    icon: PiUsersThree,
    children: [
      {
        name: "User Message",
        path: "support/user-message",
        icon: CiUser,
        element: <UserMessage />,
      },
      {
        name: "Prof. Message",
        path: "support/professional-message",
        icon: CiUser,
        element: <ProfessionalMessage />,
      },
      {
        name: "Report",
        path: "support/report",
        icon: CiUser,
        element: <Report />,
      },
    ],
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "About Us",
        icon: FaServicestack,
        path: "settings/about-us",
        element: <About />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAbout />,
      },
      {
        name: "Terms & Services",
        icon: TbAirConditioning,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
    ],
  },
];
