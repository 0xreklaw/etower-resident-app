import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useResident } from "../../ResidentProvider";
import Loading from '../../components/Loading';
import Layout from '../../components/Layout';

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
                <>
                    <h1>{resident.name}</h1>
                    <p>{resident.bio}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Layout>
    );
}

