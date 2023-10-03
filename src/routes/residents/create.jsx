import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPopup from "../../components/PasswordPopup";
import Layout from "../../components/Layout";
import { useAuth } from "../../AuthProvider";
import { useResident } from "../../ResidentProvider";

export default function Create() {
  const { auth } = useAuth();
  const { createResident, getResidentByName } = useResident();
  const navigate = useNavigate();

  const [residentData, setResidentData] = useState({
    name: "",
    bio: "",
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
    try {
      await createResident(residentData);

      // Fetch the resident by the unique field after creation.
      const fetchedResident = await getResidentByName(residentData.name);

      if (fetchedResident) {
        navigate(`/resident/${fetchedResident.id}`);
      }
      setResidentData({
        name: "",
        bio: "",
      });
      navigate(`/residents/${newResident.id}`);
    } catch (error) {
      console.error("Error creating resident:", error);
      // Optionally, you can set some state here to notify the user of the error.
    }
  };

  if (!auth) {
    return <PasswordPopup />;
  }

  return (
    <Layout>
      <h1 className="text-3xl text-center font-bold mb-8">Your Portfolio</h1>
      {/* image */}

      {/* name */}
      {/* bio */}

      {/* Section */}

      {/* Links */}
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
              className="h-10 bg-gray-100 rounded-md pl-3 w-56"
              type="text"
              name="name"
              placeholder="name"
              value={residentData.name}
              onChange={onChange}
            />
          </li>
          <li className="mb-4">
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-56"
              type="text"
              name="bio"
              placeholder="bio"
              value={residentData.bio}
              onChange={onChange}
            />
          </li>
          <li>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-56 mt-4 rounded-md"
            >
              Create Website
            </button>
          </li>
        </ul>
      </form>
    </Layout>
  );
}
