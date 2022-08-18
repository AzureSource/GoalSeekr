import React, { useEffect, createContext} from 'react';
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

export const UserContext = createContext(null);

export default function GalaxyWindow ({ setTitle }) {

  const {id} = useParams();

  const dispatch = useDispatch();

  const userShips = useSelector(state => state.userShips.ships);

  // const userPlanets = useSelector(state => state.userShips.planets);

  // console.log('userShips is ', userShips);

  // console.log('userPlanets is ', userPlanets);

  useEffect(() => {
    setTitle(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const ships = await axios.get(`/api/users/${id}/ships`);
      dispatch(getUserShipsFromDB(ships.data.getusersships));
      const planets = await axios.get(`/api/users/${id}/planets`);
      console.log('planets.data is ', planets.data);
      dispatch(getUserPlanetsFromDB(planets.data));
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={id}>
      <div className='galaxy-window' color='white'>
        <MenuSide/>
        <MenuBottom/>
        <Flex className='galaxy-window-top'>
          <div className='planetsWindow'>
            <TransformWrapper>
              <TransformComponent>
                {/* <SparseGalaxy/> */}
                <DenseGalaxy/>
              </TransformComponent>
            </TransformWrapper>
          </div>
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
