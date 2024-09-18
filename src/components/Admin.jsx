import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);
  const [acceptCount, setAcceptCount] = useState(0);
  const [waitingCount, setWaitungCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://667f0f92f2cb59c38dc7f2a5.mockapi.io/Users"
        );
        const students = response.data.filter(
          (user) => user.role === "student"
        );
        const admins = response.data.filter((user) => user.role === "admin");

        setStudentsCount(students.length);
        setAdminsCount(admins.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects"
        );
        const allproject = response.data.filter((project) => project.id);
        const accept = response.data.filter(
          (project) => project.status === "accepted"
        );
        const waiting = response.data.filter(
          (project) => project.status === "waiting"
        );
        const rejected = response.data.filter(
          (project) => project.status === "rejected"
        );
        setProjects(allproject.length);
        setAcceptCount(accept.length);
        setWaitungCount(waiting.length);
        setRejectedCount(rejected.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const isLoggedInAdmin = localStorage.getItem("isLoggedInAdmin");
    if (!isLoggedInAdmin) {
      navigate(`/`);
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-8 mt-16 bg-white transition-all duration-300 ${
          sidebarOpen ? "ml-32" : "ml-0"
        } ${sidebarOpen ? "max-sm:ml-0" : "max-sm:ml-0"}`}
      >
        <p className="text-center font-bold  text-4xl mb-7">
          Show Some Statistics
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          <div className="card bg-primary text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Student Numbers: {studentsCount}
              </p>
            </div>
          </div>
          <div className="card bg-primary text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Admins Numbers: {adminsCount}
              </p>
            </div>
          </div>
          <div className="card bg-lime-600 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Project Numbers: {projects}
              </p>
            </div>
          </div>
          <div className="card bg-lime-700 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Project Accepted Numbers: {acceptCount}
              </p>
            </div>
          </div>
          <div className="card bg-amber-300 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Project Witing Numbers: {waitingCount}
              </p>
            </div>
          </div>
          <div className="card bg-red-300 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
            <div className="card-body">
              <p className="text-center text-white text-3xl py-10">
                Project Rejected Numbers: {rejectedCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
