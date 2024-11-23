import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios'
const Dashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
   console.log(patientName)
   console.log(age)
   console.log(file)
    const formData = new FormData();
    formData.append("patient_name", patientName);
    formData.append("age", age);
    if (file) {
      formData.append("file", file);
    }
    console.log([...formData]);
    try {
    
      const response = await axios.post("http://127.0.0.1:8000/api/appointments/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPatientName('');
      setAge('');
      setFile(null); // Reset the file input state after submission

      alert("Appointment Successfull");
     
      console.log("Appointment submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
  
     
      <div
        className={`${
          sidebarOpen ? "w-1/5" : "w-0"
        } transition-all duration-300 bg-blue-900 text-white p-5 flex flex-col fixed h-full top-0 left-0 z-50`}
        style={{ display: sidebarOpen ? "block" : "none" }}
      >
        <div className=" flex justify-between ">
        <button onClick={toggleSidebar} className="text-xl">
            <GiHamburgerMenu />
          </button>
        <h2 className="text-2xl font-bold ">Dashboard</h2>
        </div>
       
        <ul>
          <li className="mb-4 hover:bg-blue-800 p-2 rounded cursor-pointer">Home</li>
          <li className="mb-4 hover:bg-blue-800 p-2 rounded cursor-pointer">Analytics</li>
          <li className="mb-4 hover:bg-blue-800 p-2 rounded cursor-pointer">Reports</li>
          <li className="mb-4 hover:bg-blue-800 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </div>
      
  
      <div className={`flex-grow p-6 ${sidebarOpen ? "ml-1/5" : ""}`}>
      
        <header className="flex justify-between items-center border-b-2 pb-4 mb-6">
         
          <button onClick={toggleSidebar} className="text-xl">
            <GiHamburgerMenu />
          </button>

          <h1 className="text-3xl font-semibold flex-grow text-center">Healthcare Dashboard</h1>

          <div className="flex items-center ml-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4">Profile</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">Logout</button>
          </div>
        </header>

     
       

      
        <div className="flex gap-6 mb-8">
          <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Patients</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">New Registrations</h3>
            <p className="text-3xl font-bold text-green-600">345</p>
          </div>
          <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Appointments Today</h3>
            <p className="text-3xl font-bold text-yellow-600">65</p>
          </div>
        </div>

       
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">New Appointment</h3>
          <form onSubmit={handleAppointmentSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter patient's name"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter patient's age"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">File Upload</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 focus:outline-none transition-all">
              Submit Appointment
            </button>
          </form>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Appointments</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left text-gray-700">Patient Name</th>
                <th className="border-b px-4 py-2 text-left text-gray-700">Date</th>
                <th className="border-b px-4 py-2 text-left text-gray-700">Doctor</th>
                <th className="border-b px-4 py-2 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b px-4 py-2">John Doe</td>
                <td className="border-b px-4 py-2">2024-11-23</td>
                <td className="border-b px-4 py-2">Dr. Smith</td>
                <td className="border-b px-4 py-2 text-green-600">Completed</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Jane Smith</td>
                <td className="border-b px-4 py-2">2024-11-24</td>
                <td className="border-b px-4 py-2">Dr. Johnson</td>
                <td className="border-b px-4 py-2 text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Mark Lee</td>
                <td className="border-b px-4 py-2">2024-11-24</td>
                <td className="border-b px-4 py-2">Dr. White</td>
                <td className="border-b px-4 py-2 text-red-600">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
