import { extendTheme } from '@chakra-ui/react';
import background from './images/sparse sky.png';

const overrides = {
  styles: {
    global: {
      // add styles here

      'body.chakra-ui-light, html, #root': {
        height: '100%',
        width: '100%',
        backgroundImage: background,
        backgroundSize: 'contain',
        zIndex: -1,
      },
      '.galaxy-window, .appBackground': {
        width: '100%',
        height: '100%'
      },
      '#root': {
        height: '100%',
      },
      '.planetsWindow': {
        height: '720px',
        width: '1280px',
        marginLeft: '22%'
      },
      '.zero, .zero2, .zero3, .zero4, .pinktopia, .pinktopia2, .pinktopia3, .pinktopia4, .pokitaru, .pokitaru2, .pokitaru3, .pokitaru4, .steins, .steins2, .steins3, .steins4, .lava, .lava2, .lava3, .lava4, .haku, .haku2, .haku3, .haku4, .chihiro, .chihiro2, .chihiro3, .chihiro4, .calcifer, .calcifer2, .calcifer3, .calcifer4, .athea, .athea2, .athea3, .athea4, .polaris, .polaris2, .polaris3, .polaris4': {
        // '-webkit-filter': 'drop-shadow(5px 5px 5px #222)',
        // filter: 'drop-shadow(5px 5px 5px #222)',
        height: '50px',
        position: 'absolute'
      },
      '.ZERO, .PISCES, .CORBIN, .JADE, .PINKTOPIA, .TARUS, .MARSHALL, .AUSTIN, .POKITARU, .CAPRICORN, .JEROME, .IBRAHEEM, .STEINS, .VIRGO, .IZZI, .ALGO, .LAVA, .LEO, .BOOLEAN, .FLOWER, .HAKU, .SCORPIO, .XUTIS, .PEACH, .CHIHIRO, .REDUX, .APPLE, .VION, .CALCIFER, .FINN, .BLADE, .NEON, .ATHEA, .LOLLIPOP, .MEI, .LUNAR, .POLARIS, .PETER, .ZORIX, .SCAR, .TAURUS': {
        position: 'absolute',
        fontSize: '10px',
        color: 'rgba(80,182,171) !important',
      },
      '.egg, .cowboy, .bearears': {
        height: '67px',
        position: 'absolute'
      },
      '.egg': {
        marginTop: '35px',
        marginLeft: '41px'
      },
      '.bearears': {
        marginTop: '75px',
        marginLeft: '431px'
      },
      '.zero': {
        marginTop: '90px',
        marginLeft: '440px'
      },
      '.ZERO': {
        marginTop: '140px',
        marginLeft: '450px'
      },
      '.zero2': {
        marginTop: '460px',
        marginLeft: '850px'
      },
      '.PISCES': {
        marginTop: '510px',
        marginLeft: '857px'
      },
      '.zero3': {
        marginTop: '290px',
        marginLeft: '430px'
      },
      '.CORBIN': {
        marginTop: '340px',
        marginLeft: '435px'
      },
      '.zero4': {
        marginTop: '100px',
        marginLeft: '650px'
      },
      '.JADE': {
        marginTop: '150px',
        marginLeft: '660px'
      },
      '.pinktopia': {
        marginTop: '50px',
        marginLeft: '50px'
      },
      '.PINKTOPIA': {
        marginTop: '100px',
        marginLeft: '48px'
      },
      '.pinktopia2': {
        marginTop: '20px',
        marginLeft: '900px'
      },
      '.TAURUS': {
        marginTop: '70px',
        marginLeft: '903px'
      },
      '.pinktopia3': {
        marginTop: '380px',
        marginLeft: '200px'
      },
      '.MARSHALL': {
        marginTop: '430px',
        marginLeft: '198px'
      },
      '.pinktopia4': {
        marginTop: '380px',
        marginLeft: '780px'
      },
      '.AUSTIN': {
        marginTop: '430px',
        marginLeft: '785px'
      },
      '.pokitaru': {
        marginTop: '12px',
        marginLeft: '200px'
      },
      '.POKITARU': {
        marginTop: '62px',
        marginLeft: '200px'
      },
      '.pokitaru2': {
        marginTop: '170px',
        marginLeft: '910px'
      },
      '.CAPRICORN': {
        marginTop: '220px',
        marginLeft: '906px'
      },
      '.pokitaru3': {
        marginTop: '20px',
        marginLeft: '450px'
      },
      '.JEROME': {
        marginTop: '69px',
        marginLeft: '453px'
      },
      '.pokitaru4': {
        marginTop: '450px',
        marginLeft: '380px'
      },
      '.IBRAHEEM': {
        marginTop: '500px',
        marginLeft: '379px'
      },
      '.steins': {
        marginTop: '250px',
        marginLeft: '50px'
      },
      '.STEINS': {
        marginTop: '300px',
        marginLeft: '55px'
      },
      '.steins2': {
        marginTop: '280px',
        marginLeft: '850px'
      },
      '.VIRGO': {
        marginTop: '330px',
        marginLeft: '858px'
      },
      '.steins3': {
        marginTop: '20px',
        marginLeft: '750px'
      },
      '.IZZI': {
        marginTop: '70px',
        marginLeft: '764px'
      },
      '.steins4': {
        marginTop: '120px',
        marginLeft: '550px'
      },
      '.ALGO': {
        marginTop: '170px',
        marginLeft: '560px'
      },
      '.lava': {
        height: '65px',
        marginTop: '350px',
        marginLeft: '930px'
      },
      '.LAVA': {
        marginTop: '405px',
        marginLeft: '950px'
      },
      '.lava2': {
        height: '65px',
        marginTop: '140px',
        marginLeft: '240px'
      },
      '.LEO': {
        marginTop: '195px',
        marginLeft: '263px'
      },
      '.lava3': {
        height: '65px',
        marginTop: '330px',
        marginLeft: '550px'
      },
      '.BOOLEAN': {
        marginTop: '383px',
        marginLeft: '558px'
      },
      '.lava4': {
        height: '65px',
        marginTop: '330px',
        marginLeft: '60px'
      },
      '.FLOWER': {
        marginTop: '385px',
        marginLeft: '70px'
      },
      '.haku': {
        marginTop: '418px',
        marginLeft: '100px'
      },
      '.HAKU': {
        marginTop: '468px',
        marginLeft: '109px'
      },
      '.haku2': {
        marginTop: '350px',
        marginLeft: '675px'
      },
      '.SCORPIO': {
        marginTop: '400px',
        marginLeft: '678px'
      },
      '.haku3': {
        marginTop: '50px',
        marginLeft: '300px'
      },
      '.XUTIS': {
        marginTop: '100px',
        marginLeft: '309px'
      },
      '.haku4': {
        marginTop: '290px',
        marginLeft: '280px'
      },
      '.PEACH': {
        marginTop: '340px',
        marginLeft: '287px'
      },
      '.chihiro': {
        marginTop: '100px',
        marginLeft: '775px'
      },
      '.CHIHIRO': {
        marginTop: '150px',
        marginLeft: '777px'
      },
      '.chihiro2': {
        marginTop: '220px',
        marginLeft: '350px'
      },
      '.REDUX': {
        marginTop: '270px',
        marginLeft: '357px'
      },
      '.chihiro3': {
        marginTop: '120px',
        marginLeft: '120px'
      },
      '.APPLE': {
        marginTop: '170px',
        marginLeft: '128px'
      },
      '.chihiro4': {
        marginTop: '450px',
        marginLeft: '580px'
      },
      '.VION': {
        marginTop: '500px',
        marginLeft: '592px'
      },
      '.calcifer': {
        marginTop: '420px',
        marginLeft: '490px'
      },
      '.CALCIFER': {
        marginTop: '470px',
        marginLeft: '490px'
      },
      '.calcifer2': {
        marginTop: '200px',
        marginLeft: '660px'
      },
      '.FINN': {
        marginTop: '250px',
        marginLeft: '671px'
      },
      '.calcifer3': {
        marginTop: '460px',
        marginLeft: '220px'
      },
      '.BLADE': {
        marginTop: '510px',
        marginLeft: '227px'
      },
      '.calcifer4': {
        marginTop: '180px',
        marginLeft: '440px'
      },
      '.NEON': {
        marginTop: '230px',
        marginLeft: '450px'
      },
      '.athea': {
        height: '90px',
        marginTop: '350px',
        marginLeft: '300px'
      },
      '.ATHEA': {
        marginTop: '418px',
        marginLeft: '325px'
      },
      '.athea2': {
        height: '90px',
        marginTop: '10px',
        marginLeft: '580px'
      },
      '.LOLLIPOP': {
        marginTop: '78px',
        marginLeft: '600px'
      },
      '.athea3': {
        height: '90px',
        marginTop: '450px',
        marginLeft: '680px'
      },
      '.MEI': {
        marginTop: '520px',
        marginLeft: '715px'
      },
      '.athea4': {
        height: '90px',
        marginTop: '250px',
        marginLeft: '720px'
      },
      '.LUNAR': {
        marginTop: '320px',
        marginLeft: '747px'
      },
      '.polaris': {
        marginTop: '280px',
        marginLeft: '180px'
      },
      '.POLARIS': {
        marginTop: '330px',
        marginLeft: '183px'
      },
      '.polaris2': {
        marginTop: '230px',
        marginLeft: '515px'
      },
      '.PETER': {
        marginTop: '280px',
        marginLeft: '523px'
      },
      '.polaris3': {
        marginTop: '200px',
        marginLeft: '780px'
      },
      '.ZORIX': {
        marginTop: '250px',
        marginLeft: '788px'
      },
      '.polaris4': {
        marginTop: '190px',
        marginLeft: '150px'
      },
      '.SCAR': {
        marginTop: '240px',
        marginLeft: '160px'
      },
      '.menu-side': {
        width: '20%',
      },
      '.menu-bottom': {
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'end',
        justifyContent: 'end',
      },
      '.menu-bottom-container': {
        zIndex: 10,
        width: '65%',
        height: '30%',
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.6536057692307692) 85%)',
        margin: '0px 15px 10px',
        justifyContent: 'center',
        borderRadius: '4px'
      },
      //-------------------------------HAT MODAL
      '#hat-div': {
        position: 'absolute',
        width: '50%',
        height: '60%',
        top: '4%',
        zIndex: '3',
        right: '9%',
        color: '#c7e4e9',
        backgroundColor: 'cadetblue',
        borderRadius: '13px'
      },
      '.selectHatButtons1': {
        gridRow: 3
      },
      '.selectHatButtons2': {
        gridRow: 5
      },
      '.hat-list1': {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '5%',
        gridRow: 2
      },
      '.hat-list2': {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '5%',
        gridRow: 4
      },
      '#hat-list-title': {
        gridRow: 1,
        textAlign: 'center',
        fontSize: '2rem'
      },
      '#confirm-hat': {
        width: '25%',
        textAlign: 'center',
        backgroundColor: 'rgba(80,182,171)',
        borderRadius: '6px',
        justifySelf: 'center'
      },
      '.hat-images': {
        borderRadius: '6px',
        size:'200px',
        zIndex: 4,
        border: '2px solid rgba(80,182,171)'
      },
      '.unavailable-hat': {
        filter: 'blur(.5px) brightness(40%)',
      },
      '.available-hat:hover': {
        cursor: 'pointer'
      },
      '.selected-hat': {
        filter: 'brightness(90%) hue-rotate(321deg)',
      },

      //-------------------------------SIDE MENU
      '.menu-side-container': {
        width: '32%',
        height: '100%',
        position: 'absolute',
        padding: '25px 0px',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.7536057692307692) 85%)',
        zIndex: 10,
      },
      // '#player-list-conatiner': {
      //   overflow: 'hidden'
      // },
      '#pl-acc': {
        fontFamily: 'Abril Fatface',
        backgroundColor: '#2e2f47',
        border: '2px solid rgba(80,182,171)',
        borderRadius: '7px',
        height: '100%',
        color: '#50b6ab',
        overflow: 'auto'

      },
      '#pl-acc::-webkit-scrollbar': {
        display: 'none'  /* Safari and Chrome */
      },
      '#player-list': {
        width:'90%',
        height: '28.5%',
        overflow: 'hidden'
      },
      '.p-list-icon': {
        fontSize: '250%',
        margin: '2px'
      },
      'p-list-smIcon': {
        fontSize: '50%'
      },
      //--------------------------------- stats and chats
      '.stats-container, .chats-container': {
        width: '50%',
        margin: '15px',
        borderRadius: '7px',
        border: '2.5px solid rgba(80,182,171,0.4)',
        background: '#2e2f47',
        color: 'white',
      },
      '.chats-container': {
        marginLeft: '7.5px',
      },
      '.stats-container': {
        marginRight: '7.5px',
        alignItems: 'center',
        fontFamily: 'Abril Fatface',
        color:  'rgba(80,182,171)'
      },
      '.chatsMainDisplay::-webkit-scrollbar': {
        display: 'none'  /* Safari and Chrome */
      },
      '.chatsSendBox, .chatsMainDisplay, .chatsTitle': {
        fontFamily: 'Abril Fatface',
        color:  'rgba(80,182,171)'
      },
      '.chatsSendBox': {
        height: '100%',
      },
      '.stats-content-container': {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100% !important',
        width: '100%',
      },
      '.stat-username-money-container': {
        width: '90%',
        justifyContent: 'space-around',
        fontSize: '1.5rem'
      },
      //--------------------------------- stats
      //---------------------------------SIDE MENU
      '.end-turn-btn, .tasks-modal-btn': {
        fontFamily: 'Abril fatface',
        background: '#2e2f47 !important',
        color: 'rgba(80,182,171)',
        width: '50%',
        padding: '10px',
        // margin: '10px 0px',
        border: '2px solid rgba(80,182,171)',
        // margin: '5px 0px',
      },
      '.end-turn-btn': {
        marginRight: '7.5px',
      },
      '.tasks-modal-btn': {
        marginLeft: '7.5px',
      },
      '.side-menu-bottom-btn-container': {
        width: '90%',
        justifyContent: 'space-between'
      },
      //--------------------------------- SIDE MENU
      '.title-bar': {
        width: '100%',
        height: '27%',
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(9,188,138,0.72) 100%)',
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
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.7536057692307692) 100%)'
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
        filter: 'blur(1.5px)'
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
      '.create-galaxy-icons:hover, .galaxy-size-unselected, .plusShip, .minusShip': {
        cursor: 'pointer'
      },
      '.alliance-switch': {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        width: '85px'
      },
      '.username-input, .enter-existing-galaxy-input, .motto-input': {
        width: '200px',
        fontFamily: 'Abril Fatface',
        size: '20px',
        textAlign: 'center',
        borderRadius: '4px',
        border:'2px solid #2e2f47',
        height: '37px',
      },
      '.username-input': {
        marginBottom: '5px',
      },
      '.motto-input': {
        margin: '5px 0px 10px',
      },
      '.enter-existing-galaxy-input': {
        margin: '10px 0px'
      },
      '.username-input-btn, .join-galaxy-btn, .create-new-galaxy-btn': {
        fontSize: '25px',
        fontWeight: 800,
        fontFamily: 'Abril Fatface',
        color: '#50b6ab',
        borderRadius: '4px',
        size: '20px',
        backgroundColor: '#2e2f47',
        width: '200px',
        height: '50px'
      },

      '.or-seperator': {
        fontSize: '25px',
        fontWeight: 800,
        fontFamily: 'Abril Fatface',
        paddingTop: '5px'
      },
      // =============================
      // build ship
      // =============================
      '.build-modal-btn, .queue-mission-btn': {
        fontFamily: 'Abril Fatface',
        background: '#2e2f47 !important',
        border: '2px solid rgba(80,182,171)',
        color: 'rgba(80,182,171)',
        width: '90%',
        margin: '5px 0px',
      },
      '.build-ship-modal': {
        color: 'rgba(80,182,171) !important',
      },
      '.ship-modal-content': {
        top: '50px',
        width: '85% !important',
        height: '70% !important',
        backgroundColor: '#2e2f47 !important',
      },
      '.build-ship-close': {
        color: 'rgba(80,182,171)'
      },
      '.ship-boxes': {
        width: '100%',
        height: '100%',
        margin: '0px 5px',
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.6536057692307692) 85%)',
        border: '2px solid rgba(80,182,171)',
        borderRadius: '5px',
      },
      '.ship-box-containers': {
        width: '100%',
        justifyContent: 'space-between'
      },
      '#select-mission-type': {
        textAlign: 'center',
        backgroundColor: '#2e2f47',
      },
      '#select-type-container': {
        borderRadius: '4px',
        border: '2px solid rgba(80,182,171)',
        marginTop: '5px',
        height: '44% !important',
      },
      '.bottom-ship-container': {
        fontFamily: 'Abril Fatface',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '5px',
      },
      '.buildship-currency-bottom': {
        width: '33%',
        textAlign: 'center',
        borderRadius: '5px',
        color: '#2e2f47',
        backgroundColor: 'rgba(80,182,171)'
      },
      // =============================
      // build ship
      // =============================

      // =============================
      // Mission Module
      // =============================
      '.ship-selection:hover': {
        background: 'rgba(80,182,171)',
        cursor: 'pointer',
      },
      '.ship-selection-selected': {
        background: '#2e2f47 !important',
        color:'rgba(80,182,171)'
      },
      '.mission-module-container': {
        borderRadius: '4px',
        height: '50%',
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      '.mission-selector-container': {
        justifyContent: 'space-between'
      },
      '.planet-selection-container, .planet-mission-container': {
        fontFamily: 'Abril fatface',
        color: 'rgba(80,182,171)',
        width: '50%',
      },
      '.planet-selection-container': {
        marginRight: '7.5px',
        justifyContent: 'center',
        textAlign: 'center',
      },
      '.planet-mission-container': {
        marginLeft: '7.5px',
        justifyContent: 'space-between',
        textAlign: 'center',
      },
      '.planet-selected-home': {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        marginBottom: '5px',
      },
      '.planet-selected-target': {
        justifyContent: 'center',
        height: '50%',
        alignItems: 'center',
        marginTop: '5px',
      },
      '#reset-btn': {
        fontSize: '1em',
        marginBottom: '5px',
        fontWeight: 500,
      },

      '#reset-btn, .planet-selected-target, .planet-selected-home': {
        borderRadius: '4px',
        fontSize: '1em !important',
        border: '2px solid rgba(80,182,171)',
        backgroundColor: '#2e2f47',
      },
      '.queue-mission-btn': {
        fontFamily: 'Abril Fatface',
        background: '#2e2f47 !important',
        border: '2px solid rgba(80,182,171)',
        color: 'rgba(80,182,171)',
        width: '100%',
        margin: '5px 0px',
      },
      '#planet-mission-list': {
        height: '30%',
        overflow: 'auto'
      },
      '.th-ship-stats': {
        textAlign: 'center',
        fontSize: '.8rem !important',
        fontFamily: 'Abril Fatface !important',
        color: '#2e2f47 !important'
      },
      // =============================
      // Mission Module
      // =============================
      // =============================
      // tasks
      // =============================
      '.tasksContainer::-webkit-scrollbar': {
        display: 'none'  /* Safari and Chrome */
      },
      '.singleTaskContainer': {
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.6536057692307692) 85%)',
      },
      '.tasks-modal-content, .titleContainer, .taskContainer, .titleContainer, .hat-modal-content': {
        fontFamily: 'Abril Fatface !important',
        color: '#2e2f47 !important',
      },
      '#titleContainer, .singleColumnContainer': {
        fontFamily: 'Abril Fatface !important',
        color: '#2e2f47 !important',
      },
      '.currBar': {
        backgroundColor: 'rgba(80,182,171)',
        padding: '3px',
      }

      // =============================
      // tasks
      // =============================
    },
  //   'section#chakra-modal-:r1': {
  //     width: '70% !important',
  //   },
  },
};
const theme = extendTheme(overrides);

export default theme;