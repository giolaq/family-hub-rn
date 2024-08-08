import React, { useState } from 'react';
import './Popup.css'

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { task: string; assignedTo: string }) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = () => {
    onSubmit({ task, assignedTo });
    onClose();
    setTask('');
    setAssignedTo('');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create a New Task</h2>
        <div className="form-group">
          <label htmlFor="task">Task: </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To: </label>
          <input
            type="assignedTo"
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;