import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { GameApp } from '../components/GameApp'
import { createLevel, createObject } from '../components/gameMap'
import { Canvas } from '@react-three/fiber';
import { CreditScreen, GameController, GameEndingScreen, GameNotif, GameOverScreen, GameScreenTransition, GameUI, LifeBar, OptionScreen, PauseIcon, PauseScreen, ActionIcon, PlayerMoney, StoryScreen, TitleScreen, ToggleTouchScreen } from '../components/GameUI';
import { AudioManage } from '../components/audioComponents';
import { decryptData, deleteCookie, encryptData, getCookieFunc } from '../components/utils';
import { AddDecor, AddDoor, AddMob, AddItem, UpdateLevelConfig, UpdatePlayerStat, AddWall, AddWeapon, UpdateStroryScreen } from '../components/DefaultComponents';


export let appContext = createContext(null)
function App() {

  let devMode = useRef(false);
  let helpMode = useRef(true);
  let level = useRef(1);
  let mapHeight = 19;
  let mapWidth = 16;
  let gameMap = createLevel(level.current);
  let playerLifeContainerRef = useRef(null);
  let playerMoneyContainerRef = useRef(null);
  let lifeBarFunc = useRef(null);
  let gameNotifFunc = useRef(null);
  let gamePause = useRef(false);
  let gameControllerVisible = useRef(true);
  let actionIconVisible = useRef(false);
  let soundOn = useRef(true);
  let gameOverScreenFunc = useRef(null);
  let gameControllerFunc = useRef(null);
  let actionIconController = useRef(null);
  let gameEndingScreenFunc = useRef(null);
  const PauseScreenController = useRef(null);
  const GameUIController = useRef(null);
  const HelpScreenFunc = useRef(null);
  const StoryScreenController = useRef(null);
  const KeyBoardManageStory = useRef(null);
  
  let [gameVueActive,setGameVueActive] = useState(false);
  let [gameUIVueActive,setGameUIVueActive] = useState(false);
  let actualGameScreen = useRef('TITLE-SCREEN'); //GAME-SCREEN TITLE-SCREEN HELP-SCREEN  STORY-SCREEN PAUSE-SCREEN GAME-OVER-SCREEN pour le clavier
  let [screen,setScreen] = useState('TITLE'); //GAME LOADING-SCREEN TITLE OPTION CREDIT GAME-OVER


  let touchEventMFunc = useRef({left:null,right:null,up:null,down:null,center:null,turnLeft:null,turnRight:null});
  let touchEventTouchEndFunc = useRef({left:null,right:null,up:null,down:null,center:null,turnLeft:null,turnRight:null});
  let actionButtonRef = useRef(null);
  let GameScreenTransitionRef = useRef(null);
  let playerStats = useRef({life:5,maxLife:5,moveSpeed:0.1,keyCollected:0,mobKilled:0,coinCollected:0,showWeapon:false});
  let levelInfo = useRef({_KeyNumber:0,_MobToKillNumber:0,fogColor:'#5394ac',fogNear:0.1,fogFar:0});

  let saveGame = ()=>
    {
      let createdSave = null;
      createdSave = level.current.toString()+'-'+playerStats.current.life.toString()+'-'+playerStats.current.coinCollected.toString();
      //2,5,8
      encryptData(createdSave)
    }
  let deleteGameSave = ()=>
    {
      deleteCookie('DW_SAVE')
    }
  let findGameSave = ()=>
    {
      let save = getCookieFunc('DW_SAVE');
      if(save == 'empty')
      {

      }
      else
      {
        let saveString = decryptData(save);
        let levelValueArr=[] ,playerLifeValueArr =[] ,playerCoinValueArr=[] ;
        let levelValue,playerLifeValue,playerCoinValue;
        let saveStep =0;
        for(let i =0;i<saveString.length;i++)
        {
            if(saveStep ==0)
            {
              if(saveString[i]!='-')
              {
                levelValueArr.push(saveString[i])
              }
              else
              {
                saveStep ++;
              }
            }
            else if(saveStep ==1)
            {
              if(saveString[i]!='-')
              {
                playerLifeValueArr.push(saveString[i]);
              }
              else
              {
                saveStep ++;
              }
            }
            else if(saveStep ==2)
            {
              playerCoinValueArr.push(saveString[i]);
            }
        }
        levelValue = levelValueArr.join('')
        playerLifeValue = playerLifeValueArr.join('')
        playerCoinValue = playerCoinValueArr.join('')
        level.current = parseInt(levelValue) ;
        playerStats.current.life =  parseInt(playerLifeValue) ;
        playerStats.current.coinCollected = parseInt(playerCoinValue) ;
      }
    }
  let startGame = ()=>
      {
        AudioManage.play('click');
        AudioManage.playAmbient('play');
        actualGameScreen.current = 'LOADING-SCREEN'
        GameUIController.current({arg1:'SWITCH-TO',arg2:'LOADING-SCREEN'});
        setGameVueActive(c => c = true);
        

        
      }
  let nextLevel = ()=>
      {
        
        level.current ++;
        
        setGameVueActive(c => c = false);
        actualGameScreen.current = 'LOADING-SCREEN'
        GameUIController.current({arg1:'SWITCH-TO',arg2:'LOADING-SCREEN'});
        saveGame();
        window.setTimeout(()=>{setGameVueActive(c => c = true);},1)
        
      }
  let setGameOver = ()=>
      {
        // gameOverScreenFunc.current();
        GameUIController.current({arg1:'SWITCH-TO',arg2:'GAME_OVER-SCREEN'});
        gamePause.current = true;
        AudioManage.playAmbient('stop')
      }
  let restartLevel = ()=>
      {
        playerStats.current = {life:5,maxLife:5,moveSpeed:0.1,keyCollected:0,mobKilled:0,coinCollected:0};
        AudioManage.play('click')
        level.current = 1;
        setScreen(c => c = 'LOADING-SCREEN')
        window.setTimeout(()=>{setScreen(c => c = 'GAME');gamePause.current = false;actualGameScreen.current = 'GAME-SCREEN'},1000)
      }
  let quitGame = (args)=>
    {
      AudioManage.play('click');
      AudioManage.playAmbient('stop')
      if(args == 'RESTART-GAME-OVER')
      {
        playerStats.current = {life:5,maxLife:5,moveSpeed:0.1,keyCollected:0,mobKilled:0,coinCollected:0};
        level.current = 1;
      }
      else if(args == 'RESTART-GAME-FINISHED')
      {
        playerStats.current.life = 5
        playerStats.current.keyCollected = 0
        playerStats.current.mobKilled = 0
        level.current = 1;
      }
      saveGame()
      gamePause.current = false;
      setGameVueActive(false)
      GameUIController.current({arg1:'SWITCH-TO',arg2:'TITLE-SCREEN'})
      
      
    }
  let backMenu = (_to)=>
      {
        AudioManage.play('click');
        setScreen(_to)
      }
  let setPause = (state)=>
    {  
        AudioManage.play('click')
        systemPause(state)
        AudioManage.playAmbient(state?'pause':'play');
        actualGameScreen.current = state? 'PAUSE-SCREEN' : 'GAME-SCREEN';
        // PauseScreenController.current();
        GameUIController.current({arg1:'SWITCH-TO',arg2:state?'PAUSE-SCREEN':'NO-SCREEN'})

        
        
    }

    let systemPause = (state)=>
      {
        //PAUSE DANS LE JEUX
        gamePause.current = state
      }
    let manageVisibility = ()=>
      {
          if(document.hidden)
          { 
            
            if(actualGameScreen.current == 'GAME-SCREEN')
            {
              
              AudioManage.playAmbient('pause');
              systemPause(true)
              actualGameScreen.current = gamePause.current? 'PAUSE-SCREEN' : 'GAME-SCREEN';
              PauseScreenController.current();
            }
            
          } 
          else 
          {
            
          }
      }

    let appController = (args)=>
      {
        if(args == 'START-GAME')
        {
            startGame();
        }
        else if(args == 'QUIT-GAME')
        {

        }
      }
    useEffect(()=>
      {
        // if(!gameVueActive && actualGameScreen.current == 'LOADING-SCREEN')
        // {
        //   setGameVueActive(c => c = true);
        // }
      },[])
    useEffect(() => {

      document.addEventListener('visibilitychange',manageVisibility,true)
      return()=>{document.removeEventListener('visibilitychange',manageVisibility,true)}
    }, []);
  return (
    <>
      <appContext.Provider
        value={{playerLifeContainerRef,playerMoneyContainerRef,touchEventMFunc,playerStats,devMode,gamePause,PauseScreenController,setPause,HelpScreenFunc,
                actualGameScreen,helpMode,gameControllerFunc,gameControllerVisible,setScreen,quitGame,gameOverScreenFunc,setGameOver,gameEndingScreenFunc,
                touchEventTouchEndFunc,actionButtonRef,level,GameScreenTransitionRef,nextLevel,restartLevel,gameMap,levelInfo,lifeBarFunc,gameNotifFunc,
                soundOn,StoryScreenController,startGame,KeyBoardManageStory,systemPause,backMenu,appController,gameUIVueActive,setGameUIVueActive,
                GameUIController,setGameVueActive,mapWidth,mapHeight,actionIconVisible,actionIconController}}
      >
          <div 
              // style={{backgroundColor:levelInfo.current.fogColor}}
              className={`bg-black font-times absolute max-w-[700px] left-[0] right-[0] mx-auto  w-full font-gun
                          md1:h-[100%] md1:max-h-[700px] h-[500px] select-none `}
          >
            <Canvas>
            {gameVueActive && <GameApp />}
            </Canvas>
            {gameVueActive && <ActionIcon/>}
            {gameVueActive && <PauseIcon />}
            {gameVueActive && <GameController />}
            {gameVueActive && <GameNotif />}
            {/* {gameVueActive && <ToggleTouchScreen />} */}
            {gameVueActive && <PlayerMoney /> }
            {gameVueActive && <LifeBar life={playerStats.current.life} maxLife={playerStats.current.maxLife} /> }

            <GameUI />
            <GameConfig />

            {/* <HelpScreen /> */}
            
            {/* {screen == 'GAME' && <div
                ref={playerLifeContainerRef}
                className='w-[50px] h-[50px] border-red-500 border-[2px] z-[2]
                            absolute top-[0] left-[0] text-white text-[2rem] ' 
            ></div>} */}
            
            
            {/* {screen == 'GAME' && <div
                
                className='w-[50px] h-[50px] z-[2]
                            absolute top-[10px] left-[0] right-[0] mx-auto text-white text-[2rem] ' 
            >{level.current}</div>} */}
            
            
           
          </div>
          
      </appContext.Provider>
    </>
  )
}
function GameConfig()
{ 
  // ALL LEVEL START WITH A VIRGIN MAP
  // HERE YOU CAN ADD OBJECT ON THE MAP
  // UPDATE THE LEVEL CONFIG
  // *WIN CONDITION
  // *
  // YOU CAN UPDATE PLAYER STATE
  // *LIFE
  // *MONEY
  // *MOVE SPEED
  // *BULLET SPEED
  // CHNAGER LE NOM POUR UpdateLevelConfig OU GAMEOPTION
  // AJOUTER UN COMPOSANT QUI PERMET DE VOIR OU NON LA BARE DES MOB
  const AppCntext = useContext(appContext);
  
  return(
          <>
              {AppCntext.level.current == 1 &&
                <>
                    <UpdateStroryScreen>
                        <div className="">Text 1</div>
                        <div className="">Text 2</div>
                        <div className="">Text 3</div>
                    </UpdateStroryScreen>
                    <UpdatePlayerStat life={2} moveSpeed={0.1} />
                    <AddDecor position={[45,66,192,147,126,187]} />
                    <AddDoor position={[295]} open  />
                </>
              }
              {AppCntext.level.current == 2 &&
                <>
                    <UpdateLevelConfig  mobToKill={2} />
                    <AddMob position={[146,94]} life={2} />
                    <AddDecor position={[45,66,192,147,126,187]} />
                    <AddDoor position={[295]}  />
                </>
              }
              {AppCntext.level.current == 3 &&
                <>
                    <UpdateStroryScreen>
                        <div className="">Text 3</div>
                    </UpdateStroryScreen>
                    <UpdateLevelConfig  mobToKill={8} />
                    <UpdatePlayerStat life={5} moveSpeed={0.1} />
                    {/* <AddItem name={'healItem'} position={[135]} value={1} /> */}
                    <AddMob position={[153,154,155,156]} life={5} active  />
                    <AddMob position={[149,148,147,146]} life={5} active />

                    <AddDoor position={[295]}  />
                </>
              }
              {AppCntext.level.current == 4 &&
                <>
                    <UpdateLevelConfig  mobToKill={14} />
                    <AddMob position={[119,136,153,170,187,204,221,238]} life={5} active  />
                    <AddMob position={[134,149,164,179,194,209]} life={5}  active />
                    <AddItem name={'healItem'} position={[183]} value={3} />
                    <AddDoor position={[295]}  />
                </>
              }
              {AppCntext.level.current == 5 &&
                <>
                    <UpdateStroryScreen>
                        <div className="">Niveau 5 part 1</div>
                        <div className="">Niveau 5 part 2</div>
                        <div className="">Niveau 5 part 3</div>
                        <div className="">Niveau 5 part 4</div>
                    </UpdateStroryScreen>
                    <UpdateLevelConfig  mobToKill={14} />
                    <AddMob position={[119,136,153,170,187,204,221,238]} life={5} active  />
                    <AddMob position={[134,149,164,179,194,209]} life={5}  active />
                    <AddMob position={[166,167,168]} life={5} active />
                    <AddItem name={'healItem'} position={[183]} value={3} />
                    <AddDoor position={[295]}  />
                </>
              }
          </> 
          
  );
}

export default App

//CAPACITE QUI FAIT QU'on AVERTI DU DANGER PAR DES FLECHES A L'ECRAN
// FAIRE DES UI POUR JEUX AVEC DES COULEUR CHANGEABLE
//CREER UNE FONCTION POUR
//-AJOUTER FACILEMENT DES NIVEAUX***************************************************************OK
//* LES OBJET PEUVENT AGIR DE 3 FACON SOIT AVEC LENVIRONNEMENT SOIT LE JOUEUR SOIT LES 2
//-CHANGER FACILEMENT LES MODELES ET LES TEXTURES
//-CHANGER FACILEMENT LES PARAMETRES COMME
//*VITESSE DE DEPLACEMENT**************************************************OK
//*NOMBRE DE TIRE POSSIBLE PAR MINUTE
//*FAIRE CLIGNOTER LES BOUTON DE LECRAN QUAND ON CLIQUE SUR LE CLAVIER
//*FAIRE DES ASSET DE DEMO UTILISABLE