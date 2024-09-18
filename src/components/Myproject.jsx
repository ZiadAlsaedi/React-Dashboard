import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';


const Myproject = () => {
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects');
        const loggedInStudent = JSON.parse(localStorage.getItem('isLoggedInStudent'));
        if (loggedInStudent) {
          const filteredProjects = response.data.filter(project => project.userid === loggedInStudent.id);
          setProjects(filteredProjects);
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


  return (
    <div className="text-gray-900 bg-gray-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 mt-16 bg-white transition-all duration-300 ${sidebarOpen ? 'ml-32' : 'ml-0'} ${sidebarOpen ? 'max-sm:ml-0' : 'max-sm:ml-0'}`}>
        <div className="p-4 flex">
          <h1 className="text-3xl">Projects</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4 max-sm:text-xs max-sm:table-xs">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Project</th>
                <th className="text-left p-3 px-5">State</th>
                <th className="text-left p-3 px-5">Comment</th>

                <th></th>
              </tr>
              {projects.map((project, index) => (
                <tr key={project.id} className={`border-b hover:bg-slate-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="p-3 px-5">
                    <p>{project.name}</p>
                  </td>
                  <td className="p-3 px-5">
                    <p>{project.projectText}</p>
                  </td>
                  <td className="p-3 px-5">
                    <p>{project.status}</p>
                  </td>
                  <td className="p-3 px-5">
                    <p>{project.comment}</p>
                  </td>
                  <td className="p-3 px-5 flex justify-end"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myproject;
