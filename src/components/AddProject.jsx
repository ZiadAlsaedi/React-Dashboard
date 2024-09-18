import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [student, setStudent] = useState({});
  const [projectText, setProjectText] = useState('');
  const [status, setStatus] = useState('waiting');
  const [comment, setComment] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const studentData = localStorage.getItem('isLoggedInStudent');
    if (studentData) {
      const parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
    }
  }, []);

  const handleAddProject = async () => {
    if (!student || !student.id) {
      console.error('No student data available');
      return;
    }

    try {
      await axios.post('https://667f0f92f2cb59c38dc7f2a5.mockapi.io/projects', {
        name: student.name,
        userid: student.id,
        projectText: projectText,
        status: status,
        comment: comment,
        email:student.email
      });
      setToastMessage("Project Added Successfully");

    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  useEffect(() => {
    const isLoggedInStudent = localStorage.getItem('isLoggedInStudent');
    if (!isLoggedInStudent) {
      navigate(`/`);
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 mt-16 bg-white transition-all duration-300 ${sidebarOpen ? 'ml-10' : 'ml-0'}`}>
   
        <div className='flex justify-center items-center'>
          <div className="p-6 w-[50%] bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10 max-sm:w-[70%]">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Welcome, {student.name}</h2>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Your Project</label>
              <textarea
                id="message"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your project details here..."
              ></textarea>
              <button
                onClick={handleAddProject}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Project
              </button>
              {toastMessage && (
            <div className="alert alert-info p-4 mt-4 bg-blue-100 rounded-lg shadow-lg text-blue-700">
              <span>{toastMessage}</span>
            </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
