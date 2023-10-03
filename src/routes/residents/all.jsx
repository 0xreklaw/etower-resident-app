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
      <h1>Residents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {residents.map((resident) => (
          <Link key={resident.id} to={`/residents/${resident.id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {resident.name}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
