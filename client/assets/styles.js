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
        height: '100%',
      },
      '.planetsWindow': {
        marginTop: '10px',
        height: '1550px',
        width: '5120px'
      },
      // '.divInPlanetComponent': {
      //   // marginTop: '10px',
      //   // height: '550px',
      //   // width: '1120px'
      // },
      // '.transformWrapper': {
      //   marginTop: '10px',
      //   height: '100%',
      //   width: '100%'
      // },
      // '.transformComponent': {
      //   width: '100%'
      // },
      '.zero, .zero2, .zero3, .zero4, .pinktopia, .pinktopia2, .pinktopia3, .pinktopia4, .pokitaru, .pokitaru2, .pokitaru3, .pokitaru4, .steins, .steins2, .steins3, .steins4, .lava, .lava2, .lava3, .lava4, .haku, .haku2, .haku3, .haku4, .chihiro, .chihiro2, .chihiro3, .chihiro4, .calcifer, .calcifer2, .calcifer3, .calcifer4, .athea, .athea2, .athea3, .athea4, .polaris, .polaris2, .polaris3, .polaris4, .zeroAlso': {
        // '-webkit-filter': 'drop-shadow(5px 5px 5px #222)',
        // filter: 'drop-shadow(5px 5px 5px #222)',
        height: '50px',
        position: 'absolute'
      },
      '.ZERO, .PISCES, .CORBIN, .JADE, .PINKTOPIA, .TARUS, .MARSHALL, .AUSTIN, .POKITARU, .CAPRICORN, .JEROME, .IBRAHEEM, .STEINS, .VIRGO, .IZZI, .ALGO, .LAVA, .LEO, .BOOLEAN, .FLOWER, .HAKU, .SCORPIO, .XUTIS, .PEACH, .CHIHIRO, .REDUX, .APPLE, .VION, .CALCIFER, .FINN, .BLADE, .NEON, .ATHEA, .LOLLIPOP, .MEI, .LUNAR, .POLARIS, .PETER, .ZORIX, .SCAR, .TAURUS': {
        position: 'absolute',
        fontSize: '10px',
        fontColor: 'black',
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
        marginTop: '1.75%',
        marginLeft: '8.59%'
      },
      '.ZERO': {
        marginTop: '2.73%',
        marginLeft: '8.78%'
      },
      '.zero2': {
        marginTop: '8.98%',
        marginLeft: '16.59%'
      },
      '.PISCES': {
        marginTop: '5.66%',
        marginLeft: '16.73%'
      },
      '.zero3': {
        marginTop: '5.66%',
        marginLeft: '8.39%'
      },
      '.CORBIN': {
        marginTop: '6.637%',
        marginLeft: '8.49%'
      },
      '.zero4': {
        marginTop: '1.95%',
        marginLeft: '12.689%'
      },
      '.JADE': {
        marginTop: '2.928%',
        marginLeft: '12.885%'
      },
      '.pinktopia': {
        marginTop: '0.976%',
        marginLeft: '0.976%'
      },
      '.PINKTOPIA': {
        marginTop: '1.95%',
        marginLeft: '0.937%'
      },
      '.pinktopia2': {
        marginTop: '0.39%',
        marginLeft: '17.57%'
      },
      '.TAURUS': {
        marginTop: '1.366%',
        marginLeft: '17.629%'
      },
      '.pinktopia3': {
        marginTop: '7.416%',
        marginLeft: '3.9%'
      },
      '.MARSHALL': {
        marginTop: '8.394%',
        marginLeft: '3.865%'
      },
      '.pinktopia4': {
        marginTop: '7.418%',
        marginLeft: '15.2277%'
      },
      '.AUSTIN': {
        marginTop: '8.39%',
        marginLeft: '15.325%'
      },
      '.pokitaru': {
        marginTop: '0.234%',
        marginLeft: '3.9%'
      },
      '.POKITARU': {
        marginTop: '1.2%',
        marginLeft: '3.9%'
      },
      '.pokitaru2': {
        marginTop: '3.318%',
        marginLeft: '17.765%'
      },
      '.CAPRICORN': {
        marginTop: '4.295%',
        marginLeft: '17.687%'
      },
      '.pokitaru3': {
        marginTop: '0.39%',
        marginLeft: '8.785%'
      },
      '.JEROME': {
        marginTop: '1.347%',
        marginLeft: '8.84%'
      },
      '.pokitaru4': {
        marginTop: '8.785%',
        marginLeft: '7.418%'
      },
      '.IBRAHEEM': {
        marginTop: '9.76%',
        marginLeft: '7.399%'
      },
      '.steins': {
        marginTop: '4.88%',
        marginLeft: '0.976%'
      },
      '.STEINS': {
        marginTop: '5.8569%',
        marginLeft: '1.073%'
      },
      '.steins2': {
        marginTop: '5.466%',
        marginLeft: '16.59%'
      },
      '.VIRGO': {
        marginTop: '6.4425%',
        marginLeft: '16.7505%'
      },
      '.steins3': {
        marginTop: '0.39%',
        marginLeft: '14.64%'
      },
      '.IZZI': {
        marginTop: '1.366%',
        marginLeft: '14.915%'
      },
      '.steins4': {
        marginTop: '2.34%',
        marginLeft: '10.737%'
      },
      '.ALGO': {
        marginTop: '3.318%',
        marginLeft: '10.93%'
      },
      '.lava': {
        height: '65px',
        marginTop: '6.83%',
        marginLeft: '18.156%'
      },
      '.LAVA': {
        marginTop: '7.9%',
        marginLeft: '18.546%'
      },
      '.lava2': {
        height: '65px',
        marginTop: '2.73%',
        marginLeft: '4.685%'
      },
      '.LEO': {
        marginTop: '3.8%',
        marginLeft: '5.134%'
      },
      '.lava3': {
        height: '65px',
        marginTop: '6.44%',
        marginLeft: '10.7375%'
      },
      '.BOOLEAN': {
        marginTop: '7.477%',
        marginLeft: '10.89%'
      },
      '.lava4': {
        height: '65px',
        marginTop: '6.4425%',
        marginLeft: '1.171%'
      },
      '.FLOWER': {
        marginTop: '7.516%',
        marginLeft: '1.366%'
      },
      '.haku': {
        marginTop: '8.16%',
        marginLeft: '1.95%'
      },
      '.HAKU': {
        marginTop: '9.1366%',
        marginLeft: '2.1279%'
      },
      '.haku2': {
        marginTop: '6.83%',
        marginLeft: '13.1778%'
      },
      '.SCORPIO': {
        marginTop: '7.8%',
        marginLeft: '13.236%'
      },
      '.haku3': {
        marginTop: '0.976%',
        marginLeft: '5.8568%'
      },
      '.XUTIS': {
        marginTop: '1.95%',
        marginLeft: '6.0325%'
      },
      '.haku4': {
        marginTop: '5.66%',
        marginLeft: '5.466%'
      },
      '.PEACH': {
        marginTop: '6.637%',
        marginLeft: '5.6%'
      },
      '.chihiro': {
        marginTop: '1.95%',
        marginLeft: '15.13%'
      },
      '.CHIHIRO': {
        marginTop: '2.928%',
        marginLeft: '15.169%'
      },
      '.chihiro2': {
        marginTop: '4.295%',
        marginLeft: '6.8329%'
      },
      '.REDUX': {
        marginTop: '5.27%',
        marginLeft: '6.969%'
      },
      '.chihiro3': {
        marginTop: '2.34%',
        marginLeft: '2.34%'
      },
      '.APPLE': {
        marginTop: '3.3188%',
        marginLeft: '2.498%'
      },
      '.chihiro4': {
        marginTop: '8.785%',
        marginLeft: '11.32%'
      },
      '.VION': {
        marginTop: '9.76%',
        marginLeft: '11.557%'
      },
      '.calcifer': {
        marginTop: '8.1995%',
        marginLeft: '9.566%'
      },
      '.CALCIFER': {
        marginTop: '9.1756%',
        marginLeft: '9.566%'
      },
      '.calcifer2': {
        marginTop: '3.9%',
        marginLeft: '12.885%'
      },
      '.FINN': {
        marginTop: '4.88%',
        marginLeft: '13.099%'
      },
      '.calcifer3': {
        marginTop: '8.98%',
        marginLeft: '4.295%'
      },
      '.BLADE': {
        marginTop: '9.956$',
        marginLeft: '4.4316%'
      },
      '.calcifer4': {
        marginTop: '3.514%',
        marginLeft: '8.59%'
      },
      '.NEON': {
        marginTop: '4.49%',
        marginLeft: '8.785%'
      },
      '.athea': {
        height: '90px',
        marginTop: '6.8329%',
        marginLeft: '5.8568%'
      },
      '.ATHEA': {
        marginTop: '8.16%',
        marginLeft: '6.34488%'
      },
      '.athea2': {
        height: '90px',
        marginTop: '0.195%',
        marginLeft: '11.32%'
      },
      '.LOLLIPOP': {
        marginTop: '1.5227%',
        marginLeft: '11.71%'
      },
      '.athea3': {
        height: '90px',
        marginTop: '8.785%',
        marginLeft: '13.275%'
      },
      '.MEI': {
        marginTop: '10.1518%',
        marginLeft: '13.95875%'
      },
      '.athea4': {
        height: '90px',
        marginTop: '4.88%',
        marginLeft: '14.056%'
      },
      '.LUNAR': {
        marginTop: '6.247%',
        marginLeft: '14.58%'
      },
      '.polaris': {
        marginTop: '5.466%',
        marginLeft: '3.514%'
      },
      '.POLARIS': {
        marginTop: '6.4425%',
        marginLeft: '3.572%'
      },
      '.polaris2': {
        marginTop: '4.49%',
        marginLeft: '10.054%'
      },
      '.PETER': {
        marginTop: '5.466%',
        marginLeft: '10.21%'
      },
      '.polaris3': {
        marginTop: '3.9%',
        marginLeft: '15.2277%'
      },
      '.ZORIX': {
        marginTop: '4.88%',
        marginLeft: '15.3839%'
      },
      '.polaris4': {
        marginTop: '3.709%',
        marginLeft: '2.928%'
      },
      '.SCAR': {
        marginTop: '4.685%',
        marginLeft: '3.1236%'
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
      //-------------------------------HAT MODAL
      '#hat-div': {
        display: 'grid',
        gridTemplateRows: '1fr 5fr 1fr',
        position: 'absolute',
        width: '60%',
        height: '40%',
        top: '30%',
        right: '18%',
        color: '#c7e4e9',
        backgroundColor: 'cadetblue',
        borderRadius: '12px'
      },
      '#confirm-hat': {
        height: '70%',
        width: '25%',
        textAlign: 'center',
        backgroundColor: '#2626a3',
        borderRadius: '10px',
        border: '1px solid white',
        gridRow: 3,
        justifySelf: 'center'
      },
      '.hat-list-icon': {
        height: '20px',
        width: '20px'
      },
      //-------------------------------SIDE MENU
      '.menu-side-container': {
        width: '70%',
        height: '85%',
        border: '2px solid #50b6ab',
        backgroundColor: '#2e2f47',
        borderRadius: '15px'
      },
      '.pl-acc': {
        backgroundColor: '#41437e',
        borderRadius: '10px',

      },
      '.player-list': {
        width:'100%',
        padding: '5%',
        backgroundColor: 'white'
      },
      '.p-list-icon': {
        fontSize: '250%',
        margin: '2px'
      },
      'p-list-smIcon': {
        fontSize: '50%'
      },
      //---------------------------------SIDE MENU / LOWER TOOLBAR
      '#total-stat': {
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr 1fr'
      },
      '.stat-icon': {
        fontSize: '1.6em'
      },
      '#t-stat1': {
        gridColumn: 1,
        gridRow: 1
      },
      '#t-stat2': {
        gridColumn: 1,
        gridRow: 2
      },
      '#t-stat3': {
        gridColumn: 2,
        gridRow: 1
      },
      '#t-stat4': {
        gridColumn: 2,
        gridRow: 2
      },
      //--------------------------------- LOWER TOOLBAR
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
      '.create-galaxy-icons:hover, .galaxy-size-unselected': {
        cursor: 'pointer'
      },
      '.alliance-switch': {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        width: '85px'
      },
      '.username-input, .enter-existing-galaxy-input': {
        width: '200px',
        fontFamily: 'Abril Fatface',
        size: '20px',
        textAlign: 'center',
        borderRadius: '4px',
        border:'2px solid #2e2f47',
        height: '37px',
        margin: '15px 0px'
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

      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;