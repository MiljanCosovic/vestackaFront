import React from 'react';

const Player = ({ image, name, id }) => {
  return (
    <div className="player">
      <img src={image} alt={name} />
      <p>Player {id}</p>
    </div>
  );
};
export default Player;