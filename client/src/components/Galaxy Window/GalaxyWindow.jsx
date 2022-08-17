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
import {getUserShipsFromDB} from '../buildShips/UserShipSlice';

export const UserContext = createContext(null);

export default function GalaxyWindow ({ setTitle }) {

  const {id} = useParams();

  const dispatch = useDispatch();

  const userShips = useSelector(state => state.userShips.ships);

  // console.log('userShips is ', userShips);

  useEffect(() => {
    setTitle(false);

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/users/${id}/ships`);
      dispatch(getUserShipsFromDB(res.data.getusersships));
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={id}>
      <div className='galaxy-window' color='white'>
        <Flex className='galaxy-window-top'>
          <MenuSide/>
          <TransformWrapper>
            <TransformComponent>
              <div className='planetsWindow'>
                {/* <SparseGalaxy/> */}
                <DenseGalaxy/>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </Flex>
        <MenuBottom/>
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
