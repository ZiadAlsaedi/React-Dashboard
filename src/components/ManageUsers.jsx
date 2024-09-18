import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('https://667f0f92f2cb59c38dc7f2a5.mockapi.io/Users')
      .then(response => {
        const students = response.data.filter(user => user.role === 'student');
        setUsers(students);
        setAllUsers(students); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    const isLoggedInAdmin = localStorage.getItem("isLoggedInAdmin");
    if (!isLoggedInAdmin) {
      navigate(`/`);
    }
  }, [navigate]);
  const handleSearch = () => {
    if (search.trim() !== '') {
      const filteredStudents = allUsers.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredStudents);
    } else {
      setUsers(allUsers);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDelete = (id) => {
    axios.delete(`https://667f0f92f2cb59c38dc7f2a5.mockapi.io/Users/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        setAllUsers(prevAllUsers => prevAllUsers.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-gray-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 mt-16 bg-white transition-all duration-300 ${sidebarOpen ? 'ml-44' : 'ml-0'} ${sidebarOpen ? 'max-sm:ml-0' : 'max-sm:ml-0'}`}>
        <div className="flex w-[40vw] gap-4 justify-center items-center">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder='Search Student by name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="p-4 flex">
          <h1 className="text-3xl">Students</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4 max-sm:text-xs max-sm:table-xs">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Role</th>
                <th className="text-left p-3 px-5">Action</th>

                <th></th>
              </tr>
              {users.map((user, index) => (
                <tr key={user.id} className={`border-b hover:bg-slate-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="p-3 px-5">
                    <p>{user.name}</p>
                  </td>
                  <td className="p-3 px-5">
                    <p>{user.email}</p>
                  </td>
                  <td className="p-3 px-5">
                    <p>{user.role}</p>
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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

export default ManageUsers;
