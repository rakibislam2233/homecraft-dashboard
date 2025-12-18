import { CiSettings, CiUser } from "react-icons/ci"; 
import { PiUsersThreeFill } from "react-icons/pi"; 
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
import Subscription from "./../pages/Main/Subscription/Subscription";
import { RiDashboardLine } from "react-icons/ri";
import { HiSquare2Stack } from "react-icons/hi2";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineQuestionCircle, AiFillDollarCircle, } from "react-icons/ai";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { PiCrownSimpleLight } from "react-icons/pi";
import { HiOutlineSupport } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiChatBubbleLeftRight  } from "react-icons/hi2";
import { FiAlertCircle } from "react-icons/fi";
import { HiDocumentReport } from "react-icons/hi";
import { RiUser3Fill } from "react-icons/ri";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardLine,
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
        icon: RiUser3Fill,
        element: <Users />,
      },

      {
        name: "Professional",
        icon: RiUser3Fill,
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
    icon: HiSquare2Stack,
    element: <AccountVarification />,
  },
  {
    name: "Category",
    path: "category",
    icon: TbCategoryPlus,
    element: <CategoryNew />,
  },

  {
    name: "Earning",
    path: "earning",
    icon: AiFillDollarCircle,
    element: <EarningNew />,
  },
  {
    name: "Subscription",
    path: "subscription",
    icon: PiCrownSimpleLight,
    element: <Subscription />,
  },
  {
    name: "Support",
    rootPath: "support",
    icon: HiOutlineSupport,
    children: [
      {
        name: "User Message",
        path: "support/user-message",
        icon: IoChatbubbleEllipsesOutline,
        element: <UserMessage />,
      },
      {
        name: "Prof. Message",
        path: "support/professional-message",
        icon: HiChatBubbleLeftRight,
        element: <ProfessionalMessage />,
      },
      {
        name: "Report",
        path: "support/report",
        icon: HiDocumentReport ,
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
        name: "Terms & Services",
        icon: FiAlertCircle,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlinePrivacyTip,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
      {
        name: "About Us",
        icon: AiOutlineQuestionCircle,
        path: "settings/about-us",
        element: <About />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAbout />,
      },
    ],
  },
];
