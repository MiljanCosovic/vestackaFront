import React from 'react';
import './agent.css';

const Agent = (props) => {
    return (
      <div
        className={`agent ${props.isSelected ? 'selected' : ''} ${props.add} ${props.isSelected ? 'chosen' : ''}`}
        onMouseOver={props.onHover}
        onClick={props.onClick}
      >
        <img src={props.image} alt="" />
        <p>{props.name}</p>
      </div>
    );
  };
  
export default Agent;
