import React, { useCallback, useEffect, useState } from 'react';
import aki from "../images/Aki.png";
import jocke from "../images/Jocke.png";
import uki from "../images/Uki.png";
import micko from "../images/Micko.png";
import { Link } from 'react-router-dom';
import Agent from '../Agent/agent';
import teren from '../images/terrain.png'
import novcic from "../images/coin.png";
import skloninovcic from "../images/collected_coin.png"
import '../App.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCoffee, faArrowRight, faBell } from '@fortawesome/free-solid-svg-icons';




const agents = [
    { image: aki, name: 'Aki', id: 1 },
    { image: jocke, name: 'Jocke', id: 2 },
    { image: uki, name: 'Uki', id: 3 },
    { image: micko, name: 'Micko', id: 4 }
];

const novcici = [
  {image: novcic, name:'prvi', id:1},
  {image: novcic, name:'drugi', id:2},
  {image: novcic, name:'treci', id:3},
  {image: novcic, name:'cetvrti', id:4},

]

const agentInfo = {
  1: "Aki. Agent koristi strategiju pohlepne pretrage po dubini tako što prilikom izbora narednog zlatnika za sakuplјanje bira onaj do kog je cena puta najmanja. Ukoliko postoje dva ili više takvih zlatnika, kao sledeći se bira onaj sa manjom vrednošću identifikacione oznake.",
  2: "Jocke. Agent koristi brute-force strategiju tako što generiše sve moguće putanje i od svih bira onu sa najmanjom cenom.",
  3:"Uki. Agent korististrategiju grananja i ograničavanja. Ukoliko postoje dve ili više parcijalnih putanja istih cena, agent bira onu sa više sakuplјenih zlatnika na putanji, a u slučaju dve ili više takvih parcijalnih putanja bira onu koja dovodi do zlatnika sa manjom vrednošću identifikacione oznake.",
  4:"Micko. Agent koristi A* strategiju pretraživanja, pri čemu se za heurističku funkciju koristi minimalno obuhvatno stablo. Ukoliko postoje dve ili više parcijalnih putanja istih vrednosti funkcije procene, agent bira onu sa više sakuplјenih zlatnika na putanji, a u slučaju dve ili više takvih parcijalnih putanja bira onu koja dovodi do zlatnika sa manjom vrednošću identifikacione oznake."
};





const Pytnik = () => {
  
  const[width, setWidth] = useState(6);
  const[height, setHeight] = useState(6);

  

  const[tiles, setTiles] = useState(
    [2,4,5,6,7,8,2,3,2,5,6,4,1,2,4,5,6,1,0,2,3,4,5,6,1,2,3,4,5,1,1,2,4,5,1,2]
  );

  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  
  



  
  const[playerX, setPlayerX] = useState(0);
  const[playerY, setPlayerY] = useState(0);

  const[editorMode, setEditorMode] = useState(true);
  

  const [hoveredAgent, setHoveredAgent] = useState(null);

  const handleAgentHover = (agentId) => {
    setHoveredAgent(agentId);
  };
  const [change, setChange] = useState(false);

  const[agent, setAgent] = useState(1);

  const [selectedAgent, setSelectedAgent] = useState(null);

  
  
  const [partialPaths, setPartialPaths] = useState([]); 
  const [currentPathCost, setCurrentPathCost] = useState(0);
  const [totalPathCost, setTotalPathCost] = useState(0);

  const [totalCost, setTotalCost] = useState(0);

  
  


  

  const[path, setPath] = useState([
    {x: 0, y:0}
  ]);
  
  const [collectedCoins, setCollectedCoins] = useState([]);

  useEffect(() => {
    setInitialPosition({ x: playerX, y: playerY });
  }, [playerX, playerY]);

  const resetAgentPosition = () => {
    setPlayerX(initialPosition.x);
    setPlayerY(initialPosition.y);
    setCollectedCoins([]);
  };
  
  



const [goldPositionsCombined, setGoldPositionsCombined] = useState([]);

const [gameFinished, setGameFinished] = useState(false);

const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  if (!editorMode) {
    setCurrentPosition({ x: playerX, y: playerY });
  }
}, [playerX, playerY, editorMode]);







const [isPlacingCoins, setIsPlacingCoins] = useState(false);

    

  const getX = (idx) => (1000 / width) * (idx % width);
  const getY = (idx) => (600 / height) * Math.floor(idx / width);
  

  const placeRandomCoins = () => {
    if (goldPositionsCombined.length >= 4) {
      alert("Postavili ste maksimalan broj novcica.");
      return;
    }
    const newTiles = [...tiles];
    const availableCoinPositions = [];
  
    
    for (let i = 0; i < width * height; i++) {
      availableCoinPositions.push(i);
    }
  
    
    for (let i = 0; i < newTiles.length; i++) {
      if (newTiles[i] === 8) {
        const indexToRemove = availableCoinPositions.indexOf(i);
        if (indexToRemove !== -1) {
          availableCoinPositions.splice(indexToRemove, 1);
        }
      }
    }
  
  
    const indexOfPosition00 = availableCoinPositions.indexOf(0);
    if (indexOfPosition00 !== -1) {
      availableCoinPositions.splice(indexOfPosition00, 1);
    }
  
    if (availableCoinPositions.length === 0) {
      alert("Nema dostupnih pozicija za postavljanje novčića.");
      return;
    }
  
    
    const randomIndex =
      availableCoinPositions[
        Math.floor(Math.random() * availableCoinPositions.length)
      ];
  
    const randomX = randomIndex % width;
    const randomY = Math.floor(randomIndex / width);
  
    
    const isCoinAlreadyPlaced = goldPositionsCombined.some(
      (position) => position[0] === randomX && position[1] === randomY
    );  
  
    if (isCoinAlreadyPlaced) {
      
      placeRandomCoins();
      return;
    }
  
    const newGoldPosition = [randomX, randomY];
    console.log(newGoldPosition, "ovo je nova pozicija novčića");
    setGoldPositionsCombined((oldArray) => [...oldArray, newGoldPosition]);
  
    
    newTiles[randomIndex] = tiles[randomIndex]; 
    setTiles(newTiles);
  };
  
  
  
  
  
  
  
  
  
  


  const handleAgentChange = (selectedAgentId) => {
    console.log('Selected agent ID:', selectedAgentId);
    setAgent(selectedAgentId);
    setSelectedAgent(selectedAgentId);
    setChange(true)
  };
  const refreshPage = () => {
    window.location.reload();
  };
  


  

  const fetchPathFromBackend = async () => {
    try {
      const tilesCopy = [...tiles];
      const response = await axios.post('https://django-renderr-app.onrender.com/pytnik', {
        tiles: tiles,
        playerx: playerX,
        playery: playerY,
        player_type: agents[agent-1].name,
        gold_positions: goldPositionsCombined
      });


      if (response.data.path) {
        setCurrentPathCost(response.data.cost || 0);
        setPartialPaths((oldPaths) => [...oldPaths, response.data.path]);
        setPath(response.data.path);
        setTotalPathCost((prevTotal) => prevTotal + (response.data.cost || 0));
        setEditorMode(e => !e);
      } else {
        console.error('Server nije vratio validnu putanju.');
      }
  
      
      
      console.log(response.data);
      console.log(tiles, playerX, playerY);
      console.log(agents[agent-1].name);
      console.log(goldPositionsCombined, "nema nista");
      
      console.log(response.data.path, "ovo je path");
      
      
    } catch (error) {
      console.error('Greška pri dohvaćanju putanje s backenda', error);
      console.log(error);
    }
  };
  
  
 
  
  useEffect(() => {
    for (let i = 0; i < goldPositionsCombined.length; i++) {
      if (playerX === goldPositionsCombined[i][1] && playerY === goldPositionsCombined[i][0]) {
        setGoldPositionsCombined(oldArray => oldArray.map((item, index) => index === i ? { ...item, collected: true } : item));
      }
    }
  
    
    const allCoinsCollected = goldPositionsCombined.every(position => position.collected);
  
    
    const isAtStartPosition = currentPosition.x === initialPosition.y && currentPosition.y === initialPosition.x;
  
    if (allCoinsCollected && isAtStartPosition && !editorMode) {
      setGameFinished(true);
    }
  }, [playerX, playerY, goldPositionsCombined, editorMode, currentPosition, initialPosition]);
  
  
  
  const [currentPositionInfo, setCurrentPositionInfo] = useState({
    x: null,
    y: null,
    tileValue: null,
  });

  const [previousPositions, setPreviousPositions] = useState([]);

  
  

  useEffect(() => {
    if (editorMode === true) return;
  
    let pathIdx = 0;
    let stepIdx = 0;
    let totalCost = 0;
  
    // unutar useEffect
const interval = setInterval(() => {
  if (!path[pathIdx] || !path[pathIdx][stepIdx]) {
    console.log('No more steps in path');
    clearInterval(interval);
    resetAgentPosition();
    return;
  }

  const [x, y] = path[pathIdx][stepIdx];
  console.log(`Moving to: x=${x}, y=${y}`);
  setPreviousPositions((prevPositions) => [
    ...prevPositions,
    { x: x, y: y, tileValue: tiles[y * width + x] },
  ]);
  setCurrentPositionInfo({
    x: x,
    y: y,
    tileValue: tiles[y * width + x],
  });
  setPlayerX(y);
  setPlayerY(x);
  stepIdx++;

  const index = y * width + x;
  console.log(`Current tile value: ${tiles[index]}`);
  totalCost += tiles[index];

  const collectedCoinIndex = goldPositionsCombined.findIndex(
    (position) => position[0] === x && position[1] === y
  );
  if (collectedCoinIndex !== -1) {
    const newCollectedCoins = [...collectedCoins, goldPositionsCombined[collectedCoinIndex]];
    setCollectedCoins(newCollectedCoins);

    if (newCollectedCoins.length === goldPositionsCombined.length) {
      setPlayerX(initialPosition.x);
      setPlayerY(initialPosition.y);
      setCollectedCoins([]);
      totalCost = 0;
    }
  }

  if (stepIdx === path[pathIdx].length) {
    pathIdx++;
    stepIdx = 0;
  }

  
  console.log(`Current path cost: ${totalCost}`);
  setCurrentPathCost(totalCost);

  setTotalPathCost((prevTotal) => prevTotal + totalCost);
}, 280);

  
    return () => clearInterval(interval);
  }, [editorMode === true]);

  
  useEffect(() => {
    if (editorMode === false && totalPathCost === 0) {
      setTotalPathCost(currentPathCost);
    }
  }, [editorMode, currentPathCost, totalPathCost]);
  
  


  const [showSetup, setShowSetup] = useState(true);

  const handleFinishSetup = () => {
    setShowSetup(false);
  };
  
  const getCoinNumberIcon = (number) => {
    switch (number) {
      case 1:
        return <FontAwesomeIcon icon={faCheck} />;
      case 2:
        return <FontAwesomeIcon icon={faCoffee} />;
      case 3:
        return <FontAwesomeIcon icon={faArrowRight} />;
      case 4:
        return <FontAwesomeIcon icon={faBell} />;
      default:
        return null;
    }
  };


  const calculateTotalCost = (path) => {
    let cost = 0;
  
    for (let i = 0; i < path.length; i++) {
      const { x, y } = path[i];
  
    
      if (x >= 0 && x < height && y >= 0 && y < width) {
        const index = x * width + y;
        cost += tiles[index];
  
        if (i === path.length - 1) {
          
          cost += currentPathCost;
        }
      }
    }
  
    console.log('Ukupna cena puta:', cost);
  
    return cost;
  };
  
  
  
  
  
  
  
  

  useEffect(() => {
    if (path.length > 0) {
      const pathCost = calculateTotalCost(path);
      setCurrentPathCost(pathCost);
    }
  }, [path]);

  useEffect(() => {
    setTotalCost((prevTotal) => prevTotal + currentPathCost);
  }, [currentPathCost]);
  
  
  
  

  
  
 
  return (
    <div style={{ height: "100%", margin: "auto" }}>
      {showSetup && (
      <div className="setup-container">
      <h1 style={{ textAlign: 'center' }}>Izaberite Agenta</h1>
      <table style={{ margin: 'auto' }}>
        <tbody>
          <tr>
  <td>Agent:</td>
  <td>
  <select onChange={(e) => handleAgentChange(e.target.value)} value={agent}>
  {agents.map((agent) => (
    <option key={agent.id} value={agent.id}>
      {agent.name}
    </option>
  ))}
</select>

  </td>
</tr>
        </tbody>
      </table>
     
    
      <div style={{ display: "flex", gap: "3rem", marginTop: "1rem", justifyContent: "center", marginTop: '35px' }}>
  {agents && agents.map((agent) => (
         <Agent
            image={agent.image}
            name={agent.name}
            key={agent.id}
            isSelected={selectedAgent === agent.id}
            onHover={() => handleAgentHover(agent.id)}
            selectedAgent={selectedAgent} 
          />
  ))}
</div>

      <div className="agent-info">
  {hoveredAgent !== null && (
    <p>
      {agentInfo[hoveredAgent]}
    </p>
  )}
</div>
<button className='dugmee' onClick={handleFinishSetup} style={{ display: 'block', margin: 'auto', marginTop: '1rem' }}>Zavrsi</button>
    </div>
    
      )}
  
     <h1 style={{textAlign:'center', fontSize:'45px'}}>Pytnik</h1>
  
      <div className="container">
        <svg viewBox={`0 0 ${editorMode ? 1202 : 1200} ${editorMode ? 640 : 602}`} className='slika' >
        {goldPositionsCombined.map((position, index) => {
  const image = position.collected ? skloninovcic : novcic;

  return (
    <g key={index} transform={`translate(${position[0] * 1000 / width},${position[1] * 600 / height})`}>
      <image
        className="gold"
        x={1000 / width / 24}
        y={600 / height / 20}
        width="100"
        height="100"
        href={image}
      />
      <text x={50} y={70} textAnchor="middle" fill="white" fontSize="24">
        {getCoinNumberIcon(index + 1)}
      </text>
    </g>
  );
})}

          <image
            className="player"
            style={{ transform: `translate(${playerY * 1000 / width}px, ${playerX * 600 / height}px)` }}
            x={1000 / width / 24}
            y={600 / height / 20}
            width="100"
            height="100"
            href={agents[agent - 1].image}
          />
        </svg>
        <div className='es'>
  <h4>Koraci</h4>
  {previousPositions.map((position, index) => (
    <p key={index}>
       Polje: [{position.x},{position.y}], Cena:{position.tileValue}
    </p>
  ))}

 
  <p className='d'>Ukupna cena: {currentPathCost}</p>
</div>


      </div>
      {gameFinished && (
  <div className='gameo' style={{ textAlign: 'center', fontSize: '30px', color: 'red', fontWeight:'bold' ,position: 'absolute', top: '50%', left: '43%', transform: 'translate(-50%, -50%)' }}>
    GAME OVER
    <button className='dugmeee' onClick={refreshPage}>Igraj opet</button>
  </div>
)}



      <div className="button-group">
        <button className='dm' onClick={placeRandomCoins}>Postavi novcice</button>
        <button className='dmm' onClick={fetchPathFromBackend}  disabled={isPlacingCoins}>START</button>
      </div>
  
      <div className='dugme'>
      </div>
  
     
  
      
    </div>
  );
        
  
}

export default Pytnik;