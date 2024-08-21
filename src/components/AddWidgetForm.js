import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../redux/widgetsSlice';
import { IoAddSharp } from "react-icons/io5";

const AddWidgetForm = ({ category }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWidget = { id: Date.now().toString(), name, text };
    dispatch(addWidget({ category, widget: newWidget }));
    setName('');
    setText('');
    setFormVisible(false); // Hide form after submission
  };

  return (
    <div className='main'>
      {!isFormVisible && (
        <div className='card-container'>
          <button className='addwidget' onClick={() => setFormVisible(true)}>
            <span className="icon-size"><IoAddSharp /></span>
            Add Widget
          </button>
        </div>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className='widget-form'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Widget Name"
            required
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Widget Text"
            required
          />
          <button type="submit">Add Widget</button>
        </form>
      )}
    </div>
  );
};

export default AddWidgetForm;
