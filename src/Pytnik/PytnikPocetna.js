import React from 'react';
import { Link } from 'react-router-dom';
import aki from "../images/Aki.png";
import jocke from "../images/Jocke.png";
import uki from "../images/Uki.png";
import micko from "../images/Micko.png";



const PytnikPocetna = () => {
  
  return (
    <div className='prozor'>
    <div className='pocetna'>
      <h1>Dobrodošli u igru Pytnik</h1>
      <p>Pytnik je grafička simulacija napisana na programskom jeziku Pajton koja prikazuje rad osnovnih
algoritama pretraživanja na problemu trgovačkog putnika. Igra prikazuje mapu na kojoj
se nalaze zlatnici koje agent treba da sakupi. Cilј agenta je sakuplјanje svih zlatnika i vraćanje u početnu
poziciju putanjom koju izabrani algoritam generiše. Algoritam se bira na osnovu agenta koji se bira na pocetku igre, pa imamo sledece agente:

</p>
<div className='agenti'>
<div className='agentiLeft'>
    <img src={aki}/>
</div>  
<div className='agentiRight'>
    <p> Aki. Agent koristi strategiju pohlepne pretrage po dubini tako što prilikom izbora narednog zlatnika za
sakuplјanje bira onaj do kog je cena puta najmanja. Ukoliko postoje dva ili više takvih zlatnika, kao sledeći 
se bira onaj sa manjom vrednošću identifikacione oznake.</p>
</div>
</div>
<div className='agenti'>
<div className='agentiLeft'>
    <img src={jocke}/>
</div>  
<div className='agentiRight'>
    <p>Jocke. Agent koristi brute-force strategiju tako što generiše sve moguće putanje i od svih bira onu sa
najmanjom cenom.</p>
</div>
</div>
<div className='agenti'>
<div className='agentiLeft'>
    <img src={uki}/>
</div>  
<div className='agentiRight'>
    <p> Uki. Agent korististrategiju grananja i ograničavanja. Ukoliko postoje dve ili više parcijalnih putanja istih
cena, agent bira onu sa više sakuplјenih zlatnika na putanji, a u slučaju dve ili više takvih parcijalnih
putanja bira onu koja dovodi do zlatnika sa manjom vrednošću identifikacione oznake.</p>
</div>
</div>
<div className='agenti'>
<div className='agentiLeft'>
    <img src={micko}/>
</div>  
<div className='agentiRight'>
    <p>  Micko. Agent koristi A* strategiju pretraživanja, pri čemu se za heurističku funkciju koristi minimalno
obuhvatno stablo. Ukoliko postoje dve ili više parcijalnih putanja istih vrednosti funkcije procene, agent
bira onu sa više sakuplјenih zlatnika na putanji, a u slučaju dve ili više takvih parcijalnih putanja bira onu
koja dovodi do zlatnika sa manjom vrednošću identifikacione oznake.</p>
</div>
</div>
      <Link to="/igra">
        <button>Započni igru</button>
      </Link>
    </div>
    </div>
  );
}

export default PytnikPocetna;
