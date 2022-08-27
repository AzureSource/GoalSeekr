import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanetSelection } from './denseGalaxySlice';
import { useParams } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { UserContext } from './GalaxyWindow.jsx';
import hatArray from '../hat/hatList.js';
import planets from './densePlanets';

export default function DenseGalaxy() {

  const dispatch = useDispatch();

  const { user } = useContext(UserContext);
  const { id } = useParams();

  const firstPlanet = useSelector((state) => state.denseGalaxyPlanetSelection.firstSelection);

  const userPlanets = useSelector(state => state.userShips.planets);


  const [colonized, setColonized] = useState([]);
  const [scouted, setScouted] = useState([]);

  const planetsObject = () => {
    axios.get(`/api/users/${id}/planets`)
      .then(result => {
        setScouted(result.data.scoutedPlanets);
        setColonized(result.data.colonizedPlanets);
      });
    return;
  };

  const [hat, setHat] = useState(null);
  const userHat = () => {
    axios.get(`/api/user/hat/${id}`)
      .then(result => {
        setHat(result.data[0].hat_id);
      });
  };

  useEffect(() => {
    planetsObject();
    userHat();
  }, [hat]);

  // const tempUserPlanets = {
  //   colonized: [1, 2, 3, 4, 5],
  //   scouted: [30, 31, 32],
  // };

  const handlePlanetSelection = (name, id) => {
    const planetSelection = name;
    const planetId = id;
    if (!firstPlanet) {
      dispatch(setPlanetSelection({homePlanet: planetSelection, planetIdSelected: planetId}));
    } else {
      dispatch(setPlanetSelection({targetPlanet: planetSelection, targetPlanetId: planetId}));
    }
  };

  // var image;
  // var aHat;
  // // var hatSource = hatArray[id -1] && hatArray[id - 1].name;
  // var hatSource = egg;

  var map =  planets.map((planet, index) => {
    var image;
    var aHat;
    var hatSource = hatArray[hat -1] && hatArray[hat - 1].name;

    // var hatSource = egg;
    if (scouted && scouted.includes(planet.id)) {
      image = <img src={planet.image} className={planet.classname}></img>;
    } else {
      image = <img src={planet.unexplored} className={planet.classname}></img>;
    }

    if (colonized && colonized.includes(planet.id)) {
      aHat = <Image src={hatSource} height='67px' marginTop={planet.top - 15} marginLeft={planet.left - 9} position='absolute'></Image>;
    } else {
      aHat = null;
    }
    return (
      <div key={index} role='button' onClick={() => handlePlanetSelection(planet.name, planet.id)} className='divInPlanetComponent'>
        {image}
        <div className={planet.name}>{planet.name}</div>
        {aHat}
      </div>
    );
  });

  // return (
  //   <div className='appBackground planetsWindow'>
  //     {planets.map((planet, index) => {
  //       return (
  //         <div key={index} role='button' onClick={() => handlePlanetSelection(planet.name, planet.id)}>
  //           <Image src={planet.image} className={planet.classname}/>
  //           <div className={planet.name}>{planet.name}</div>
  //           <Image src={devil} height='67px' marginTop={planet.top - 15} marginLeft={planet.left - 9} position='absolute'></Image>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div>
      {map}
    </div>
  );
}

