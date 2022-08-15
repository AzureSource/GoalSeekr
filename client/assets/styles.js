import { extendTheme } from '@chakra-ui/react';
import background from './images/sparse sky.png';

const overrides = {
  styles: {
    global: {
      // add styles here
      'body.chakra-ui-light, html, #root, .appBackground': {
        height: '100%',
        backgroundImage: background,
        backgroundSize: 'contain'
      },
      '.galaxy-window': {
        width: '100%',
        height: '100%'
      },
      '#root': {
        height: '100%'
      },
      '.planetsWindow': {
        border: '2px solid black',
        height: '550px',
        width: '1100px'
      },
      '.zero, .zero2, .zero3, .zero4, .pinktopia, .pinktopia2, .pinktopia3, .pinktopia4, .pokitaru, .pokitaru2, .pokitaru3, .pokitaru4, .steins, .steins2, .steins3, .steins4, .lava, .lava2, .lava3, .lava4, .haku, .haku2, .haku3, .haku4, .chihiro, .chihiro2, .chihiro3, .chihiro4, .calcifer, .calcifer2, .calcifer3, .calcifer4, .athea, .athea2, .athea3, .athea4, .polaris, .polaris2, .polaris3, .polaris4': {
        // '-webkit-filter': 'drop-shadow(5px 5px 5px #222)',
        // filter: 'drop-shadow(5px 5px 5px #222)',
        height: '50px',
        position: 'absolute'
      },
      '.zero': {
        marginTop: '90px',
        marginLeft: '440px'
      },
      '.zero2': {
        marginTop: '460px',
        marginLeft: '850px'
      },
      '.zero3': {
        marginTop: '290px',
        marginLeft: '430px'
      },
      '.zero4': {
        marginTop: '100px',
        marginLeft: '650px'
      },
      '.pinktopia': {
        marginTop: '50px',
        marginLeft: '50px'
      },
      '.pinktopia2': {
        marginTop: '20px',
        marginLeft: '900px'
      },
      '.pinktopia3': {
        marginTop: '380px',
        marginLeft: '200px'
      },
      '.pinktopia4': {
        marginTop: '380px',
        marginLeft: '780px'
      },
      '.pokitaru': {
        marginTop: '12px',
        marginLeft: '200px'
      },
      '.pokitaru2': {
        marginTop: '170px',
        marginLeft: '910px'
      },
      '.pokitaru3': {
        marginTop: '20px',
        marginLeft: '450px'
      },
      '.pokitaru4': {
        marginTop: '450px',
        marginLeft: '380px'
      },
      '.steins': {
        marginTop: '250px',
        marginLeft: '50px'
      },
      '.steins2': {
        marginTop: '280px',
        marginLeft: '850px'
      },
      '.steins3': {
        marginTop: '20px',
        marginLeft: '750px'
      },
      '.steins4': {
        marginTop: '120px',
        marginLeft: '550px'
      },
      '.lava': {
        height: '65px',
        marginTop: '350px',
        marginLeft: '930px'
      },
      '.lava2': {
        height: '65px',
        marginTop: '140px',
        marginLeft: '240px'
      },
      '.lava3': {
        height: '65px',
        marginTop: '330px',
        marginLeft: '550px'
      },
      '.lava4': {
        height: '65px',
        marginTop: '330px',
        marginLeft: '60px'
      },
      '.haku': {
        marginTop: '418px',
        marginLeft: '100px'
      },
      '.haku2': {
        marginTop: '350px',
        marginLeft: '675px'
      },
      '.haku3': {
        marginTop: '50px',
        marginLeft: '300px'
      },
      '.haku4': {
        marginTop: '290px',
        marginLeft: '280px'
      },
      '.chihiro': {
        marginTop: '100px',
        marginLeft: '775px'
      },
      '.chihiro2': {
        marginTop: '220px',
        marginLeft: '350px'
      },
      '.chihiro3': {
        marginTop: '120px',
        marginLeft: '120px'
      },
      '.chihiro4': {
        marginTop: '450px',
        marginLeft: '580px'
      },
      '.calcifer': {
        marginTop: '420px',
        marginLeft: '490px'
      },
      '.calcifer2': {
        marginTop: '200px',
        marginLeft: '660px'
      },
      '.calcifer3': {
        marginTop: '460px',
        marginLeft: '220px'
      },
      '.calcifer4': {
        marginTop: '180px',
        marginLeft: '440px'
      },
      '.athea': {
        height: '90px',
        marginTop: '350px',
        marginLeft: '300px'
      },
      '.athea2': {
        height: '90px',
        marginTop: '10px',
        marginLeft: '580px'
      },
      '.athea3': {
        height: '90px',
        marginTop: '450px',
        marginLeft: '680px'
      },
      '.athea4': {
        height: '90px',
        marginTop: '250px',
        marginLeft: '720px'
      },
      '.polaris': {
        marginTop: '280px',
        marginLeft: '180px'
      },
      '.polaris2': {
        marginTop: '230px',
        marginLeft: '515px'
      },
      '.polaris3': {
        marginTop: '200px',
        marginLeft: '780px'
      },
      '.polaris4': {
        marginTop: '190px',
        marginLeft: '150px'
      },
      '.p-list-icon': {
        fontSize: '250%',
        margin: '2px'
      },
      'p-list-smIcon': {
        fontSize: '50%'
      },
      '.galaxy-window-top': {
        width: '100%',
        height: '70%'
      },
      '.menu-side': {
        width: '20%'
      },
      '.temp-div': {
        width: '80%'
      },
      '.menu-bottom': {
        height: '30%'
      },
      '.menu-bottom-container': {
        width: '95%',
        height: '80%',
        border: '2px solid #50b6ab',
        backgroundColor: '#2e2f47',
        borderRadius: '15px'
      },
      '.menu-side-container': {
        width: '70%',
        height: '85%',
        border: '2px solid #50b6ab',
        backgroundColor: '#2e2f47',
        borderRadius: '15px'
      },
      '.title-bar': {
        width: '100%',
        height: '27%',
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(9,188,138,0.39399509803921573) 100%)',
        backgroundOpacity: 0.7
      },
      '.title-name': {
        position: 'relative',
        top: '35px',
        width: '80%',
        height: '50%',
        backgroundColor: '#2e2f47',
        borderRadius: '15px',
        fontFamily: 'Abril Fatface',
        fontSize: '40px',
        fontWeight: 'bolder',
        color: '#50b6ab'
      },
      '.lobby-menu-container': {
        height: '67%',
        width: '100%'
      },
      '.lobby-menu': {
        height: '80%',
        width: '35%',
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.7536057692307692) 85%)'
      },
      '.create-galaxy-container': {
        height: '100%',
      },
      '.create-galaxy-content': {
        width: '100%',
        margin: '10px 0px 40px'
      },
      '.create-galaxy': {
        fontFamily: 'Abril Fatface',
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.7536057692307692) 85%)',
        // background: 'linear-gradient(180deg, rgba(45,48,71,1) 2%, rgba(80,182,171,0.24190008361204018) 45%, rgba(199,238,78,0.3756793478260869) 85%)',
        minHeight: '500px',
        minWidth: '900px'
      },
      '.galaxy-size-container, .galaxy-option-container': {
        width: '40%'
      },
      '.galaxy-option-container': {
        marginTop: '20px'
      },
      '.galaxy-size-heading': {
        fontSize: '20px',
        fontWeight: '900',
        width: '100%',
        textAlign: 'center',
        padding: '17px 0px',
        margin: '20px 0px',
        marginBottom: '25px',
        backgroundColor: '#2e2f47',
        color: '#50b6ab',
        borderRadius: '5px'
      },
      '.galaxy-side-headings': {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '20px',
        fontWeight: '900',
        width: '100%',
        padding: '17px 50px',
        backgroundColor: '#2e2f47',
        color: '#50b6ab',
        borderRadius: '5px'
      },
      '.login-with-google-btn': {
        size: '20px',
        backgroundColor: '#2e2f47',
        width: '200px',
        height: '50px'
      },
      '.galaxy-name-input::placeholder': {
        textAlign: 'center',
      },
      '.galaxy-input-row': {
        padding: '5px 0px',
      },
      '.galaxy-name-input': {
        padding: '20px',
        textAlign: 'center',
        alignSelf: 'center',
        height: '50px',
        borderRadius: '6px',
        border: '7px solid #2e2f47'
      },
      '.galaxy-size-images': {
        borderRadius: '5px',
        border: '3px solid #2e2f47',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSize: '250px',
        color: 'white',
        textShadow: '0 0 20px black',
        fontWeight: 'bold',
        fontSize: '20px',
        px: 4,
      },
      '.galaxy-size-unselected': {
        filter: 'blur(1px)'
      },
      '.create-galaxy-btn': {
        color: '#50b6ab',
        padding: '15px 30px 15px 30px',
        borderRadius: '5px',
        width: '40%',
        backgroundColor: '#2e2f47',
        // margin: '0px 60px 0px 60px'
      },
      '.max-player-val, .years-per-turn-val': {
        paddingRight: 'clamp(10px, 5%, 10px);',
        paddingLeft: 'clamp(10px, 5%, 10px);',
        margin: '0px 5px',
        background: 'white',
        borderRadius: '4px'
      },
      '.create-galaxy-icons:hover, .galaxy-size-images': {
        cursor: 'pointer'
      },
      '.alliance-switch': {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        width: '85px'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;