import { useState } from "react";
import ProfileCV from "./Profile";
import AboutCV from "./About";
import EducationCV from "./Education";

const CV = () => {
  return (
    <div className="w-[794px] h-[1123px] bg-white shadow-lg border mx-auto my-10 ">
      <ProfileCV />
      <AboutCV />
      <EducationCV />
    </div>
  );
};
export default CV;
