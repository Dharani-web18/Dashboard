import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidget } from '../redux/widgetsSlice';

const RemoveWidgetModal = ({ isOpen, onClose }) => {
  const categories = useSelector((state) => state.widgets.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const dispatch = useDispatch();

  // Map of full category names to their shorter versions
  const categoryNameMap = {
    'CSPM Executive Dashboard': 'CSPM',
    'CWPP Dashboard': 'CWPP',
    'Registry Scan': 'Registry'
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedWidgets(categories[category]?.widgets || []);
  };

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets(prevWidgets =>
      prevWidgets.map(widget =>
        widget.id === widgetId
          ? { ...widget, checked: !widget.checked }
          : widget
      )
    );
  };

  const handleRemove = () => {
    selectedWidgets.forEach(widget => {
      if (widget.checked) {
        dispatch(removeWidget({ category: selectedCategory, widgetId: widget.id }));
      }
    });
    onClose(); // Close the modal after removing widgets
  };

  return isOpen ? (
    <div className="modal right-sidebar-modal">
      <div className="modal-content">
        <div className='modal-header'>
          <h2 className='headtext'>Add Widgets</h2>
          <span className="close" onClick={onClose}>×</span>
        </div>
        <h4 className='heading2'>Personalize your dashboard by adding the following widget</h4>
        
        <div className="category-links">
          {Object.keys(categories).map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? 'selected' : ''}
            >
              {/* Display shorter version of category name */}
              {categoryNameMap[category] || category}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="widget-box-container">
            {selectedWidgets.map(widget => (
              <div key={widget.id} className="widget-item">
                <input
                  type="checkbox"
                  checked={widget.checked || false}
                  onChange={() => handleCheckboxChange(widget.id)}
                />
                <label>{widget.name}</label>
              </div>
            ))}
          </div>
        )}

        <div className='button-group'>
          <button onClick={onClose} style={{ color: 'rgb(3, 3, 121)', backgroundColor: 'white' }} >Cancel</button>
          <button onClick={handleRemove} style={{ color: 'white' , backgroundColor: 'rgb(3, 3, 137)'}}>Confirm</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RemoveWidgetModal;
