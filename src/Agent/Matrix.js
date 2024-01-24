import React from 'react';
import './/agent.css';


const Matrix = () => {
  

  return (
    <div className="matrix">
      {costMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cost, cellIndex) => (
            <div key={cellIndex} className="cell">
              {cost}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
