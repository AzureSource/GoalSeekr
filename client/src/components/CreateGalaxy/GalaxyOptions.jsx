import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { allianceToggle } from './galaxyOptionsSlice';
import { Flex, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const GalaxyOptions = ({ galaxySize, maxPlayerCount, setMaxPlayerCount }) => {
  // const dispatch = useDispatch();

  // const toggleAlliance = () => {
  //   dispatch(allianceToggle());
  // };
  const [yearsPerTurn, setYearsPerTurn] = useState(1);
  const [alliance, setAlliance] = useState(false);

  const incrementPlayer = () => {
    if (maxPlayerCount === 5 && galaxySize) {
      alert ('Max Players');
      return;
    }
    if (maxPlayerCount === 10 && !galaxySize) {
      alert ('Max Players');
      return;
    }
    return setMaxPlayerCount(prevState => ++prevState);
  };
  const decrementPlayer = () => {
    if (maxPlayerCount === 2) {
      alert ('Minimum Players');
      return;
    }
    return setMaxPlayerCount(prevState => --prevState);
  };
  const incrementYears = () => {
    if (yearsPerTurn === 15) {
      alert ('Max Years per Turn');
      return;
    }
    return setYearsPerTurn(prevState => ++prevState);
  };
  const decrementYears = () => {
    if (yearsPerTurn === 1) {
      alert ('Minimum Years per Turn');
      return;
    }
    return setYearsPerTurn(prevState => --prevState);
  };

  useEffect(() => {
    console.log(yearsPerTurn, alliance, maxPlayerCount);
  },[yearsPerTurn, alliance, maxPlayerCount]);

  return (
    <Flex
      className='galaxy-option-container'
      justify='space-between'
      flexDir='column'
    >
      <div className='galaxy-side-headings'>
        <div>Max Players</div>
        <Flex
          alignItems='center'
        >
          <FiMinus
            className='create-galaxy-icons'
            onClick={decrementPlayer}
          />
          <div className='max-player-val'>{maxPlayerCount}</div>
          <FiPlus
            className='create-galaxy-icons'
            onClick={incrementPlayer}
          />
        </Flex>
      </div>
      <div className='galaxy-side-headings'>
        <div>Years Per Turn</div>
        <Flex alignItems='center'

        >
          <FiMinus
            className='create-galaxy-icons'
            onClick={decrementYears}
          />
          <div className='years-per-turn-val'>{yearsPerTurn}</div>
          <FiPlus
            className='create-galaxy-icons'
            onClick={incrementYears}
          />
        </Flex>

      </div>
      <FormControl
        className='galaxy-side-headings'
        display='flex' alignItems='center'
        justifyContent='space-between'
      >
        <div>Alliances</div>
        <Switch
          className='alliance-switch'
          onChange={() => setAlliance(prevState => !prevState)}
          size='md'
        />
      </FormControl>
    </Flex>
  );
};

export default GalaxyOptions;