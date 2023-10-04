// components/PasswordPopup.js
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import Layout from "./Layout";

export default function PasswordPopup() {
  const [code, setCode] = useState("");
  const { checkPasscode } = useAuth();

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkPasscode(code)) {
      console.log("Correct code!");
    } else {
      console.log("Incorrect code.");
    }
    setCode("");
  };

  return (
    <Layout>
      <h1 className="text-2xl text-center font-bold mb-8">
        Enter the secret password 🤫
      </h1>
      <form onSubmit={onSubmit}>
        <ul className="flex flex-col items-center justify-center">
          <li>
            <input
              className="h-10 bg-gray-100 rounded-md pl-3 w-72"
              type="password"
              value={code}
              placeholder="Password"
              onChange={onChange}
            />
          </li>
          <li>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-72 mt-4 rounded-md"
            >
              Enter
            </button>
          </li>
        </ul>
      </form>
    </Layout>
  );
}
