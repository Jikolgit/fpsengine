import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { GameApp } from '../components/GameApp'
import { createLevel, createObject } from '../components/gameMap'
import { Canvas } from '@react-three/fiber';
import { CreditScreen, GameController, GameEndingScreen, GameNotif, GameOverScreen, GameLoadingScreen, GameUI, LifeBar, OptionScreen, PauseIcon, PauseScreen, ActionIcon, PlayerMoney, StoryScreen, TitleScreen, ToggleTouchScreen, ScreenHalo, GameTimer, ScoreVue, LevelUi } from '../components/GameUI';
import { AudioManage } from '../components/audioComponents';
import { decryptData, deleteCookie, encryptData, getCookieFunc } from '../components/utils';

import { Settings } from '../components/Setting';
import { storyText } from '../components/gameStory';

//MODELISER BOULE DE FEU
export let appContext = createContext(null)
function App() {

  let devMode = useRef(false);
  let helpMode = useRef(true);
  let level = useRef(9);
  let mapHeight = useRef(19);
  let mapWidth = useRef(16);
  let playerPosition = useRef(5)
  let gameMap = useRef(createLevel(level.current,mapWidth.current,mapHeight.current));
  let playerLifeContainerRef = useRef(null);
  let playerMoneyContainerRef = useRef(null);
  let lifeBarFunc = useRef(null);
  let gameNotifFunc = useRef(null);
  let gamePause = useRef(false);
  let setMapWall = useRef(false);
  let gameControllerVisible = useRef(true);
  let actionIconVisible = useRef(false);
  let soundOn = useRef(true);
  let gameOverScreenFunc = useRef(null);
  let gameControllerFunc = useRef(null);
  let actionIconController = useRef(null);
  let gameEndingScreenFunc = useRef(null);
  let mobCallBackAfterPlayerMove = useRef(null);
  const PauseScreenController = useRef(null);
  const GameUIController = useRef(null);
  const HelpScreenFunc = useRef(null);
  const StoryScreenController = useRef(null);
  const KeyBoardManageStory = useRef(null);
  const ScreenHaloCOntroller = useRef(null);
  const BlackScreenTransitionController = useRef(null);
  const ScoreVueController = useRef(null);
  let transitionBetweenScreen = useRef(false);
  let [gameVueActive,setGameVueActive] = useState(false);
  let [gameUIVueActive,setGameUIVueActive] = useState(false);
  let actualGameScreen = useRef('TITLE-SCREEN'); //GAME-SCREEN TITLE-SCREEN HELP-SCREEN  STORY-SCREEN PAUSE-SCREEN GAME-OVER-SCREEN pour le clavier
  let [screen,setScreen] = useState('TITLE'); //GAME LOADING-SCREEN TITLE OPTION CREDIT GAME-OVER


  let touchEventMFunc = useRef({left:null,right:null,up:null,down:null,center:null,turnLeft:null,turnRight:null});
  let touchEventTouchEndFunc = useRef({left:null,right:null,up:null,down:null,center:null,turnLeft:null,turnRight:null});
  let actionButtonRef = useRef(null);
  let GameLoadingScreenRef = useRef(null);
  let playerLifeUpgradeCost = useRef({value:20,level:1});
  let playerWeaponUpgradeCost = useRef({value:20,level:1});
  let playerStats = useRef({score:0,life:5,maxLife:5,moveSpeed:0.1,shootInterval:50,shootPower:1,keyCollected:0,mobKilled:0,coinCollected:0,showWeapon:false});
  let levelInfo = useRef({_KeyNumber:0,_MobToKillNumber:0,timerSecond:0,timerMinute:0,fogColor:'#000000',fogNear:3,fogFar:20,finalLevel:false});
  let saveDataOrder = useRef([level.current,playerStats.current.coinCollected,playerStats.current.score,playerStats.current.life,playerStats.current.maxLife,
    playerStats.current.shootInterval,playerStats.current.shootPower,playerLifeUpgradeCost.current.value,playerLifeUpgradeCost.current.level,
    playerWeaponUpgradeCost.current.value,playerWeaponUpgradeCost.current.level])

  /**
   * 
   * @param {number[]} args 
   */
  let saveGame = (args)=>
    {
      /**
       * @type {string}
       */
      saveDataOrder.current = [level.current,playerStats.current.coinCollected,playerStats.current.score,playerStats.current.life,playerStats.current.maxLife,
        playerStats.current.shootInterval,playerStats.current.shootPower,playerLifeUpgradeCost.current.value,playerLifeUpgradeCost.current.level,
        playerWeaponUpgradeCost.current.value,playerWeaponUpgradeCost.current.level]
      let dataToSave='';
      
      for(let i = 0;i<saveDataOrder.current.length;i++)
      { 
        dataToSave += saveDataOrder.current[i].toString();
        if(i<saveDataOrder.current.length-1){dataToSave += '-'}
      }

      //2,5,8
      encryptData(dataToSave)
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
        let saveData = '';
        for(let i =0;i<saveString.length;i++)
        {
            if(saveString[i]=='-')
            {
                
                saveDataOrder.current[saveStep] = saveData;
                saveData = '';
                saveStep ++;
            }
            else
            {
              saveData += saveString[i]
              
            }
            // if(saveStep ==0)
            // {
            //   if(saveString[i]!='-')
            //   {
            //     levelValueArr.push(saveString[i])
            //   }
            //   else
            //   {
            //     saveStep ++;
            //   }
            // }
            // else if(saveStep ==1)
            // {
            //   if(saveString[i]!='-')
            //   {
            //     playerLifeValueArr.push(saveString[i]);
            //   }
            //   else
            //   {
            //     saveStep ++;
            //   }
            // }
            // else if(saveStep ==2)
            // {
            //   playerCoinValueArr.push(saveString[i]);
            // }
        }
        // console.log(saveDataOrder.current)
        // levelValue = levelValueArr.join('')
        // playerLifeValue = playerLifeValueArr.join('')
        // playerCoinValue = playerCoinValueArr.join('')
        
        level.current = parseInt(saveDataOrder.current[0]) ;
        playerStats.current.coinCollected = parseInt(saveDataOrder.current[1]) ;
        playerStats.current.score = parseInt(saveDataOrder.current[2]) ;
        playerStats.current.life =  parseInt(saveDataOrder.current[3]) ;
        playerStats.current.maxLife = parseInt(saveDataOrder.current[4]) ;
        playerStats.current.shootInterval = parseInt(saveDataOrder.current[5]) ;
        playerStats.current.shootPower =  parseInt(saveDataOrder.current[6]) ;
        playerLifeUpgradeCost.current.value = parseInt(saveDataOrder.current[7]) ;
        playerLifeUpgradeCost.current.level =parseInt(saveDataOrder.current[8]) ;
        playerWeaponUpgradeCost.current.value = parseInt(saveDataOrder.current[9]) ;
        playerWeaponUpgradeCost.current.level =parseInt(saveDataOrder.current[10]) ;
        
      }
    }
  let upgradePlayerState = (args)=>
    {
      if(args == 'LIFE')
      {
        if(playerStats.current.coinCollected>=playerLifeUpgradeCost.current.value)
        {
          AudioManage.play('click')
          playerStats.current.coinCollected = playerStats.current.coinCollected - playerLifeUpgradeCost.current.value;
          playerStats.current.maxLife ++;
          playerStats.current.life = playerStats.current.maxLife;
          playerLifeUpgradeCost.current.value += 10;
          playerLifeUpgradeCost.current.level += 1;
          saveGame()
        }
        else
        {
          AudioManage.play('click-Error')
          // console.log('not enough money')
        }
      }
      else if(args == 'WEAPON')
      {
        if(playerStats.current.coinCollected>=playerWeaponUpgradeCost.current.value)
        {
          AudioManage.play('click')
          playerStats.current.coinCollected = playerStats.current.coinCollected - playerWeaponUpgradeCost.current.value;
          playerStats.current.shootPower ++;
          playerStats.current.shootInterval -=2;
          playerWeaponUpgradeCost.current.value += 10;
          playerWeaponUpgradeCost.current.level += 1;
          saveGame()
        }
        else
        {
          AudioManage.play('click-Error')
          // console.log('not enough money')
        }
      }
    }
  let startGame = ()=>
      {
        
        AudioManage.play('click');
        AudioManage.playAmbient('play');
        actualGameScreen.current = 'LOADING-SCREEN'
        GameUIController.current({arg1:'SWITCH-TO',arg2:'LOADING-SCREEN'});
        // setGameVueActive(c => c = true);
        

        
      }
  let nextLevel = ()=>
      {
        storyText.value = ['none']
        level.current ++;
        if(!transitionBetweenScreen.current){ setGameVueActive(c => c = false);}
        // setGameVueActive(c => c = false);
        actualGameScreen.current = 'LOADING-SCREEN'
        GameUIController.current({arg1:'SWITCH-TO',arg2:'LOADING-SCREEN'});
        saveGame(saveDataOrder.current)
        
        
      }
  let setGameOver = ()=>
      {
        // gameOverScreenFunc.current();
        GameUIController.current({arg1:'SWITCH-TO',arg2:'GAME_OVER-SCREEN'});
        gamePause.current = true;
        AudioManage.playAmbient('stop')
      }

  let quitGame = (args)=>
    {
      AudioManage.play('click');
      AudioManage.playAmbient('stop')

      playerStats.current.life =  structuredClone(playerStats.current.maxLife);
      playerStats.current.keyCollected = 0
      playerStats.current.mobKilled = 0
      if(args == 'RESTART-GAME-OVER')
      {
        level.current = 1;
      }
      else if(args == 'RESTART-GAME-FINISHED')
      {
        level.current = 1;
      }
      else if(args == 'NO-RESTART')
      {

      }
      saveGame()
      gamePause.current = false;
      setGameVueActive(false)
      GameUIController.current({arg1:'DIRECT',arg2:'TITLE-SCREEN'})
      
      
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
        GameUIController.current({arg1:'DIRECT',arg2:state?'PAUSE-SCREEN':'NO-SCREEN'})

        
        
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
    
    let toggleActionIcon = (args) =>
      {
        if(args == 'INTERACT')
        {
          gameControllerFunc.current('INTERACT-ICON')
          actionIconController.current('INTERACT')
        }
        else if(args == 'SHOOT')
        {
          gameControllerFunc.current('SHOOT-ICON')
          actionIconController.current('SHOOT')
        }
        

      }
      // findGameSave();
    useEffect(()=>
      {
        // saveGame(saveDataOrder.current)
        
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
                touchEventTouchEndFunc,actionButtonRef,level,GameLoadingScreenRef,nextLevel,gameMap,levelInfo,lifeBarFunc,gameNotifFunc,
                soundOn,StoryScreenController,startGame,KeyBoardManageStory,systemPause,backMenu,appController,gameUIVueActive,setGameUIVueActive,
                GameUIController,setGameVueActive,mapWidth,mapHeight,actionIconVisible,actionIconController,ScreenHaloCOntroller,toggleActionIcon,
                BlackScreenTransitionController,transitionBetweenScreen,ScoreVueController,playerLifeUpgradeCost,playerWeaponUpgradeCost,upgradePlayerState,
                playerPosition,setMapWall,mobCallBackAfterPlayerMove}}
      >
          <div 
              // style={{backgroundColor:levelInfo.current.fogColor}}
              className={`bg-black font-times absolute max-w-[700px] left-[0] right-[0] mx-auto  w-full font-gun
                          md1:h-[100%] md1:max-h-[700px] h-[500px] select-none `}
          >
            <Canvas>
            {gameVueActive && <GameApp />}
            </Canvas>
            {gameVueActive && <ScreenHalo /> }
            {gameVueActive && <ActionIcon/>}
            {gameVueActive && <PauseIcon />}
            {gameVueActive && <GameController />}
            {gameVueActive && <GameNotif />}
            {gameVueActive && <PlayerMoney /> }
            {gameVueActive && <GameTimer />}
            {gameVueActive && <ScoreVue />} 
            {gameVueActive && <LevelUi />} 
            {gameVueActive && <LifeBar life={playerStats.current.life} maxLife={playerStats.current.maxLife} /> }

            <GameUI />
            <Settings />

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