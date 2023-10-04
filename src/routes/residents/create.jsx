import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPopup from "../../components/PasswordPopup";
import Layout from "../../components/Layout";
import { useAuth } from "../../AuthProvider";
import { useResident } from "../../ResidentProvider";
import Loading from "../../components/Loading";

export default function Create() {
  const { auth } = useAuth();
  const { createResident } = useResident();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [residentData, setResidentData] = useState({
    name: "",
    bio: "",
    image: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    other_website: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const fileInputRef = useRef(null); // For the file input element

  const onFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    if (file) {
      residentData.image = file; // Add the file to the residentData state
    }
  };

  const onChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value });
    console.log(residentData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createResident(residentData);

      navigate("/residents");
      setResidentData({
        name: "",
        bio: "",
        image: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        tiktok: "",
        other_website: "",
      });
    } catch (error) {
      console.error("Error creating resident:", error);
      // Optionally, you can set some state here to notify the user of the error.
    }
    setLoading(false);
  };

  if (!auth) {
    return <PasswordPopup />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <h1 className="text-3xl text-center font-bold mb-8">
        Create your Profile
      </h1>
      <form onSubmit={onSubmit}>
        <ul className="flex flex-col items-center justify-center">
          <li className="relative mb-4">
            <input
              id="fileInput"
              type="file"
              className="sr-only"
              ref={fileInputRef}
              onChange={onFileChange}
              accept="image/*"
            />
            <label
              htmlFor="fileInput"
              className="block w-24 h-24 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center overflow-hidden" // Added overflow-hidden
            >
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Uploaded preview"
                  className="object-cover w-full h-full"
                /> // Use object-cover to ensure the image covers the circle
              ) : (
                <span className="text-md text-black font-medium">+ Image</span>
              )}
            </label>
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="name"
              placeholder="Full name"
              value={residentData.name}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="bio"
              placeholder="Write a bio"
              value={residentData.bio}
              onChange={onChange}
            />
          </li>
          <li>
            <p className="text-lg font-bold mt-4 mb-2">Optional Handles</p>
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={residentData.linkedin}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={residentData.instagram}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="twitter"
              placeholder="Twitter"
              value={residentData.twitter}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="tiktok"
              placeholder="TikTok"
              value={residentData.tiktok}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="text"
              name="other_website"
              placeholder="Other Website"
              value={residentData.other_website}
              onChange={onChange}
            />
          </li>
          <li>
            <button
              disabled={
                residentData.name === "" &&
                residentData.bio === "" &&
                residentData.image === ""
              }
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-72 mt-4 rounded-md"
            >
              Create Website
            </button>
          </li>
        </ul>
      </form>
    </Layout>
  );
}
