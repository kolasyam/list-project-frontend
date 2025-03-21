// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();
//   const [agent, setAgent] = useState(null);
//   const [Subagents, setSubAgents] = useState([]);
//   const [lists, setLists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAgentDetails = async () => {
//       try {
//         const agentId = localStorage.getItem("agent");
//         if (!agentId) {
//           router.push("/login");
//           return;
//         }
//         const response = await fetch(
//           `http://localhost:8080/api/agents/${agentId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to fetch agent details");

//         const data = await response.json();
//         console.log("agentsdata", data);
//         setAgent(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     // const fetchSubAgents = async () => {
//     //   try {
//     //     const token = localStorage.getItem("agent");

//     //     const response = await fetch(
//     //       "https://list-project-backend-1.onrender.com/api/agents",
//     //       {
//     //         headers: { Authorization: `Bearer ${agent}` },
//     //       }
//     //     );

//     //     if (!response.ok) throw new Error("Failed to fetch agents");

//     //     const data = await response.json();
//     //     setSubAgents(data);
//     //   } catch (err) {
//     //     setError(err.message);
//     //   }
//     // };

//     // const fetchLists = async () => {
//     //   try {
//     //     const token = localStorage.getItem("token");

//     //     const response = await fetch(
//     //       "https://list-project-backend-1.onrender.com/api/lists",
//     //       {
//     //         headers: { Authorization: `Bearer ${token}` },
//     //       }
//     //     );

//     //     if (!response.ok) throw new Error("Failed to fetch lists");

//     //     const data = await response.json();
//     //     setLists(data);
//     //   } catch (err) {
//     //     setError(err.message);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     fetchAgentDetails();
//     // fetchSubAgents();
//     // fetchLists();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };
//   const handleNavigate = (path) => {
//     router.push(path);
//   };
//   // console.log("lists", lists);
//   // console.log("subagents", Subagents);
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="spinner w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center bg-red-100 p-4 rounded-md">
//           <p className="text-red-700">{error}</p>
//           <button
//             onClick={() => router.push("/login")}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md py-4">
//         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">
//             List Management System
//           </h1>
//           <div className="flex items-center space-x-6">
//             <span className="hidden sm:block text-gray-700 text-sm md:text-lg font-medium">
//               Hello, {agent?.name}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Action Buttons */}
//       <div className="max-w-5xl mx-auto mt-6 flex justify-between gap-4">
//         <button
//           onClick={() => handleNavigate("/agentform")}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
//         >
//           Add Sub Agent
//         </button>
//         <button
//           onClick={() => handleNavigate("/uploadfile")}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
//         >
//           Upload File and Distribute Lists
//         </button>
//       </div>
//       {/* Agents List */}
//       {/* <div className="max-w-7xl mx-auto px-4 mt-8">
//         {agents.length === 0 ? (
//           <p className="text-center text-gray-600 text-xl mt-10">
//             No agents are present
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {agents.map((agent) => {
//               const agentContacts = lists
//                 .flatMap((list) => list.distributions)
//                 .filter((dist) => dist.agent._id === agent._id)
//                 .flatMap((dist) => dist.contacts);

//               return (
//                 <div
//                   key={agent._id}
//                   className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {agent.name}
//                   </h3>
//                   <p className="text-gray-500">{agent.email}</p>
//                   <p className="text-gray-500">
//                     {agent.mobile.countryCode} {agent.mobile.phoneNumber}
//                   </p>

//                   <h4 className="mt-4 text-lg font-semibold text-gray-700">
//                     Lists:
//                   </h4>
//                   {agentContacts.length > 0 ? (
//                     <ul className="mt-2 space-y-2">
//                       {agentContacts.map((contact) => (
//                         <li
//                           key={contact._id}
//                           className="bg-gray-100 p-3 rounded-md border border-gray-300"
//                         >
//                           <p className="text-md font-medium text-gray-500">
//                             {contact.firstName}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {contact.phone}
//                           </p>
//                           <p className="text-xs text-gray-500 italic">
//                             {contact.notes}
//                           </p>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-sm text-gray-500 mt-2">
//                       No Lists available
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch admin details");

        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/agents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch agents");

        const data = await response.json();
        setAgents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://list-project-backend-1.onrender.com/api/lists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch lists");

        const data = await response.json();
        setLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
    fetchAgents();
    fetchLists();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const handleNavigate = (path) => {
    router.push(path);
  };
  // console.log("lists", lists);

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
            onClick={() => router.push("/login")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            List Management System
          </h1>
          <div className="flex items-center space-x-6">
            <span className="hidden sm:block text-gray-700 text-sm md:text-lg font-medium">
              Hello, {admin?.name}
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

      {/* Action Buttons */}
      <div className="max-w-5xl mx-auto mt-6 flex justify-between gap-4">
        <button
          onClick={() => handleNavigate("/agentform")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
        >
          Add Agent
        </button>
        <button
          onClick={() => handleNavigate("/uploadfile")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Upload File and Distribute Lists
        </button>
      </div>
      {/* Agents List */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {agents.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-10">
            No agents are present
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const agentContacts = lists
                .flatMap((list) => list.distributions)
                .filter((dist) => dist.agent._id === agent._id)
                .flatMap((dist) => dist.contacts);

              return (
                <div
                  key={agent._id}
                  className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {agent.name}
                  </h3>
                  <p className="text-gray-500">{agent.email}</p>
                  <p className="text-gray-500">
                    {agent.mobile.countryCode} {agent.mobile.phoneNumber}
                  </p>

                  {/* Contacts */}
                  <h4 className="mt-4 text-lg font-semibold text-gray-700">
                    Lists:
                  </h4>
                  {agentContacts.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {agentContacts.map((contact) => (
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
