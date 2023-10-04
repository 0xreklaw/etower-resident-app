import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Welcome() {
  return (
    <Layout>
      <h1 className="text-3xl text-center font-bold mb-8">
        Build your own website
      </h1>

      <ul>
        <li className="mb-4">
          <Link to={`residents/create`}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-72 mt-4 rounded-md">
              Create your Website
            </button>
          </Link>
        </li>
        <li className="text-center font-medium">
          <Link to={`residents`}>View Residents</Link>
        </li>
      </ul>
    </Layout>
  );
}
