import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";

const EditProject = () => {
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInAdmin = localStorage.getItem("isLoggedInAdmin");
    if (!isLoggedInAdmin) {
      navigate(`/`);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleStatusChange = async (id, status, comment, projectText) => {
    try {
      const response = await axios.put(`https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects/${id}`, {
        status,
        comment,
        projectText,
      });

      setProjects(projects.map(project => project.id === id ? response.data : project));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleProjectTextChange = (id, newText) => {
    setProjects(projects.map(project => project.id === id ? { ...project, projectText: newText } : project));
  };

  return (
    <div className="text-gray-900 bg-gray-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 mt-16 max-sm:p-0 bg-white transition-all duration-300 ${sidebarOpen ? 'ml-36' : 'ml-0'} ${sidebarOpen ? 'max-sm:ml-0' : 'max-sm:ml-0'}`}>
        <div className="p-4 flex">
          <h1 className="text-3xl">Manage Projects</h1>
        </div>
        <div className="px-3 py-4 flex justify-center max-sm:text-xs">
          <table className="w-full text-md bg-white shadow-md rounded mb-4 max-sm:text-xs max-sm:table-xs">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5 max-sm:p-1">Name</th>
                <th className="text-left p-3 px-5 max-sm:p-1">Project</th>
                <th className="text-left p-3 px-5 max-sm:p-1">State</th>
                <th className="text-left p-3 px-5 max-sm:p-1">Comment</th>
                <th className="text-left p-3 px-5 max-sm:p-1">Actions</th>
              </tr>
              {projects.map((project, index) => (
                <tr key={project.id} className={`border-b hover:bg-slate-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="p-3 px-5 max-sm:p-1">
                    <p>{project.name}</p>
                  </td>
                  <td className="p-3 px-5 max-sm:p-1">
                    <input
                      type="text"
                      value={project.projectText}
                      onChange={(e) => handleProjectTextChange(project.id, e.target.value)}
                      className="p-2 max-sm:p-0 border border-gray-300 rounded max-sm:w-14"
                    />
                  </td>
                  <td className="p-3 px-5 max-sm:p-1">
                    <p>{project.status}</p>
                  </td>
                  <td className="p-3 px-5 max-sm:p-1">
                    <input
                      type="text"
                      value={project.comment}
                      onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, comment: e.target.value } : p))}
                      placeholder="Enter comment"
                      className="p-2 max-sm:p-0 border border-gray-300 rounded max-sm:w-14"
                    />
                  </td>
                  <td className="p-3 px-5 flex justify-start">
                    <button
                      onClick={() => handleStatusChange(project.id, 'accepted', project.comment, project.projectText)}
                      className="mr-2 bg-blue-500 text-white p-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
