import Profile from "./Profile";
import About from "./About";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import ForeignLanguage from "./ForeignLanguage";
import HighlightProject from "./HighlightProject";
import Certificates from "./Certificates";
import Awards from "./Awards";
import UploadCV from "./UploadCV";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getUserProfile } from "@services/client/UserService";
import { updateUserProfile } from "@services/client/UserService";
import { message, Spin } from "antd";
import { getCvByUserId } from "@services/client/CvService";
import { updateCv } from "@services/client/CvService";

const Templates = () => {
  const [profileData, setProfileData] = useState([]);
  const [cvData, setCvData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileResponse, cvResponse] = await Promise.all([
          getUserProfile(),
          getCvByUserId(),
        ]);

        if (profileResponse.success) {
          setProfileData(profileResponse.data);
        }
        if (cvResponse.success) {
          setCvData(cvResponse.data);
        }
      } catch (error) {
        message.error("Unable to load profile data!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const updatedProfileData = useCallback(async (data) => {
    if (!data) return;
    try {
      setLoading(true);
      const response = await updateUserProfile(data);
      if (response.success) {
        setProfileData(response.data);
        return true;
      }
    } catch (error) {
      message.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  }, []);

  const updatedCvData = useCallback(async (data) => {
    if (!data) return;
    try {
      setLoading(true);
      const response = await updateCv(data);
      if (response.success) {
        setCvData([response.data]);
        return true;
      }
    } catch (error) {
      message.error("Failed to update CV!");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 bg-gradient-to-br from-teal-90 to-teal-50 mx-auto flex flex-col items-center gap-4 relative">
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <Spin size="large" className="text-teal-600" />
        </div>
      )}

      <Profile
        profileData={profileData}
        updatedProfileData={updatedProfileData}
      />
      <About
        profileData={profileData}
        updatedProfileData={updatedProfileData}
      />
      <Education cvData={cvData} updatedCvData={updatedCvData} />
      <WorkExperience cvData={cvData} updatedCvData={updatedCvData} />
      <Skills cvData={cvData} updatedCvData={updatedCvData} />
      <ForeignLanguage
        profileData={profileData}
        updatedProfileData={updatedProfileData}
      />
      <HighlightProject cvData={cvData} updatedCvData={updatedCvData} />
      <Certificates cvData={cvData} updatedCvData={updatedCvData} />
      <Awards cvData={cvData} updatedCvData={updatedCvData} />
      <UploadCV cvData={cvData} updatedCvData={updatedCvData} />

      <Link
        to={"/cv"}
        className="border rounded-lg w-[794px] h-10 bg-[rgb(237,27,47)] text-white font-bold flex items-center justify-center mb-10"
      >
        View and Download CV
      </Link>
    </div>
  );
};

export default Templates;
