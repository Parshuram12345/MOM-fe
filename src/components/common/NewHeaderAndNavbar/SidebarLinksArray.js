import { AiOutlineHome, AiFillHome, AiOutlineProject, AiFillProject } from "react-icons/ai";
import { MdOutlineContacts, MdContacts, MdOutlineTask, MdTask } from "react-icons/md";
import { RiPencilRuler2Line, RiPencilRuler2Fill, RiBriefcase4Line, RiBriefcase4Fill } from "react-icons/ri";
import { BsChatLeftText, BsChatLeftTextFill } from "react-icons/bs";
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
// import comingSoon from "../../../Images/comingSoon.svg";
// import leadsImageOutlined from "../../../Images/OutlinedVector2.svg";
// import leadsImageSelected from "../../../Images/SelectedVector2.svg";
// import chat from "../../../Images/chat.png";
// import communtiy from "../../../Images/community.png";
// import Measurement from "../../Images/Measurement.svg"
// import block1 from '../../../3dComponents/3dImages/block1.svg'
import chatimg from './iconimages/chat.svg'
// import filesicon from './iconimages/filesicon.svg'
// import momicon from './iconimages/momicon.svg'
import myproj from './iconimages/myproj.svg'
// import quotationicon from './iconimages/quotationicon.svg'
// import timelineicon from './iconimages/timelineicon.svg'
import chatActive from './iconimages/chat-active.svg'
import dasActive from './iconimages/das-active.svg'
import projectActive from './iconimages/project-active.svg'
import dashboard from './iconimages/dashboard.svg'

export const SidebarLinksArray = [
    {
        label: "Dashboard",
        notSelected: dashboard,
        selected: dasActive,
        visible: true,
        navigable: true,
        towards: "https://pro.idesign.market/dashboard",
        comingSoon: false,
        childrenLinks: null,
    },
    {
        label: "Project Management Tool",
        notSelected: myproj,
        selected: projectActive,
        visible: true,
        navigable: true,
        towards: "https://pro.idesign.market/my-projects",
        comingSoon: true,
        childrenLinks: null,
    },
    // {
    //     label: "Quotation Tool",
    //     notSelected: quotationicon,
    //     selected: <MdContacts />,
    //     visible: true,
    //     navigable: true,
    //     towards: "lead",
    //     comingSoon: true,
    //     childrenLinks: null,
    // },

    {
        label: "Chat",
        notSelected: chatimg,
        selected: chatActive,
        visible: true,
        navigable: true,
        towards: "https://pro.idesign.market/secure-chat",
        comingSoon: false,
        childrenLinks: null,
    },
    // {
    //     label: "Timeline",
    //     notSelected: timelineicon,
    //     selected: <MdTask />,
    //     visible: false,
    //     navigable: true,
    //     towards: "3dLanding",
    //     comingSoon: false,
    //     childrenLinks: null,
    // },
    // {
    //     label: "MOM",
    //     notSelected: momicon,
    //     selected: <RiBriefcase4Fill />,
    //     visible: false,
    //     navigable: true,
    //     towards: "measurementpage",
    //     comingSoon: true,
    //     childrenLinks: null,
    // },
    // {
    //     label: "Files",
    //     notSelected: filesicon,
    //     selected: <RiBriefcase4Fill />,
    //     visible: false,
    //     navigable: true,
    //     towards: "measurementpage",
    //     comingSoon: true,
    //     childrenLinks: null,
    // },
];