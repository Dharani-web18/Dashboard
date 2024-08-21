import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddWidgetForm from './AddWidgetForm';
import Widget from './Widget';
import RemoveWidgetModal from './RemoveWidgetModal';
import Search from './Search';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { RxCaretDown } from "react-icons/rx";
import { MdSync } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Home &gt; <span>Dashboard V2</span></h1>
        </div>
        
        <div className="navbar-center">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="navbar-right">
          <div className='down'>
            <RxCaretDown />
          </div>
          <div className='notification'>
            <MdOutlineNotificationsActive />
          </div>
          <div className='user'>
            <FaCircleUser />
          </div>
        </div>
      </nav>
      
      <div className="mainbody">
        <div className="start">
          <h2>CNNAP Dashboard</h2>
          <div className="right">
            <button className='remove' onClick={openModal}>
              Add Widget<IoAddSharp className='addicon' />
            </button>
            <button className='retry'><MdSync /></button>
            <button className='more'><MdMoreVert /></button>
            <div className='twobutton'>
              <button>
                <RiChatHistoryFill />
                <PiLineVerticalLight />
                Last 2 Days
                <RxCaretDown />
              </button>
            </div>
          </div>
        </div>

        {/* Modal and Sidebar */}
        {isModalOpen && (
          <div className="right-sidebar">
            <RemoveWidgetModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        )}

        {Object.keys(categories).map((category) => {
          const filteredWidgets = categories[category].widgets.filter((widget) =>
            widget.name.toLowerCase().includes(search.toLowerCase())
          );

          return (
            <div key={category} className="category-container">
              <h1 className="category-title">{category}</h1>
              <div className="widget-and-form-container">
                <div className="widgets-row">
                  {filteredWidgets.map((widget) => (
                    <Widget key={widget.id} widget={widget} category={category} />
                  ))}
                </div>
                <AddWidgetForm category={category} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
