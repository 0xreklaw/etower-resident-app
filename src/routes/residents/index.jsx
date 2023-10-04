import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResident } from "../../ResidentProvider";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";

export default function Resident() {
  const { id } = useParams();
  const { getResidentById } = useResident();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const residentData = await getResidentById(id);
        setResident(residentData);
      } catch (error) {
        console.error("Error fetching resident details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResident();
  }, [id]);

  if (loading) {
    return <Loading />; // Return the Loading component if data is still being fetched
  }

  return (
    <Layout>
      {resident ? (
        <div className="flex flex-col items-center bg-white p-4">
          <img
            className="rounded-full"
            width={100}
            height={100}
            src={`https://fsebzomnldetfkvttpec.supabase.co/storage/v1/object/public/Profiles/${resident.image_url}`}
          />
          <div className="mt-2 text-center text-xl font-bold">
            {resident.name}
          </div>
          <div className="mt-2 text-center mb-4">{resident.bio}</div>
          <div className="mt-2 flex flex-col space-y-2">
            {resident.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${resident.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-gray-100 p-2 rounded w-56 justify-center"
              >
                <FaLinkedin className="mr-2" />
                LinkedIn
              </a>
            )}
            {resident.instagram && (
              <a
                href={`https://www.instagram.com/${resident.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-gray-100 p-2 rounded w-56 justify-center"
              >
                <FaInstagram className="mr-2" />
                Instagram
              </a>
            )}
            {resident.twitter && (
              <a
                href={`https://twitter.com/${resident.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-gray-100 p-2 rounded w-56 justify-center"
              >
                <FaTwitter className="mr-2" />
                Twitter
              </a>
            )}
            {resident.tiktok && (
              <a
                href={`https://www.tiktok.com/@${resident.tiktok}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-gray-100 p-2 rounded w-56 justify-center"
              >
                <FaTiktok className="mr-2" />
                TikTok
              </a>
            )}
            {resident.other_website && (
              <a
                href={`https://${resident.other_website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-gray-100 p-2 rounded w-56 justify-center"
              >
                <FaGlobe className="mr-2" />
                Website
              </a>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
