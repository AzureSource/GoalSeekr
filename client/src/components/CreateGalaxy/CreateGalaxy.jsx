import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Input, Button } from '@chakra-ui/react';
import SelectGalaxySize from './SelectGalaxySize.jsx';
import GalaxyOptions from './GalaxyOptions.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGalaxyName } from './CreateGalaxySlice';

const localhost = `http://localhost:7777/api/galaxy/create_galaxy`;

const CreateGalaxy = ({ setTitle }) => {
  let params = useParams();
  const dispatch = useDispatch();

  const redirectToEnterGalaxyPage = function() {
    window.location.href = `http://localhost:7777/#/entergalaxy/userid/${params.id}`;
  };

  const redirectToGalaxyWindow = function(){
    window.location.href = `http://localhost:7777/#/galaxy/userid/${params.id}`;
  };

  const galaxyName = useSelector((state) => state.currentGalaxyName.galaxyName);
  const [galaxySize, setGalaxySize] = useState(true);
  const [maxPlayerCount, setMaxPlayerCount] = useState(2);
  const [yearsPerTurn, setYearsPerTurn] = useState(1);
  const [alliance, setAlliance] = useState(false);
  const [allGalaxies, setAllGalaxies] = useState();

  const submitGalaxy = () => {
    let send = {
      galaxyName,
      yearsPerTurn,
      maxPlayerCount,
      alliance,
      galaxySize,
    };
    console.log(send);
    axios.post(localhost, send)
      //put req User and galaxy id****************************
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  const getGalaxies = () => {

  };

  const handleCancel = (event) => {
    event.preventDefault();
    redirectToEnterGalaxyPage();
  };

  const handleGoToGalaxyWindow = async (event) => {
    event.preventDefault();
    if (galaxyName < 1) return alert('Enter Galaxy Name');
    await submitGalaxy();
    redirectToGalaxyWindow();
  };

  useEffect(() => {
    setTitle(false);

  }, []);

  return (
    <Flex className='create-galaxy-container'
      justify='center'
      align='center'
    >
      <Flex
        className='create-galaxy'
        flexDir='column'
        justify='center'
      >
        <Flex
          className='galaxy-input-row'
          justify='center'
        >
          <Input
            width='300px'
            background='white'
            variant='outline'
            outline='3px solid #2e2f47'
            className='galaxy-name-input'
            placeholder='Enter Galaxy Name'
            value={galaxyName}
            onChange={(e) => dispatch(setGalaxyName(e.target.value))}
          />
        </Flex>
        <Flex
          className='create-galaxy-content'
          justify='space-evenly'
        >
          <SelectGalaxySize
            galaxySize={galaxySize}
            setGalaxySize={setGalaxySize}
            setMaxPlayerCount={setMaxPlayerCount}
          />
          <GalaxyOptions
            yearsPerTurn={yearsPerTurn}
            setYearsPerTurn={setYearsPerTurn}
            alliance={alliance}
            setAlliance={setAlliance}
            galaxySize={galaxySize}
            maxPlayerCount={maxPlayerCount}
            setMaxPlayerCount={setMaxPlayerCount}
          />
        </Flex>
        <Flex
          className='create-galaxy-btn-container'
          justify='space-evenly'
        >
          <Button
            backgroundColor='#2e2f47'
            className='create-galaxy-btn'
            onClick={(e)=>handleCancel(e)}
          >
            Cancel
          </Button>
          <Button
            backgroundColor='#2e2f47'
            className='create-galaxy-btn'
            onClick = {(e)=>handleGoToGalaxyWindow(e)}
          >
            Create Galaxy
          </Button>
        </Flex>
      </Flex>
      <Flex>
      </Flex>
    </Flex>
  );
};



export default CreateGalaxy;