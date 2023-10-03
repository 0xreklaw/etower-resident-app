import Layout from "../../components/Layout";
import PasswordPopup from "../../components/PasswordPopup";
import { useAuth } from "../../AuthProvider";

export default function EditResident() {
  const { auth } = useAuth();

  if (!auth) {
    return <PasswordPopup />;
  }
  return (
    <Layout>
      <h1>Edit Resident</h1>
    </Layout>
  );
}
