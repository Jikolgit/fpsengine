import { useContext, useEffect, useRef, useState } from "react"
import { appContext } from "../src/App"
import { Html } from "@react-three/drei"
import { mobContext } from "./mob_2"
import { gameAppContext } from "./GameApp"
import { AudioManage } from "./audioComponents"
import { CustomCounter } from "./utils"
import { speechTimeline } from "./gameStory"

export function GameUI()
{
    const AppContext = useContext(appContext);
    const [actualUi,setActualUi] = useState('TITLE-SCREEN');
    let gameUIController = (args)=>
        {
            if(args.arg1 == 'SWITCH-TO')
            {
                if(args.arg2 == 'NO-SCREEN')
                {
                    setActualUi(c => c = null)
                }
                else
                {   
                    
                    setActualUi(c => c = args.arg2)
                }
                
            }
        }
    useEffect(()=>
        {
            AppContext.GameUIController.current = (args)=>{gameUIController(args)}
        },[])
    return(
            <>

                {actualUi == 'TITLE-SCREEN' && <TitleScreen />}
                {actualUi == 'OPTION-SCREEN' && <OptionScreen />}
                {actualUi == 'CREDIT-SCREEN' && <CreditScreen />}
                {actualUi == 'PAUSE-SCREEN' && <PauseScreen />}
                {actualUi == 'GAME_OVER-SCREEN' && <GameOverScreen />}
                {actualUi == 'ENDING-SCREEN' && <GameEndingScreen />}
                {actualUi == 'LOADING-SCREEN' && <GameScreenTransition />}
                {actualUi == 'STORY-SCREEN' && <StoryScreen />}
                 
            </>

            
    )
}
export function GameController()
{
    let _appContext = useContext(appContext);
    let [controllerVisible,setcontrollerVisible] = useState(_appContext.gameControllerVisible.current);
    _appContext.gameControllerFunc.current = ()=>
        {
            _appContext.gameControllerVisible.current = _appContext.gameControllerVisible.current? false : true;
            setcontrollerVisible(_appContext.gameControllerVisible.current);
        }
    return(
            <>
                {controllerVisible && 
                <div>
                        <div
                                className='w-[150px] h-[50px] 
                                flex justify-between  z-[2]
                                absolute bottom-[145px] left-[0] right-[0] mx-auto' 
                        >
                            <div
                            onTouchStart={()=>{_appContext.touchEventMFunc.current.turnLeft()}}
                            onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.turnLeft()}}
                            className='relative w-[30px] h-[30px] overflow-hidden 
                                        
                            ' 
                            >
                                
                                <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full "></div>
                                <img src='gameButton/turnLeft.png' alt="turnLeft" className="w-full h-full" />
                            </div>
                            <div id="UP"
                            onTouchStart={()=>{_appContext.touchEventMFunc.current.up()}}
                            onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.up()}}
                            className='relative w-[50px] h-[50px]
                            ' 
                            >
                                <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                <img src='gameButton/up.png' alt="up" className="w-full h-full" />
                            </div>
                            <div
                            onTouchStart={()=>{_appContext.touchEventMFunc.current.turnRight()}}
                            onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.turnRight()}}
                            className='w-[30px] h-[30px] overflow-hidden
                                        relative
                            ' 
                            >
                                <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                <img src='gameButton/turnRight.png' alt="turnRight" className="w-full h-full" />
                            </div>

                        </div>
                        
                        <div
                            
                            className='w-[200px] h-[50px] 
                                        flex justify-between z-[2]
                                        absolute bottom-[75px] left-[0] right-[0] mx-auto' 
                        >
                                <div id="LEFT"
                                onTouchStart={()=>{_appContext.touchEventMFunc.current.left()}}
                                onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.left()}}
                                className='w-[50px] h-[50px] relative
                                ' 
                                >
                                    <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                    <img src='gameButton/left.png' alt="left" className="w-full h-full" />
                                </div>
                                <div id="ACTION BUTTON"
                            
                                onTouchStart={()=>{_appContext.touchEventMFunc.current.center()}}
                                onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.center()}}
                                className='w-[50px] h-[50px] relative
                                ' 
                                >
                                    <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                    <img  ref={_appContext.actionButtonRef} src='gameButton/attack.png' alt="action" className="w-full h-full" />
                                </div>
                                <div id="RIGHT"
                                onTouchStart={()=>{_appContext.touchEventMFunc.current.right()}}
                                onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.right()}}
                                className='w-[50px] h-[50px] relative
                                ' 
                                >
                                    <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                    <img src='gameButton/right.png' alt="right" className="w-full h-full" />
                                </div>
                        </div>
                        <div
                            
                            className='w-[150px] h-[50px] 
                                        flex justify-center z-[2]
                                        absolute bottom-[5px] left-[0] right-[0] mx-auto' 
                        >
                                <div id="DOWN"
                                onTouchStart={()=>{_appContext.touchEventMFunc.current.down()}}
                                onTouchEnd={()=>{_appContext.touchEventTouchEndFunc.current.down()}}
                                className='w-[50px] h-[50px] relative
                                ' 
                                >
                                    <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full"></div>
                                    <img src='gameButton/down.png' alt="down" className="w-full h-full" />
                                </div>

                        </div>
                </div>
                }
              </>
              )
}

export function PauseIcon()
{
    let _appContext = useContext(appContext);


    return(
        <div
            onClick={()=>{_appContext.setPause(true);}}
            className=" w-[50px] h-[50px]  cursor-pointer z-[2]
                        absolute top-[10px] right-[10px] flex flex-col justify-center"
        >
            <img className="w-full mx-auto " src="n_button/btnPause.png" alt="PauseButton" />
            <svg
                className="block absolute left-[0] right-[0] m-auto top-[0] bottom-[0] w-[40px] h-[40px]   " 
             fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
            </svg>
        </div>
    )
}

export function PauseScreen()
{
    let _appContext = useContext(appContext)
    let [pauseScreenActive,setPauseScreenActive] = useState(false)
    let pauseDisplay = useRef(<div
        className={`select-none w-full h-full top-[0] left-[0] absolute z-[3] bg-black/80 text-white`}
    >
        <div className="text-center text-[2rem] ">PAUSE</div>

        <div>
            <div className=" text-center text-[1.3rem] text-white mt-[35px] max-w-[350px] mx-auto ">
                Use Arrow Keys <span className="text-yellow-500"> ← → ↑ ↓ </span> to move press <span className="text-yellow-500"> A </span> or <span className="text-yellow-500"> E </span> to
                turn <span className="text-yellow-500">SPACE</span> bar to interact
            </div>
            <div onClick={()=>{_appContext.setPause(false)}} 
                 className=" relative text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto text-white ">
                <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full "></div>
                <img src='n_button/btnContinue.png' alt="Continuer" className="w-full h-full" />
            </div>
            {/* <div onClick={()=>{_appContext.restartLevel() ;AudioManage.play('click');AudioManage.playAmbient('play')}} 
                 className=" text-center mt-[35px] cursor-pointer w-[150px] h-[50px] mx-auto bg-blue-500 text-white ">
                RESTART
            </div> */}
            <div   onClick={()=>{_appContext.quitGame('NO-RESTART') ;AudioManage.play('click');AudioManage.playAmbient('stop')}} 
                className=" relative text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto text-white ">
                <div id="GLASS" className="absolute left-[0] top-[0] z-[2] w-full h-full "></div>
                <img src='n_button/btnQuit.png' alt="Quitter" className="w-full h-full" />
            </div>
        </div>
    </div>);
    useEffect(()=>
        {
            _appContext.PauseScreenController.current = ()=>
            {
                if(_appContext.gamePause.current)
                {
                    setPauseScreenActive(true)
                }
                else
                {
                    setPauseScreenActive(false)
                }
            }
        },[])
    return(
            <div
                
            >
                {/* {pauseScreenActive && pauseDisplay.current} */}
                {pauseDisplay.current}
            </div>
    )
}

export function LifeBar(props)
{
    let _appContext = useContext(appContext)
    let lifeValue = (props.life*100) / props.maxLife;
    
    let lifeContainerRef = useRef(null);
    let updateLife = (_life)=>
        {
            lifeValue = (_life*100) / props.maxLife;
            lifeContainerRef.current.style.width = lifeValue+'%'
        }
    _appContext.lifeBarFunc.current = updateLife;
    useEffect(()=>
        {
            
        },[])
    return <div
                className={`bg-red-500 w-[150px] h-[25px]
                            absolute left-[10px] top-[10px]
                            flex flex-col justify-center
                            `}
            >
                    <div
                        className={` w-[95%] h-[80%] mx-auto bg-black `}
                    >
                        <div
                            ref={lifeContainerRef}
                            style={{ width: `${lifeValue}%`, backgroundImage: `linear-gradient(
                                90deg,
                                hsl(0deg 93% 46%) 0%,
                                hsl(16deg 100% 44%) 11%,
                                hsl(25deg 100% 44%) 22%,
                                hsl(33deg 100% 42%) 33%,
                                hsl(42deg 100% 40%) 44%,
                                hsl(52deg 100% 37%) 56%,
                                hsl(65deg 100% 36%) 67%,
                                hsl(78deg 100% 40%) 78%,
                                hsl(92deg 100% 43%) 89%,
                                hsl(124deg 93% 49%) 100%
                                )` }}
                            className={" transition-[width] duration-[500ms] h-full "}
                        ></div>
                    </div>
            </div>
}
export function GameScreenTransition() 
{
    let _appContext = useContext(appContext);
    
    return(
            <div
                ref={_appContext.GameScreenTransitionRef}
                className=" select-none absolute top-[0] left-[0] w-full h-full bg-black z-[9]"
            >
               <div
                    className="absolute right-[10px] bottom-[10px] text-white text-[2rem] "
               >
               CHARGEMENT...
               </div>
            </div>
    )
}

export function MobLifeBar(props)
{
    let _mobContext = useContext(mobContext)
    let mobLifeRef = useRef(null);
    let mobLifeContainerRef = useRef(null)
    let lifeValue = (props.Moblife*100) / props.maxMobLife;
    
    let lifeContainerRef = useRef(null);
    let updateMobLife = (_life)=>
        {
            
            lifeValue = (_life*100) / props.maxMobLife;
            mobLifeRef.current.style.width = lifeValue+'%';
            // if(_life == 0)
            // {
            //     mobLifeContainerRef.current.style.display='none'
            // }
        }
    _mobContext.removeLifeBarFunc.current = ()=>
        {
            mobLifeContainerRef.current.style.display='none'
        }
    _mobContext.lifeBarFunc.current = updateMobLife;
    return(
        <Html
        name="Mob Life"
        visible={true}
        position={[props.x,1,props.z]}
        transform={true}
        zIndexRange={[0,0]}
        sprite={true}

        style={{color:"white", fontSize:'1.5rem',
                
                userSelect:'none',WebkitUserSelect:'none',msUserSelect:'none',MozUserSelect:'none'
         }}
    >
        <div
            ref={mobLifeContainerRef}
            style={{position:'relative'}}
        >
                <div
                className={`bg-red-500 w-[40px] h-[3px]
                            
                            flex flex-col justify-center
                            `}
            >
                    <div
                        className={` w-[95%] h-[80%] mx-auto bg-black `}
                    >
                        <div
                            ref={mobLifeRef}
                            style={{ width: `${100}%` }}
                            className={" transition-[width] duration-[500ms] h-full bg-red-500 "}
                        ></div>
                    </div>
            </div>
        </div>
    </Html>

    )
}

export function GameNotif()
{
    let _appContext = useContext(appContext);
    let [showNotif,setShowNotif] = useState(false)
    let showNotifRef = useRef(false)
    let notifFirstShow = useRef(false)
    let notifMsg = useRef(false)
    let msgType = useRef('system');
    let msgColor = useRef('#274e4b');

   let NotifElem = (props)=>
        {
            let [notifShow,setnotifShow] = useState('block');
            let [opacity,setOpacity] = useState('opacity-100');
            
            let msgCounter = useRef(0);
            let notifRef = useRef(null)

            let customCounter = ()=>
                {
                    
                    msgCounter.current ++;
                    if(msgCounter.current <200)
                    {
                        // notifRef.current.innerText = msgCounter.current;
                        window.requestAnimationFrame(customCounter);
                    }
                    else
                    {   setOpacity('opacity-0')
                        
                    }
                }

            useEffect(()=>
                {   
                        customCounter()
                    
                },[])
            return(
                <div 
                ref={notifRef}
                style={{backgroundColor:msgColor.current}}
                className={`select-none p-[10px] ${notifShow} transition-[opacity] duration-[5000ms] ${opacity} text-white text-[1rem] w-full
                            border-[2px] border-black   
                             `}
                >
                    {props.message}
                </div>
            )
        }

    _appContext.gameNotifFunc.current = (msg,_msgType)=>
        { 
            notifMsg.current = msg
            msgType.current = _msgType
            if(msgType.current == 'system'){msgColor.current = '#274e4b';}
            else if(msgType.current == 'player'){msgColor.current = '#3b1a22';}
            
            if(showNotifRef.current)
            {   
                showNotifRef.current = false
                setShowNotif(c => c = false)
            } 
            else
            {   
                notifFirstShow.current = true;
                showNotifRef.current = true
                setShowNotif(c => c = true)
            }
            
        }
    useEffect(()=>
        {
            if(notifFirstShow.current)
            {
                if(!showNotif){showNotifRef.current = true;setShowNotif(c => c = true) }
                
            }
        },[showNotif])
    return <div
                className={` absolute z-[8] left-[0] right-[0] mx-auto top-[60px] w-[200px] `}
            >
                    {showNotif && <NotifElem message={notifMsg.current} />}
           </div>
}

export function TitleScreen()
{
    let _appContext = useContext(appContext);


    return <div 
                style={{backgroundImage:`url("gameBack.jpg")`}}
                className={`absolute left-[0] top-[0] z-[2] w-full h-full select-none `}
            >
                    <div className="relative mt-[10px] max-w-[400px] w-[90%] mx-auto ">
                        <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                        <img className="w-full " src="title.png" alt="title" />
                    </div>
                    
                     <div className="">
                            <div onClick={()=>{_appContext.appController('START-GAME')}}
                                className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                                <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                <img className="w-full h-full mx-auto " src="n_button/btnPlay.png" alt="play" />
                            </div>
                            <div onClick={()=>{_appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'OPTION-SCREEN'})}}
                                className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                                <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                <img className="w-full mx-auto " src="n_button/btnOption.png" alt="Option" />
                            </div>
                            <div onClick={()=>{_appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'CREDIT-SCREEN'})}}
                                className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                                <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                <img className="w-full mx-auto " src="n_button/btnCredit.png" alt="Credit" />
                            </div>
                    </div>
                    
           </div>
}

export function OptionScreen()
{
    let _appContext = useContext(appContext);
    let [controlVisible,setControlVisible] = useState(_appContext.gameControllerVisible.current);
    let [soundOn,setsoundOn] = useState(_appContext.soundOn.current);
    let switchControl = ()=>
        {   AudioManage.play('click')
            _appContext.gameControllerVisible.current = _appContext.gameControllerVisible.current? false : true;
            setControlVisible(_appContext.gameControllerVisible.current)
        }
    let switchVolume = ()=>
        {   AudioManage.play('click')
            _appContext.soundOn.current = _appContext.soundOn.current? false : true;
            AudioManage.soundONOFF(_appContext.soundOn.current? 'ON_MENU' : 'OFF_MENU');
            setsoundOn(_appContext.soundOn.current);
        }
    return <div
                 style={{backgroundImage:`url("gameButton/gameBack.jpg")`}}
                className={`absolute select-none left-[0] top-[0] z-[2] w-full h-full bg-black `}
            >
                    <div className="text-center text-[2rem] text-white">OPTION</div>
                    {/* <div 
                        className=" tracking-[3px] flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[150px] h-[50px] mx-auto bg-blue-500 text-white ">
                        VOLUME
                    </div> */}
                    <div>
                            <div 
                                className=" mb-[10px] text-[1.2rem] tracking-[3px] flex justify-center flex-col text-center mt-[35px] w-[200px] mx-auto  text-white ">
                                Volume
                            </div>
                            <div
                                onClick={switchVolume}
                                className={` relative cursor-pointer w-[90px] h-[30px] ${soundOn? 'bg-blue-900' : 'bg-red-900'} mx-auto `}
                            >
                                <div className={`absolute ${soundOn? 'right-[0]' : 'left-[0]'} w-[45px] h-[30px] h-full bg-white `} >
                                        <img className="w-full h-full mx-auto " src="n_button/btnSwitch.png" alt="switch" />
                                        <div className="absolute left-[0] top-[0] w-full h-full
                                                        flex flex-col justify-center 
                                                        text-white text-center">{_appContext.soundOn.current? 'ON' : 'OFF'}</div>
                                </div>
                            </div>
                    </div>
                    <div>
                            <div 
                                className=" mb-[10px] text-[1.2rem] tracking-[3px] flex justify-center flex-col text-center mt-[35px] w-[200px] mx-auto  text-white ">
                                Afficher les touches
                            </div>
                            <div
                                onClick={switchControl}
                                className={` relative cursor-pointer w-[90px] h-[30px] ${controlVisible? 'bg-blue-900' : 'bg-red-900'} mx-auto `}
                            >
                                <div className={`absolute ${controlVisible? 'right-[0]' : 'left-[0]'} w-[45px] h-[30px] `} >
                                        <img className="w-full h-full mx-auto " src="n_button/btnSwitch.png" alt="switch" />
                                        <div className="absolute left-[0] top-[0] w-full h-full
                                                        flex flex-col justify-center 
                                                        text-white text-center">{_appContext.gameControllerVisible.current? 'ON' : 'OFF'}</div>
                                </div>
                            </div>
                    </div>
                    <div   onClick={()=>{_appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'TITLE-SCREEN'})}} 
                        className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                        <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                        <img className="w-full mx-auto " src="n_button/btnBack.png" alt="back" />
                    </div>
           </div>
}

export function PlayerMoney()
{
    let _appContext = useContext(appContext);
    return(
        <div
        
        className='  z-[2]
                    flex
                    absolute top-[50px] left-[10px] text-white text-[2rem] ' 
        >
            <div
                className="w-[20px] h-[40px] relative "
            >   
                <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                <img className="w-full h-full " src="caurisTXT.png" alt="Money_Icon" />
            </div>
            
            <div className="text-[1.4rem] text-white/50 flex flex-col justify-center mx-[5px] ">x</div>
            <div ref={_appContext.playerMoneyContainerRef} className="text-[2rem]  flex flex-col justify-center "></div>
        </div>
    )
}

export function CreditScreen()
{
    let _appContext = useContext(appContext);

    return( <div
                style={{backgroundImage:`url("gameButton/gameBack.jpg")`}}
                className={`text-white absolute select-none left-[0] top-[0] z-[2] w-full h-full bg-black`}
                >
                    <div className="text-center my-[20px] text-[2rem] ">A propos</div>
                    <div className="text-center ">
                        <div>
                            <span className={`font-bold tracking-[1.5px] `} >DAHOMEY LEGACY</span> <span>partie 1</span>
                        </div>
                        <div className="text-center text-[0.9rem] text-white ">Bêta</div>
                        <div>
                            Développé par Abdel Bio
                        </div>
                        <div>
                            N'hésitez pas à nous laisser un message <br /> +229 90 39 73 97
                        </div>
                    </div>
                    <div   onClick={()=>{_appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'TITLE-SCREEN'})}} 
                        className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                        <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                        <img className="w-full mx-auto " src="n_button/btnBack.png" alt="retour" />
                    </div>
            </div>
    )
}

export function GameOverScreen()
{
    let _appContext = useContext(appContext);
    let [showContent,setShowContent] = useState(false);
    useEffect(()=>
        {
            _appContext.gameOverScreenFunc.current = ()=>
            {
                // setShowContent(true)
            }
        },[])
    return( <>
                            <div
                                style={{backgroundImage:`url("gameButton/gameBack.jpg")`}}
                                className={`text-white absolute select-none left-[0] top-[0] z-[5] w-full h-full bg-black`}
                                >
                                    <div className="text-center my-[20px] ">Partie terminée</div>
                                    <div className="text-center ">
                                        <div>
                                            Vous vous êtes évanoui dans la forêt
                                        </div>
                                        
                                    </div>
                                    <div   onClick={()=>{_appContext.quitGame('RESTART-GAME-OVER') }} 
                                        className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                                        <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                        <img className="w-full mx-auto " src="n_button/btnQuit.png" alt="Quit" />
                                        
                                    </div>
                            </div>
            
            </>
    )
}
export function GameEndingScreen()
{
    let _appContext = useContext(appContext);
    let [showContent,setShowContent] = useState(false);
    useEffect(()=>
        {
            _appContext.gameEndingScreenFunc.current = ()=>
            {
                // setShowContent(true)
            }
        },[])
    return( <>
                                <div
                                style={{backgroundImage:`url("gameButton/gameBack.jpg")`}}
                                className={`text-white absolute select-none left-[0] top-[0] z-[5] w-full h-full bg-black`}
                                >
                                    <div className="text-center my-[20px] ">Fin du Chapitre 1</div>
                                    <div className="text-center ">
                                        <div>
                                            Merci d'avoir Joué à Dahomey Legacy <br />La partie 2 arrive bientôt !
                                        </div>
                                        
                                    </div>
                                    <div   onClick={()=>{_appContext.quitGame('RESTART-GAME-FINISHED') }} 
                                        className=" relative flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[50px] mx-auto ">
                                        <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                        <img className="w-full mx-auto " src="n_button/btnQuit.png" alt="Quit" />
                                    </div>
                            </div>
            
            </>
    )
}

export function ToggleTouchScreen()
{
    let _appContext = useContext(appContext)
    return(
        <>
            <div
                onClick={ _appContext.gameControllerFunc.current}
                className="cursor-pointer absolute right-[5px] bottom-[5px] z-[2] w-[40px] h-[40px] border-[2px] border-red-500 "
            >
            <svg fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.283 13.091C5.428 13.678 5 14.648 5 16.002c0 2.03 2.488 5.5 4.73 5.5h5.74c2.196 0 3.53-1.926 3.53-3.47v-6.526a1.5 1.5 0 0 0-1.5-1.5h-.005c-.826 0-1.495.67-1.495 1.495" />
            <path d="M6.99 14.222V4.002a1.5 1.5 0 0 1 1.5-1.498h.004c.83.002 1.502.676 1.502 1.507v7.785" />
            <path d="M9.996 11.504V9.508a1.508 1.508 0 0 1 3.016 0v1.996" />
            <path d="M13 11.358v-1.356a1.5 1.5 0 1 1 3 0v1.5" />
            </svg>
            </div>
        </>
    )
}
export function StoryScreen()
{
    let _appContext = useContext(appContext)
    let [storyScreenActive,setStoryScreenActive] = useState(false);
    let speech = useRef(speechTimeline[_appContext.level.current-1]);
    let speechTotalPart = useRef(speech.current.length);
    let speechPartCounter = useRef(1)
    let [speechPartToShow,setSpeechPartToShow] = useState(speech.current[0]) 
    let customCounter = null;
    let removeStoryScreen = ()=>
        {
            // _appContext.setPause();
            _appContext.gamePause.current = false;
            _appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'NO-SCREEN'});
            // setStoryScreenActive(false);

        }
    let nextPart = ()=>
        {   
            speechPartCounter.current ++;
           
            setSpeechPartToShow(speech.current[speechPartCounter.current-1]);
        }
    let keyBoardManageStory = ()=>
        {   
            if(speechPartCounter.current == speechTotalPart.current)
            {
                _appContext.systemPause(false)
                setStoryScreenActive(c => c = false);
            }
            else
            {
                nextPart();
            }
        }
    
    // let storyScreenDisplay = useRef(<div
    //                                     className={`select-none w-full h-full top-[0] left-[0] absolute z-[5] bg-black/80 text-white`}
    //                                 >
    //                                     <div>
    //                                         <div className=" text-center text-[1.3rem] text-white mt-[35px] max-w-[350px] mx-auto ">
    //                                                 {speechPartToShow}
    //                                         </div>
                                        
    //                                         {speechPartCounter.current < speechTotalPart.current && 
    //                                             <div onClick={nextPart} 
    //                                             className=" tracking-[3px] flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[150px] h-[25px] mx-auto bg-blue-500 text-white ">
    //                                                 CONTINUER
    //                                             </div>
    //                                         }
    //                                         {speechPartCounter.current == speechTotalPart.current && 
    //                                             <div onClick={removeStoryScreen} 
    //                                             className=" tracking-[3px] flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[100px] h-[25px] mx-auto bg-blue-500 text-white ">
    //                                                 OK
    //                                             </div>
    //                                         }
                                            
    //                                     </div>
    //                                 </div>
    // );

    useEffect(()=>
        {
            if(speechTimeline[_appContext.level.current-1][0] != 'none')
            {   
                _appContext.gamePause.current = true;

                speech.current = speechTimeline[_appContext.level.current-1];
                speechTotalPart.current = speech.current.length;
                speechPartCounter.current = 1;
                setSpeechPartToShow(speech.current[speechPartCounter.current-1]);
                customCounter = new CustomCounter(35,1,()=>
                {
                    _appContext.actualGameScreen.current = 'STORY-SCREEN'
                    setStoryScreenActive(c => c = true);
                });
                customCounter.start();
            }
            else
            {
                _appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'NO-SCREEN'})
            }
        },[])
    useEffect(()=>
        {
            
            _appContext.KeyBoardManageStory.current = keyBoardManageStory;
            _appContext.StoryScreenController.current = (state)=>
            {
                
                if(state == 'show')
                {
                    _appContext.gamePause.current = true;
                    customCounter = new CustomCounter(35,1,()=>
                        {
                            _appContext.actualGameScreen.current = 'STORY-SCREEN'
                            setStoryScreenActive(c => c = true);
                        });
                    customCounter.start();
                    
                    
                }
                else if(state=='update')
                {
                    speech.current = speechTimeline[_appContext.level.current-1];
                    speechTotalPart.current = speech.current.length;
                    speechPartCounter.current = 1;
                    setSpeechPartToShow(speech.current[speechPartCounter.current-1]);
                }
                else if(state == 'remove')
                {   
                    _appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'NO-SCREEN'});
                    // setStoryScreenActive(c => c = false);
                }
                
                
            }

            // return ()=>{ customCounter.cancelCounter()}
        },[])
        
    return(
            <div
                id="STORY-SCREEN"
            >
                {storyScreenActive && <div
                                        className={`select-none w-full h-full top-[0] left-[0] absolute z-[5] bg-black/80 text-white`}
                                    >
                                        <div>
                                            <div className=" text-center text-[1.3rem] text-white mt-[35px] max-w-[350px] mx-auto ">
                                                    {speechPartToShow}
                                            </div>
                                        
                                            {speechPartCounter.current < speechTotalPart.current && 
                                                <div onClick={nextPart} 
                                                className=" relative tracking-[3px] flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[25px] mx-auto bg-blue-500 text-white ">
                                                    <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                                    <img className="w-full mx-auto " src="n_button/btnContinue.png" alt="continue" />
                                                </div>
                                            }
                                            {speechPartCounter.current == speechTotalPart.current && 
                                                <div onClick={removeStoryScreen} 
                                                className=" relative tracking-[3px] flex justify-center flex-col text-center mt-[35px] cursor-pointer w-[200px] h-[25px] mx-auto bg-blue-500 text-white ">
                                                    <div id="GLASS" className="absolute left-[0] top-[0] w-full h-full z-[2] "></div>
                                                    <img className="w-full mx-auto " src="n_button/btnContinue.png" alt="continue" />
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>}
            </div>
    )
}

//Z-INDEX
// 1-  Canvas
// 2- LifeBar, GameController, TitleScreen, OptionScreen, PlayerMoney, CreditScreen, ToggleTouchScreen
// 3- PauseScreen
// 4- PauseIcon
// 5- GameOverScreen, GameEndingScreen, StoryScreen
// 6-
// 7-
// 8- GameNotif
// 9- GameScreenTransition