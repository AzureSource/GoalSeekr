import React, { useEffect, createContext, useState} from 'react';
// import background from './images/sparse sky.png';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import SparseGalaxy from './SparseGalaxy.jsx';
import DenseGalaxy from './DenseGalaxy.jsx';
// eslint-disable-next-line no-unused-vars
import { Flex, Spacer } from '@chakra-ui/react';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ChooseHat from '../ChooseHat.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUserShipsFromDB, getUserPlanetsFromDB} from '../buildShips/UserShipSlice';
import { setGalaxyID } from './galaxyWindowSlice';

export const UserContext = createContext(null);

export default function GalaxyWindow ({ setTitle }) {
  const dispatch = useDispatch();


  const [hatModal, setHatModal] = useState(true);
  const {id} = useParams();
  const userShips = useSelector(state => state.userShips.ships);


  // console.log('userPlanets is ', userPlanets);

  useEffect(() => {
    getGalaxyID(id);
    setTitle(false);
  }, []);


  const getGalaxyID = (id) => {
    axios.get(`/api/galaxy/${id}`)
      .then((result) => {
        console.log('galaxy', result.data.rows[0]);
        //THIS IS THAT GALAXY ID YOU BEEN LOOKIN FOR RIGHT HEREEEEE
        dispatch(setGalaxyID(result.data.rows[0]));
      })
      .catch((err) => console.log(err));
  };




  useEffect(() => {
    const fetchData = async () => {
      const ships = await axios.get(`/api/users/${id}/ships`);
      dispatch(getUserShipsFromDB(ships.data.getusersships));
      const planets = await axios.get(`/api/users/${id}/planets`);
      dispatch(getUserPlanetsFromDB(planets.data));
    };
    fetchData();
  }, []);

  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={id, user} className='userContext'>
      <div className='galaxy-window' color='white'>
        <MenuSide/>
        <MenuBottom/>
        <Flex className='galaxy-window-top'>
          <MenuSide/>
          <TransformWrapper initialScale={1} className='transformWrapper'>
            <TransformComponent className='transformComponent'>
              <div className='planetsWindow'>
                {/* {hatModal && <ChooseHat gId={1} setHatModal={setHatModal}/>} */}
                {/* <SparseGalaxy/> */}
                <DenseGalaxy/>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </Flex>
      </div>
    </UserContext.Provider>
  );
}

{/* <TransformWrapper className='planetsWindow'>
<TransformComponent>
  {/* <SparseGalaxy/>
  <div>
    <DenseGalaxy/>
  </div>
</TransformComponent>
</TransformWrapper> */}
