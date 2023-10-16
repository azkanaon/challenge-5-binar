// eslint-disable-next-line no-unused-vars
import { data } from "autoprefixer";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response.data;

        // Set the user state from API data
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return;
          }

          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="bg-white text-black p-20 pe-96 rounded-lg shadow-lg hover:bg-slate-100">
        <h1 className="text-3xl font-semibold mb-4 hover:scale-105">
          Profil Pengguna
        </h1>
        <div className="text-left">
          <p className="mb-2">
            <span className="font-semibold">Nama:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">ID:</span> {user.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
