import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { allianceToggle } from './galaxyOptionsSlice';
import { Flex, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const GalaxyOptions = () => {
  // const dispatch = useDispatch();

  // const toggleAlliance = () => {
  //   dispatch(allianceToggle());
  // };

  const [maxPlayerCount, setMaxPlayerCount] = useState(2);
  const [yearsPerTurn, setYearsPerTurn] = useState(1);
  const [alliance, setAlliance] = useState(false);

  const incrementPlayer = () => {
    if (maxPlayerCount === 10) {
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
    if (yearsPerTurn === 10) {
      alert ('Max Years per Turn');
      return;
    }
    return setMaxPlayerCount(prevState => ++prevState);
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
        <Flex>
          <FiMinus onClick={decrementPlayer}/>
          {maxPlayerCount}
          <FiPlus onClick={incrementPlayer}/>
        </Flex>
      </div>
      <div className='galaxy-side-headings'>
        <div>Years Per Turn</div>
        <Flex>
          <FiMinus onClick={decrementYears}/>
          {yearsPerTurn}
          <FiPlus onClick={incrementYears}/>
        </Flex>

      </div>
      <FormControl
        className='galaxy-side-headings'
        display='flex' alignItems='center'
        justifyContent='space-between'
      >
        <div>Alliances</div>
        <Switch onChange={() => setAlliance(prevState => !prevState)} size='md' />
      </FormControl>
    </Flex>
  );
};

export default GalaxyOptions;