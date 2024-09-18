import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Students = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [projectCount, setProjectCount] = useState([]);
  const [acceptedProjectCount, setAcceptedProjectCount] = useState([]);
  const [watingProjectCount, setwatingProjectCount] = useState([]);
  const [rejectedProjectCount, setrejectedProjectCount] = useState([]);

  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects');
        const loggedInStudent = JSON.parse(localStorage.getItem('isLoggedInStudent'));
        if (loggedInStudent) {
          const filteredProjects = response.data.filter(project => project.userid === loggedInStudent.id);
          const acceptedProjects = filteredProjects.filter( project => project.userid === loggedInStudent.id && project.status === "accepted");
          const watingProjects = filteredProjects.filter( project => project.userid === loggedInStudent.id && project.status === "waiting");
          const rejectedProjects = filteredProjects.filter( project => project.userid === loggedInStudent.id && project.status === "rejected");


          setProjectCount(filteredProjects.length);
          setAcceptedProjectCount(acceptedProjects.length);
          setwatingProjectCount(watingProjects.length)
          setrejectedProjectCount(rejectedProjects.length)
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const isLoggedInStudent = localStorage.getItem('isLoggedInStudent');
    if (!isLoggedInStudent) {
      navigate(`/`);
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 p-8 mt-16 bg-white transition-all duration-300 ${sidebarOpen ? 'ml-24' : 'ml-0'} max-sm:ml-0`}>
          <p className='text-center font-bold text-4xl mb-7'>Show Some Statistics</p>
          <div className='flex flex-wrap gap-5 justify-center'>
            <div className="card bg-primary text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
              <div className="card-body">
                <p className='text-center text-white text-3xl py-10'>My Project Numbers: {projectCount}</p>
              </div>
            </div>
            <div className="card bg-lime-800 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
              <div className="card-body">
                <p className='text-center text-white text-3xl py-10'>My Accepted Project Numbers: {acceptedProjectCount}</p>
              </div>
            </div>
            <div className="card bg-yellow-400 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
              <div className="card-body">
                <p className='text-center text-white text-3xl py-10'>My Wating Project Numbers: {watingProjectCount}</p>
              </div>
            </div>
            <div className="card bg-red-200 text-primary-content w-96 h-60 max-sm:w-60 max-sm:h-30">
              <div className="card-body">
                <p className='text-center text-white text-3xl py-10'>My Rejected Project Numbers: {rejectedProjectCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
