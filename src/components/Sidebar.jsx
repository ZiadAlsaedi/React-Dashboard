import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudentPath = location.pathname.startsWith('/Students/');
  const isProjectPath = location.pathname.startsWith('/AddProject');
  const isallProjectPath = location.pathname.startsWith('/Allproject');
  const ismyProjectPath = location.pathname.startsWith('/Myproject');
  const [admin, setAdmin] = useState({});
  const [student, setstudent] = useState({});


  useEffect(() => {
    const isLoggedInAdmin = localStorage.getItem('isLoggedInAdmin');
    if (isLoggedInAdmin) {
      setAdmin(JSON.parse(isLoggedInAdmin));
    }
  }, [])

  useEffect(() => {
    const isLoggedInStudent = localStorage.getItem('isLoggedInStudent');
    if (isLoggedInStudent) {
      setstudent(JSON.parse(isLoggedInStudent));
    }
  }, [])


  const Logout = () => {
    localStorage.removeItem('isLoggedInAdmin');
    navigate('/Login');
  };
  const Logout2 = () => {
    localStorage.removeItem('isLoggedInStudent');
    navigate('/Login');
  };

  return (
    <div className="flex h-screen font-sans">
      <header className="flex justify-between items-center bg-white p-4 shadow fixed w-full z-10">
        <div className={`flex text-xl font-bold ${sidebarOpen ? 'ml-48' : 'ml-5'} ${sidebarOpen ? 'max-sm:ml-32' : 'max-sm:ml-5'}`}>Dashboard</div>
        {!(isStudentPath || isProjectPath|| isallProjectPath || ismyProjectPath ) &&  (
            <>
        <div className="flex items-center">
        <div className={`flex ${sidebarOpen ? 'max-sm:ml-3' : 'max-sm:mr-5'}`}>{admin.name}</div>          <button
            className={`btn bg-red-600 shadow-lg hover:bg-red-300 font-semibold text-white btn-sm mr-10 ml-5 ${sidebarOpen ? 'max-sm:mr-7' : 'max-sm:ml-5'}`}
            onClick={Logout}
          >
            Logout
          </button>
        </div>
        </>
          )}
           {(isStudentPath || isProjectPath || isallProjectPath || ismyProjectPath )  &&(
            <>
        <div className="flex items-center">
          <div className={`flex ${sidebarOpen ? 'max-sm:ml-3' : 'max-sm:mr-5'}`}>{student.name}</div>
          <button
            className={`btn bg-red-600 shadow-lg hover:bg-red-300 font-semibold text-white btn-sm mr-10 ml-5 ${sidebarOpen ? 'max-sm:mr-7' : 'max-sm:ml-5'}`}
            onClick={Logout2}
          >
            Logout
          </button>
        </div>
        </>
          )}

      </header>

      <aside className={`fixed top-0 left-0 h-full bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20`}>
        <div className="absolute top-4 right-[-2rem] text-white duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-blue-500 p-2 rounded-full cursor-pointer " onClick={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" class="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        </div>
        <div className="mt-16 flex flex-col space-y-4">
          {!(isStudentPath || isProjectPath || isallProjectPath || ismyProjectPath) && (
            <>
              <Link to={"/Admin/"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <div>Home</div>
                </div>
              </Link>
              <Link to={"/ManageUsers/"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                  <svg className="w-6 h-10 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" xmlSpace="preserve">
                    <path fill="white" d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z"/>
                  </svg>
                  <div>Users</div>
                </div>
              </Link>
              <Link to={"/MangeProject/"}>
              <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
          <svg className = "w-6 h-6 mr-2"  xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 6.827 6.827">
    <g id="Layer_x0020_1">
      <path fill="white"  className="fil0" d="M2.753 5.12h1.32v.213h-1.32zM2.753 5.417h1.32v.213h-1.32zM2.95 5.714h.926v.213H2.95zM3.98 1.766H2.846l-.295.414.862.84.863-.84-.296-.414zM2.82 1.66h1.216l.016.022.338.473.026.037-.032.032-.933.907-.037.037-.037-.037-.932-.907-.033-.032.027-.037.338-.473.016-.022h.027z" />
      <path fill="white"  className="fil0" d="M2.481 2.133h1.817v.106H2.481z" />
      <path fill="white"  className="fil0" d="m3.324 1.762-.347.456-.084-.064.346-.456zM3.54 1.698l.347.456-.085.064-.346-.456z" />
      <path fill="white"  className="fil0" d="m3.892 2.209-.43.907-.097-.045.431-.908z" />
      <path fill="white"  className="fil0" d="m3.03 2.163.432.908-.097.045-.43-.907z" />
      <path fill="white"  className="fil0" d="M3.413.747c.433 0 .825.175 1.108.459.284.283.459.675.459 1.107 0 .483-.174.686-.375.919-.241.28-.525.61-.525 1.675v.106H2.747v-.106c0-1.066-.284-1.395-.525-1.675-.2-.233-.375-.436-.375-.919 0-.432.175-.824.459-1.107a1.562 1.562 0 0 1 1.107-.46zm.957.61A1.35 1.35 0 0 0 3.413.96 1.35 1.35 0 0 0 2.06 2.313c0 .405.15.58.323.78.256.298.557.647.576 1.707h.909c.018-1.06.32-1.41.576-1.707.173-.2.323-.375.323-.78a1.35 1.35 0 0 0-.397-.957z" />
      <path fill="white"  className="fil0" d="M3.173 2.807v2.1h-.107v-2.1zM3.787 2.807v2.1H3.68v-2.1z" />
    </g>
    <path style={{ fill: 'none' }} d="M0 0h6.827v6.827H0z" />
  </svg>
            <div >Project</div>
            </div>
              </Link>
              <Link to={"/Editproject/"}>
              <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
          <svg className = "w-6 h-6 mr-2"  xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 48 48">
          <defs>
        <style>
          {`.cls-1{fill:white}`}
        </style>
      </defs>
      <g id="Project">
        <path className="cls-1" d="M33.29 27H1v-6a2 2 0 0 1 2-2h11l3 3h16.68a7 7 0 0 0-.39 5zM33 9h5l-7-8v6a2 2 0 0 0 2 2zM43 25a3.34 3.34 0 0 0-2 .67 1.53 1.53 0 0 1-1.9 0A3.34 3.34 0 0 0 37 25a1 1 0 0 0 0 2c.17 0 0-.72 1 7.12a1 1 0 1 0 2-.24l-.74-6a3.45 3.45 0 0 0 1.5 0l-.74 6a1 1 0 0 0 2 .24c1-7.84.84-7.12 1-7.12a1 1 0 0 0 0-2zM21 8H9a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2zM27 12H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM27 16H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"/>
        <path d="M21 34H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1zm-3 8H8a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zm-4-4H8a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z" style={{ fill: '#fc6459' }}/>
        <path d="M48 25.1a8.07 8.07 0 0 0-9-8c0-8.64.1-8.32-.25-8.72-7.52-8.6-7-8.09-7.31-8.23S32.61 0 4 0a1 1 0 0 0-1 1v17a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h36a3 3 0 0 0 3-3v-2.16a2 2 0 0 0 1.16-1.35l.62-2.49H45a1 1 0 0 0 0-2v-2a1 1 0 0 0 .21-2c.89-3.6 2.79-4.42 2.79-7.9zM32 3.66 35.8 8H33a1 1 0 0 1-1-1zM5 2h25v5a3 3 0 0 0 3 3h4v7.57A8.06 8.06 0 0 0 33.08 21H17.41l-2.7-2.71A1 1 0 0 0 14 18H5zM3 20h10.59l2.7 2.71A1 1 0 0 0 17 23h15.26a7.75 7.75 0 0 0-.19 3H2v-5a1 1 0 0 1 1-1zm36 26H3a1 1 0 0 1-1-1V28h30.59c.59 1.44 1.57 2.44 2.2 5a1 1 0 0 0 .21 2v2a1 1 0 0 0 0 2h1.22l.62 2.49A2 2 0 0 0 38.78 43H40v2a1 1 0 0 1-1 1zm2.22-5h-2.44l-.5-2h3.44zM37 37v-2h6v2zm9-11.92c0 2.91-2 3.7-2.84 7.92h-6.32a15.82 15.82 0 0 0-2-4.92A6 6 0 0 1 40.07 19 6.09 6.09 0 0 1 46 25.08z" style={{ fill: '#424242' }}/>
      </g>
    <path style={{ fill: 'none' }} d="M0 0h6.827v6.827H0z" />
  </svg>
            <div >Manage Project</div>
            </div>
              </Link>
             
            </>
          )}
          {(isStudentPath || isProjectPath || isallProjectPath || ismyProjectPath) && (
            <>
            <Link to={"/Students/"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <div>Home</div>
                </div>
              </Link>
              <Link to={"/Allproject"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                <svg className = "w-6 h-6 mr-2"  xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 6.827 6.827">
    <g id="Layer_x0020_1">
      <path fill="white"  className="fil0" d="M2.753 5.12h1.32v.213h-1.32zM2.753 5.417h1.32v.213h-1.32zM2.95 5.714h.926v.213H2.95zM3.98 1.766H2.846l-.295.414.862.84.863-.84-.296-.414zM2.82 1.66h1.216l.016.022.338.473.026.037-.032.032-.933.907-.037.037-.037-.037-.932-.907-.033-.032.027-.037.338-.473.016-.022h.027z" />
      <path fill="white"  className="fil0" d="M2.481 2.133h1.817v.106H2.481z" />
      <path fill="white"  className="fil0" d="m3.324 1.762-.347.456-.084-.064.346-.456zM3.54 1.698l.347.456-.085.064-.346-.456z" />
      <path fill="white"  className="fil0" d="m3.892 2.209-.43.907-.097-.045.431-.908z" />
      <path fill="white"  className="fil0" d="m3.03 2.163.432.908-.097.045-.43-.907z" />
      <path fill="white"  className="fil0" d="M3.413.747c.433 0 .825.175 1.108.459.284.283.459.675.459 1.107 0 .483-.174.686-.375.919-.241.28-.525.61-.525 1.675v.106H2.747v-.106c0-1.066-.284-1.395-.525-1.675-.2-.233-.375-.436-.375-.919 0-.432.175-.824.459-1.107a1.562 1.562 0 0 1 1.107-.46zm.957.61A1.35 1.35 0 0 0 3.413.96 1.35 1.35 0 0 0 2.06 2.313c0 .405.15.58.323.78.256.298.557.647.576 1.707h.909c.018-1.06.32-1.41.576-1.707.173-.2.323-.375.323-.78a1.35 1.35 0 0 0-.397-.957z" />
      <path fill="white"  className="fil0" d="M3.173 2.807v2.1h-.107v-2.1zM3.787 2.807v2.1H3.68v-2.1z" />
    </g>
    <path style={{ fill: 'none' }} d="M0 0h6.827v6.827H0z" />
  </svg>
                  <div>All Projects</div>
                </div>
              </Link>
              <Link to={"/Myproject"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 3a3 3 0 100 6 3 3 0 000-6zM2 10a2 2 0 00-2 2v3a2 2 0 002 2h13.5a.5.5 0 00.5-.5V10H2zm12.5-3a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                  </svg>
                  <div>My Projects</div>
                </div>
              </Link>
              <Link to={"/AddProject/"}>
                <div className="flex items-center p-4 text-white cursor-pointer hover:bg-gray-600">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 9h-6V3a1 1 0 00-2 0v6H3a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z" />
                  </svg>
                  <div>Add Project</div>
                </div>
              </Link>
           
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
