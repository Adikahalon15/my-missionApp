import React from "react";

const ButtonPanel = ({ onClick }) => {
    const buttons = ['DEL', ':', '1', '2', '3', '*', '4', '5', '6', '+', '7', '8', '9', '-', '.', '0', '=' ]
    return (
    <div className="buttons">
      {buttons.map((button) => (
        <button key={button} onClick={() => onClick(button)}>
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonPanel;