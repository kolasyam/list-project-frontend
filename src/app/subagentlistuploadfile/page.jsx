"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, XCircle, ArrowLeft } from "lucide-react";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // Next.js navigation hook

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  // Handle form submission
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(
        "https://list-project-backend-1.onrender.com/api/subagents/lists/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("agenttoken")}`, // Adjust if needed
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        router.push("/agentdashboard"); // Redirect to agent dashboard
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to upload file. Try again.";
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <button
        onClick={() => router.push("/agentdashboard")}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Agent Dashboard
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Upload CSV/XLS File
      </h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <UploadCloud size={40} className="text-gray-500 mb-2" />
          <p className="text-gray-600 text-sm">
            Drag & Drop or Click to Upload
          </p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
          >
            <p className="text-gray-800 text-sm truncate">{file.name}</p>
            <XCircle
              size={20}
              className="text-red-500 cursor-pointer"
              onClick={() => setFile(null)}
            />
          </motion.div>
        )}

        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-lg transition ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </motion.div>
  );
};

export default UploadFile;
