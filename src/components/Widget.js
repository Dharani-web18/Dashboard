import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/widgetsSlice';

const Widget = ({ widget, category }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ category, widgetId: widget.id }));
  };

  return (
    <div className='user-widget'>
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <div onClick={handleRemove}>❌</div>
    </div>
  );
};

export default Widget;
