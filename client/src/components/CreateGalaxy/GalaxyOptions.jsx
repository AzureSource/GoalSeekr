import React from 'react';
import PropTypes from 'prop-types';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Flex, Switch, FormControl } from '@chakra-ui/react';

const GalaxyOptions = ({
  smallGalaxy,setAlliance,
  maxPlayerCount, setMaxPlayerCount,
  yearsPerTurn, setYearsPerTurn,
}) => {

  const incrementPlayer = () => {
    if (maxPlayerCount === 5 && smallGalaxy) {
      alert ('Max Players');
      return;
    }
    if (maxPlayerCount === 10 && !smallGalaxy) {
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

GalaxyOptions.propTypes = {
  setAlliance: PropTypes.func.isRequired,
  setMaxPlayerCount: PropTypes.func.isRequired,
  setYearsPerTurn: PropTypes.func.isRequired,
  maxPlayerCount: PropTypes.number.isRequired,
  yearsPerTurn: PropTypes.number.isRequired,
  smallGalaxy: PropTypes.bool.isRequired
};

export default GalaxyOptions;