import Profile from "./Profile";
import About from "./About";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import ForeignLanguage from "./ForeignLanguage";
import HighlightProject from "./HighlightProject";
import Certificates from "./Certificates";
import Awards from "./Awards";
import { Link } from "react-router-dom";
import { useState } from "react";
const Templates = () => {
  const [profileData, setProfileData] = useState([]);
  
  return (
    <div className="min-h-screen w-full bg-gray-50 bg-gradient-to-br from-teal-90 to-teal-50 mx-auto my-10 flex flex-col items-center g">
      <Profile />
      <About />
      <Education />
      <WorkExperience />
      <Skills />
      <ForeignLanguage />
      <HighlightProject />
      <Certificates />
      <Awards />
      <Link
        to={"/cv"}
        className="border rounded-lg w-[794px] h-10 bg-[rgb(237,27,47)] text-white font-bold flex items-center justify-center"
      >
        Xem và tải CV
      </Link>
    </div>
  );
};

export default Templates;
