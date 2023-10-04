import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useResident } from "../../ResidentProvider";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Residents() {
  const { getAllResidents } = useResident();

  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const allResidents = await getAllResidents();
        setResidents(allResidents);
      } catch (error) {
        console.error("Error fetching residents:", error);
      } finally {
        setLoading(false); // Set loading to false once data has been fetched (or error encountered)
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return <Loading />; // Return the Loading component if data is still being fetched
  }

  return (
    <Layout>
      <h1 className="text-2xl text-center font-bold ">Meet the Residents</h1>
      <h1 className="text-lg text-center font-regular mb-4">
        (and potential residents)
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
        {residents.map((resident) => (
          <Link key={resident.id} to={`/residents/${resident.id}`}>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md pt-8">
              <div className="w-24 h-24 relative overflow-hidden rounded-full">
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover w-full h-full"
                  src={`https://fsebzomnldetfkvttpec.supabase.co/storage/v1/object/public/Profiles/${resident.image_url}`}
                  alt="Resident"
                />
              </div>
              <div className="mt-2 text-center text-lg font-bold">
                {resident.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
