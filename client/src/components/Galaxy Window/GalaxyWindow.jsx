import React, { useEffect, createContext, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SparseGalaxy from './SparseGalaxy.jsx';
import DenseGalaxy from './DenseGalaxy.jsx';
import { Flex } from '@chakra-ui/react';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ChooseHat from '../ChooseHat.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUserShipsFromDB, getUserPlanetsFromDB} from '../buildShips/UserShipSlice';
import { setGalaxyID } from './galaxyWindowSlice';

export const UserContext = createContext(null);

const GalaxyWindow = ({ setTitle, smallGalaxy }) => {
  const dispatch = useDispatch();
  const [hatModal, setHatModal] = useState(true);
  const {id} = useParams();
  const userShips = useSelector(state => state.userShips.ships);
  const [gID, setGID] = useState(null);

  const getGalaxyID = (id) => {
    axios.get(`/api/galaxy/${id}`)
      .then(({ data }) => {
        console.log('data', data.rows[0]);
        setGID(data.rows[0].currentgalaxy);
        //THIS IS THAT GALAXY ID YOU BEEN LOOKIN FOR RIGHT HEREEEEE
        dispatch(setGalaxyID(data.rows[0]));
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    setTitle(false);
    getGalaxyID(id);
  }, []);

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
    <UserContext.Provider value={id, user}>
      <div className='galaxy-window'>
        <MenuSide/>
        <MenuBottom/>
        {hatModal && <ChooseHat gId={gID} setHatModal={setHatModal}/>}
        <Flex className='galaxy-window-top'>
          <TransformWrapper >
            <TransformComponent >
              <div className='planetsWindow'>
                {!smallGalaxy ?
                  <SparseGalaxy/> :
                  <DenseGalaxy/>
                }
              </div>
            </TransformComponent>
          </TransformWrapper>
        </Flex>
      </div>
    </UserContext.Provider>
  );
};

GalaxyWindow.propTypes = {
  setTitle: PropTypes.func.isRequired,
  smallGalaxy: PropTypes.bool.isRequired
};

export default GalaxyWindow;