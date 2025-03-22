// import React from "react";

// const page = () => {
//   return <div>Agent Dashboard</div>;
// };

// export default page;
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [agent, setAgent] = useState(null);
  const [subagents, setSubAgents] = useState([]);
  const [subagentslists, setSubAgentsLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("agenttoken");
        console.log("token", token);
        if (!token) {
          router.push("/agentlogin");
          return;
        }
        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/subagents/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch admin details");

        const data = await response.json();
        setAgent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubAgents = async () => {
      try {
        const token = localStorage.getItem("agenttoken");

        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/subagents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch agents");

        const data = await response.json();
        setSubAgents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchsubagentsLists = async () => {
      try {
        const token = localStorage.getItem("agenttoken");

        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/subagents/lists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch lists");

        const data = await response.json();
        setSubAgentsLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
    fetchSubAgents();
    fetchsubagentsLists();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/agentlogin");
  };
  const handleNavigate = (path) => {
    router.push(path);
  };
  console.log("lists", subagentslists);
  // console.log("subagents", subagents);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-red-100 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => router.push("/agentlogin")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Back to agent Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            List Management System
          </h1>
          <div className="flex items-center space-x-6">
            <span className="hidden sm:block text-gray-700 text-sm md:text-lg font-medium">
              Hello, {agent?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto mt-6 flex justify-between gap-4">
        <button
          onClick={() => handleNavigate("/subagentform")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
        >
          Add Sub Agent
        </button>
        <button
          onClick={() => handleNavigate("/subagentlistuploadfile")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Upload File and Distribute Lists
        </button>
      </div>
      {/* <div className="mt-8">
        {subagents.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-gray-500 text-lg">No subagents found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subagents.map((subagent) => (
              <div
                key={subagent._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {subagent.name}
                </h3>
                <p className="text-gray-600">{subagent.email}</p>
                <p className="text-gray-600">
                  {subagent.mobile.countryCode} {subagent.mobile.phoneNumber}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {subagents.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-10">
            No subagents are present
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subagents.map((subagent) => {
              // Extract all contacts for this specific subagent
              const subagentContacts = subagentslists
                .flatMap((list) => list.distributions) // Get all distributions
                .filter((dist) => dist.subAgent?._id === subagent._id) // Match subagent ID
                .flatMap((dist) => dist.contacts); // Extract contacts array

              return (
                <div
                  key={subagent._id}
                  className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {subagent.name}
                  </h3>
                  <p className="text-gray-500">{subagent.email}</p>
                  <p className="text-gray-500">
                    {subagent.mobile.countryCode} {subagent.mobile.phoneNumber}
                  </p>

                  {/* Display Subagent's Lists */}
                  <h4 className="mt-4 text-lg font-semibold text-gray-700">
                    Lists:
                  </h4>
                  {subagentContacts.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {subagentContacts.map((contact) => (
                        <li
                          key={contact._id}
                          className="bg-gray-100 p-3 rounded-md border border-gray-300"
                        >
                          <p className="text-md font-medium text-gray-500">
                            {contact.firstName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {contact.phone}
                          </p>
                          <p className="text-xs text-gray-500 italic">
                            {contact.notes}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No Lists available
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
