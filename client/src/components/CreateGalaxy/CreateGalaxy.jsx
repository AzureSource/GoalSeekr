import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Flex, Input, Button } from '@chakra-ui/react';
import SelectGalaxySize from './SelectGalaxySize.jsx';
import GalaxyOptions from './GalaxyOptions.jsx';
import { useParams } from 'react-router-dom';

const localhost = `http://localhost:7777/api/galaxy/create_galaxy`;

const CreateGalaxy = ({ setTitle }) => {
  let params = useParams();

  const redirectToEnterGalaxyPage = function () {
    window.location.href = `http://localhost:7777/#/entergalaxy/userid/${params.id}`;
  };

  const redirectToGalaxyWindow = function () {
    window.location.href = `http://localhost:7777/#/galaxy/userid/${params.id}`;
  };

  const [galaxyName, setGalaxyName] = useState('');
  const [maxPlayerCount, setMaxPlayerCount] = useState(2);
  const [yearsPerTurn, setYearsPerTurn] = useState(1);
  const [alliance, setAlliance] = useState(false);
  const [smallGalaxy, setSmallGalaxy] = useState(true);

  const submitGalaxy = () => {
    let send = {
      galaxyName,
      yearsPerTurn,
      maxPlayerCount,
      alliance,
      smallGalaxy,
    };
    axios.post(localhost, send)
      .then(({ data }) => {
        const gx_id = data.creategalaxy.id;

        axios.put(`/api/user/${params.id}/${gx_id}`)
          .then(() => console.log('success'))
          .catch((err) => console.log('ERROR:', err));
      })
      .catch(err => console.log(err));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    redirectToEnterGalaxyPage();
  };


  const handleGoToGalaxyWindow = async (event) => {
    event.preventDefault();
    if (galaxyName < 1) {
      return alert('Enter Galaxy Name');
    }
    else{
      axios({
        url:'/api/galaxy',
        method:'get',
        params:{
          name:galaxyName
        }
      })
        .then( async ({data}) => {
          if(data.length){
            alert('Galaxy Name Already Exists, Please Enter A New One');
          }
          else{
            await submitGalaxy();
            redirectToGalaxyWindow();
          }
        });
    }
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
            onChange={(e) => setGalaxyName(e.target.value)}
          />
        </Flex>
        <Flex
          className='create-galaxy-content'
          justify='space-evenly'
        >
          <SelectGalaxySize
            smallGalaxy={smallGalaxy}
            setSmallGalaxy={setSmallGalaxy}
            setMaxPlayerCount={setMaxPlayerCount}
          />
          <GalaxyOptions
            yearsPerTurn={yearsPerTurn}
            setYearsPerTurn={setYearsPerTurn}
            alliance={alliance}
            setAlliance={setAlliance}
            smallGalaxy={smallGalaxy}
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
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
          <Button
            backgroundColor='#2e2f47'
            className='create-galaxy-btn'
            onClick={(e) => handleGoToGalaxyWindow(e)}
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

CreateGalaxy.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default CreateGalaxy;
