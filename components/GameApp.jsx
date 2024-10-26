import * as THREE from 'three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { TestModel } from "./Testmodel";
import { OrbitControls, PerspectiveCamera, Point, Points } from "@react-three/drei";
import { createContext, useContext, useEffect, useRef } from "react";
import {  ExitDoor_model, GroundModel, PlayerCursor, SpearModel, TreeDecor_model } from "./Game3DAssets";
import { EnemyComponent } from "./enemy";
import { appContext } from "../src/App";
import { PlatformIndex } from "./DevHelp";
import { PlaneGeometry } from "three";
import { Mob_2 } from './mob_2';
import { movePlayer,preparePlayerMove,rotateCam } from './playerController';
import { moveBullet, prepareNextBullet } from './bulletController';
import { placeModelOnScene } from './placeModelOnScene';
import { AudioManage } from './audioComponents';
import { CustomCounter } from './utils';
import { speechTimeline } from './gameStory';

export let gameAppContext = createContext(null);
export function GameApp(props)
{
    
    let _appContext = useContext(appContext);
    let level = useRef(_appContext.level.current);
    const GameMap =  _appContext.gameMap;
    let gameMapInfo = _appContext.levelInfo.current; //WIN CONDITION
    let moveDirection={value:'none'};
    let getPlayerPosition = {value:0};
    let getCameraPOsition = {value:0};
    let getorbitPosition = {value:0};
    let playerSpeed = _appContext.playerStats.current.moveSpeed;
    let bulletSpeed = 0.1*5;
    let playerDistance = {value:0};
    let playerDistanceTarget = {value:2};
    let enemyLifePoint = {value:1};
    let playerPoseVar = {x:structuredClone(GameMap[7].xPose),y:0.8,z:structuredClone(GameMap[7].zPose)};
    let playerPositionOnMap = {x:playerPoseVar.x,y:0,z:playerPoseVar.z}
    let bulletPositionOnMap = [];
    let camRotateStart = useRef(false);
    let camRotateInfo = {left:{x:3,xCamValue:0,z:1,zCamValue:0,counter:0}};
    let bulletContainer = [];
    let playerDirection = {value:'FRONT'};
    let objectContainer = useRef([]);
    let bulletRef = useRef([]);
    let bulletRefInfo = useRef([]);
    let objectRef = useRef([]);
    let mobUpdateFunc = useRef([]);
    let keyPressedName = useRef(null);
    let aKeyisPressed = useRef(false); // si ça vaut true on ne peut plus appuyer une autre clé tant qu'on a pas laissé l'autre
    let playerMoveIsActive = useRef(false);
    let playerCursorRef = useRef(null)
    let camRef = useRef(null);
    let orbitRef = useRef(null);
    let objetDirection = useRef([false,false,false,false]);
    let bulletGroupRef = useRef(null);
    let itemController = {value:[]};
    let wallController = {value:[]};
    let exitDoorController = {value:[]};
    let spearModelIndexArr = {value:[]};
    let bulletModelController = {value:[]};
    let exitDoorModelIndexArr = {value:[]};
    let exitDoorMapIndexArr = {value:[]};
    let mobIndexArr = {value:[]};
    let barierMapIndexArr = {value:[]};
    let barierModelIndexArr = {value:[]};
    let playerCanShoot = true;
    // let playerCanShoot = _appContext.level.current == 1? false : true;
    let currentObjectInFront={effect:'none',objectInfo:null};
    let passedTime = 0;
    let walkEffectTimer = {value:0};
    let totalBullet = {value:20};
    let weaponReload = {time:0,timeLimite:5,start:false};
    let nextBulletToShoot={value:null};
    let exitDoorVisible={value:false};
    let showWeapon3DModel = {value:_appContext.playerStats.current.showWeapon}
    let directionToGo = {value:'FRONT'};
    let gloBalObject;



    
    
    let checkWinCondition = ()=>
        {
            
            // IF _KeyNumber > 0 PLAYER MUST COLLECT ALL THE KEY IN THE AREA BEFORE GOING TO THE NEXT LEVEL
            if(gameMapInfo._KeyNumber != 0)
            {   
                if(_appContext.playerStats.current.keyCollected == gameMapInfo._KeyNumber )
                {
                    openExitDoor();
                }
                if(_appContext.playerStats.current.mobKilled == gameMapInfo._MobToKillNumber )
                {
                    removeBarrier(); 
                }
            }
            else
            {   
                // PLAYER MUST KILL ALL THE MOB IN THE AREA BEFORE GOING TO THE NEXT LEVEL
                if(_appContext.playerStats.current.mobKilled == gameMapInfo._MobToKillNumber )
                    {  
                        removeBarrier(); 
                        openExitDoor();
                        
                    }
            }
        }
    const removeBarrier = ()=>
        {
                for(let i =0; i< barierMapIndexArr.value.length;i++)
                {
                    GameMap[barierMapIndexArr.value[i]].objectDesc.pass = true;
                }
                for(let i = 0; i< barierModelIndexArr.value.length;i++)
                {
                    barierModelIndexArr.value[i].ModelFunc("hide")
                }
        }
    let openExitDoor = ()=>
        {
            for(let i = 0; i< exitDoorController.value.length;i++)
            {
                if(exitDoorController.value[i])
                {
                    exitDoorController.value[i]('OPEN-DOOR')
                }
                
            }
            for(let i = 0; i< exitDoorMapIndexArr.value.length;i++)
            {
                
                GameMap[exitDoorMapIndexArr.value[i]].objectDesc.open = true;
            }

        }
    let gameEnding = ()=>
        {
            // _appContext.gameEndingScreenFunc.current();
            _appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'ENDING-SCREEN'});
        }
    let reduceEnemyLife = ()=>
        {
            enemyLifePoint.value --;
            // _appContext.playerLifeContainerRef.current.innerText = enemyLifePoint.value;
        }
    let managePlayerKey = ()=>
        {
            _appContext.playerStats.current.keyCollected ++;
            checkWinCondition();
        }
    let reducePlayerLife = (_number)=>
        {
            _appContext.playerStats.current.life -= _number;
            _appContext.lifeBarFunc.current(_appContext.playerStats.current.life);
            if(_appContext.playerStats.current.life == 0)
            {
                _appContext.setGameOver()
            }
            
        }
    let increasePlayerLife = (_number)=>
        {
            _appContext.playerStats.current.life += _number;
            if(_appContext.playerStats.current.life > _appContext.playerStats.current.maxLife)
            {
                _appContext.playerStats.current.life = _appContext.playerStats.current.maxLife
            }
            _appContext.lifeBarFunc.current(_appContext.playerStats.current.life);
            
        }
    let managePlayerMoney = (_number,operation)=>
        {
            if(operation == 'add')
            {
                _appContext.playerStats.current.coinCollected += _number;
            }
            else
            {
                _appContext.playerStats.current.coinCollected -= _number;
            }
            
            _appContext.playerMoneyContainerRef.current.innerText = _appContext.playerStats.current.coinCollected;
            // checkWinCondition()
        } 
    let getCurrentBulletPlatform = (bulletIndex)=>
        {
            let result = GameMap.find((elem)=>{return elem.xPose == bulletPositionOnMap[bulletIndex].x && elem.zPose == bulletPositionOnMap[bulletIndex].z })

            return result;
        }

    let resetBullet = (_index)=>
        {
           
            bulletRefInfo.current[_index] = {_index:_index,isShooted:false,prepareMove:false,move:"none",direction:'none',hasCheckNextPlatform:false,moveDistance:0};
            bulletRef.current[_index].position.x = playerPositionOnMap.x
            bulletRef.current[_index].position.z = playerPositionOnMap.z
            // bulletRef.current[_index].children[0].material.visible = false;
            bulletModelController.value[_index]('HIDE-BULLET')
            prepareNextBullet(gloBalObject);
        }
    let checkPlatform = (elem)=>
        {
            return elem.xPose == playerPositionOnMap.x && elem.zPose == playerPositionOnMap.z 
        }
    
    let getNextPlatformInfo = (_playerDirection,_when)=>
        {
            
            
                if(_playerDirection.value == 'LEFT'){playerPositionOnMap.x += (playerDistanceTarget.value);}
                if(_playerDirection.value == 'RIGHT'){playerPositionOnMap.x -= (playerDistanceTarget.value);}
                if(_playerDirection.value == 'FRONT'){playerPositionOnMap.z += (playerDistanceTarget.value);}
                if(_playerDirection.value == 'BACK'){playerPositionOnMap.z -= (playerDistanceTarget.value);}
            
            
                let result = GameMap.find(checkPlatform);
    
                if(_playerDirection.value == 'LEFT'){playerPositionOnMap.x -= (playerDistanceTarget.value);}
                if(_playerDirection.value == 'RIGHT'){playerPositionOnMap.x += (playerDistanceTarget.value);}
                if(_playerDirection.value == 'FRONT'){playerPositionOnMap.z -= (playerDistanceTarget.value);}
                if(_playerDirection.value == 'BACK'){playerPositionOnMap.z += (playerDistanceTarget.value);}
    
                
                if(_when == 'AfterMove')
                {
                    if(result)
                    {
                        if(result.objectType=='item')
                        {  
                            if(result.objectDesc.objectName=='weapon_item'){setActionButtonEffect('TAKE-SPEAR',result)}
                            else if(result.objectDesc.objectName=='heal_item'){setActionButtonEffect('TAKE-HEAL',result)}
                            else if(result.objectDesc.objectName=='coin_item'){setActionButtonEffect('TAKE-CAURIS',result)}
                            else if(result.objectDesc.objectName=='wall_1')
                            {
                                
                            }
                            
                        }
                        // else if(result.objectType=='cauris_item')
                        // {
                        //     setActionButtonEffect('TAKE-CAURIS',result)
                        // }
                        // else if(result.objectType=='heal_item')
                        // {
                        //     setActionButtonEffect('TAKE-HEAL',result)
                        // }
                        else if(result.objectType=='Exitdoor')
                        {
                            setActionButtonEffect('Exit',result)
                        }
                        else
                        {   
                            //BULLET
                            setActionButtonEffect('none',result)
                        }
                    }
                    
                }
                
            // }
            
        }
    let setActionButtonEffect = (effect,objectInfo)=>
        {
            if(effect == 'TAKE-SPEAR')
            {   
                if(objectInfo.isOnScene)
                {    
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/interact.png';}
                    currentObjectInFront.effect = 'SPEAR';
                }
                else
                {
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/attack.png';}
                    currentObjectInFront.effect ='none';
                }
                
                
            }
            else if(effect == 'TAKE-CAURIS')
            {
                if(objectInfo.isOnScene)
                {
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/interact.png';}
                    currentObjectInFront.effect = 'CAURIS';
                }
                else
                {
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/attack.png';}
                    currentObjectInFront.effect ='none';
                }
                
                
            }
            else if(effect == 'TAKE-HEAL')
            {
                if(objectInfo.isOnScene)
                {
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/interact.png';}
                    currentObjectInFront.effect = 'HEAL';
                }
                else
                {
                    if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/attack.png';}
                    currentObjectInFront.effect ='none';
                }
                
                
            }
            else if(effect =='Exit')
            {
                if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/interact.png';}
                currentObjectInFront.effect ='Exit';
            }
            else if(effect =='none')
            {
                if(_appContext.gameControllerVisible.current){_appContext.actionButtonRef.current.src = 'gameButton/attack.png';}
                currentObjectInFront.effect ='none';
            }
            currentObjectInFront.objectInfo = objectInfo;
        }



    let spearScale = (value)=>
        {
            for(let i =0;i<bulletRef.current.length;i++)
            {
                if(!bulletRefInfo.current[i].isShooted)
                {
                    bulletRef.current[i].scale.set(value,value,value)
                }
                
            }
        }
    let playerMovePressedEventHandler = (touchPressed)=>
    {   
        if(!aKeyisPressed.current && !playerMoveIsActive.current && !camRotateStart.current 
            && !weaponReload.start
          )
            {       
                    keyPressedName.current = touchPressed;
                if(!_appContext.gamePause.current)
                {

                    if(touchPressed == 'ArrowLeft' || touchPressed == 'q')
                    {   
                        if(playerDirection.value == 'FRONT')
                            {   directionToGo.value = 'LEFT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'LEFT')
                            {   directionToGo.value = 'BACK'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'RIGHT')
                            {   directionToGo.value='FRONT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'BACK')
                            {   directionToGo.value='RIGHT'
                                preparePlayerMove(gloBalObject)}
                    }
                    else if(touchPressed == 'ArrowRight' || touchPressed == 'd')
                    {
                        
                        if(playerDirection.value == 'FRONT')
                            {   directionToGo.value='RIGHT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'LEFT')
                            {   directionToGo.value='FRONT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'RIGHT')
                            {   directionToGo.value='BACK'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'BACK')
                            {   directionToGo.value ='LEFT'
                                preparePlayerMove(gloBalObject)}
                            
                    }
                    else if(touchPressed == 'ArrowUp' || touchPressed == 'z')
                    {
                        
                        if(playerDirection.value == 'FRONT')
                            {   directionToGo.value='FRONT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'LEFT')
                            {   directionToGo.value='LEFT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'RIGHT')
                            {   directionToGo.value='RIGHT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'BACK')
                            {   directionToGo.value='BACK'
                                preparePlayerMove(gloBalObject)}
                        
                    }
                    else if(touchPressed == 'ArrowDown' || touchPressed == 's')
                    {
                        
                        if(playerDirection.value == 'FRONT')
                            {   directionToGo.value='BACK'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'LEFT')
                            {   directionToGo.value = 'RIGHT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'RIGHT')
                            {   directionToGo.value = 'LEFT'
                                preparePlayerMove(gloBalObject)}
                        else if(playerDirection.value == 'BACK')
                            {   directionToGo.value = 'FRONT'
                                preparePlayerMove(gloBalObject)}
                    }
                    else if(touchPressed == 'a')
                    {  
                        aKeyisPressed.current = true 
                        
                        camRotateInfo.left.xCamValue = orbitRef.current.target.x;
                        camRotateInfo.left.zCamValue = orbitRef.current.target.z;
                        camRotateStart.current = true;
                        // LEFT
                        if(playerDirection.value == 'FRONT'){playerDirection.value ='LEFT'}
                        else if(playerDirection.value == 'LEFT'){playerDirection.value ='BACK'}
                        else if(playerDirection.value == 'BACK'){playerDirection.value ='RIGHT'}
                        else if(playerDirection.value == 'RIGHT'){playerDirection.value ='FRONT'}
                        if(playerDirection.value == 'LEFT')
                        {   
                            spearScale(0)
                            camRotateInfo.left.x = orbitRef.current.target.x+2;
                            camRotateInfo.left.z = orbitRef.current.target.z-2;
                        }
                        else if(playerDirection.value == 'BACK')
                        {
                            spearScale(0)
                            camRotateInfo.left.x = orbitRef.current.target.x-2;
                            camRotateInfo.left.z = orbitRef.current.target.z-2;
                        }
                        else if(playerDirection.value == 'RIGHT')
                        {
                            spearScale(0)
                            camRotateInfo.left.x = orbitRef.current.target.x-2;
                            camRotateInfo.left.z = orbitRef.current.target.z+2;
                        }
                        else if(playerDirection.value == 'FRONT')
                        {
                            spearScale(0)
                            camRotateInfo.left.x = orbitRef.current.target.x+2;
                            camRotateInfo.left.z = orbitRef.current.target.z+2;
                        }
                    }
                    else if(touchPressed == 'e')
                        {
                            aKeyisPressed.current = true 
                            
                            camRotateInfo.left.xCamValue = orbitRef.current.target.x;
                            camRotateInfo.left.zCamValue = orbitRef.current.target.z;
                            camRotateStart.current = true;
                            // RIGHT
                            if(playerDirection.value == 'FRONT'){playerDirection.value ='RIGHT'}
                            else if(playerDirection.value == 'RIGHT'){playerDirection.value ='BACK'}
                            else if(playerDirection.value == 'BACK'){playerDirection.value ='LEFT'}
                            else if(playerDirection.value == 'LEFT'){playerDirection.value ='FRONT'}
                            if(playerDirection.value == 'RIGHT')
                            {
                                spearScale(0)
                                camRotateInfo.left.x = orbitRef.current.target.x-2;
                                camRotateInfo.left.z = orbitRef.current.target.z-2;
                            }
                            else if(playerDirection.value == 'BACK')
                            {
                                spearScale(0)
                                camRotateInfo.left.x = orbitRef.current.target.x+2;
                                camRotateInfo.left.z = orbitRef.current.target.z-2;
                            }
                            else if(playerDirection.value == 'LEFT')
                            {
                                spearScale(0)
                                camRotateInfo.left.x = orbitRef.current.target.x+2;
                                camRotateInfo.left.z = orbitRef.current.target.z+2;
                            }
                            else if(playerDirection.value == 'FRONT')
                            {
                                spearScale(0)
                                camRotateInfo.left.x = orbitRef.current.target.x-2;
                                camRotateInfo.left.z = orbitRef.current.target.z+2;
                            }
                        }
                    else if(touchPressed == ' ')
                    {
                        aKeyisPressed.current = true;
                        if(currentObjectInFront.effect == 'none')
                            {
                                if(nextBulletToShoot.value)
                                {
                                    if(!weaponReload.start)
                                        {   
                                            //SHOOT
                                            if(playerCanShoot)
                                            {
                                                
                                                AudioManage.play("shoot")
                                                for(let i =0;i<bulletRef.current.length;i++)
                                                {
                                                    if(!bulletRefInfo.current[i].isShooted)
                                                    {
                                                        
                                                        bulletRef.current[i].position.x = playerPositionOnMap.x;
                                                        bulletRef.current[i].position.z = playerPositionOnMap.z;
                                                        bulletPositionOnMap[i].x = playerPositionOnMap.x;
                                                        bulletPositionOnMap[i].z = playerPositionOnMap.z;
                                                    }
                                                    
                                                }
        
                                                if(!showWeapon3DModel.value)
                                                    {   
                                                        bulletModelController.value[nextBulletToShoot.value._index]('SHOW-BULLET')
                                                        // bulletRef.current[nextBulletToShoot.value._index].children[1].material.visible = true;
                                                    }
                                                
        
                                                nextBulletToShoot.value.isShooted = true;
                                                nextBulletToShoot.value.prepareMove = true;
                                                nextBulletToShoot.value.direction = playerDirection.value;
                                                bulletRefInfo.current[nextBulletToShoot.value._index].direction = playerDirection.value;
                                                weaponReload.start = true
                                            }
                                            else
                                            {
                                                _appContext.gameNotifFunc.current('Take your Weapon !','player');
                                                // console.log('pas de lance')
                                            }
                                            
                                        }
                                        else
                                        {
                                            // console.log('rechargement')
                                        }
                                }
                                
                                
                            }
                            else if (currentObjectInFront.effect == 'Exit')
                            {
                            
                                if(currentObjectInFront.objectInfo.objectDesc.open)
                                {
                                   
                                    if(_appContext.level.current == 13){gameEnding()}
                                    else{_appContext.nextLevel()}
                                    
                                }
                                else
                                {
                                    // console.log('FERME !!!');
                                    if(_appContext.level.current == 1){_appContext.gameNotifFunc.current('Récuperez la lance pour avancer','player');}
                                    else{_appContext.gameNotifFunc.current('Fermé','player');}
                                    
                                }
                                    
                                
                            }
                            else if (currentObjectInFront.effect == 'CAURIS')
                            {
                                AudioManage.play('coin')
                              
                                if(currentObjectInFront.objectInfo.objectDesc.isImportant){managePlayerKey()} 
                                managePlayerMoney(currentObjectInFront.objectInfo.objectDesc.value,'add')
                                currentObjectInFront.objectInfo.isOnScene = false;
    
                                if(currentObjectInFront.objectInfo.objectDesc.fromMob)
                                {mobUpdateFunc.current[currentObjectInFront.objectInfo.objectId]('Remove-Object',"none");}
                                else
                                {
                                    
                                    itemController.value[currentObjectInFront.objectInfo.objectId]('REMOVE-ITEM')
                                }
    
                                getNextPlatformInfo(playerDirection,'AfterMove');
    
                            }
                            else if (currentObjectInFront.effect == 'HEAL')
                            {
                                AudioManage.play('heal')
                                if(currentObjectInFront.objectInfo.objectDesc.isImportant){managePlayerKey()} 
                                increasePlayerLife(currentObjectInFront.objectInfo.objectDesc.value)
                                currentObjectInFront.objectInfo.isOnScene = false;
                                if(currentObjectInFront.objectInfo.objectDesc.fromMob){mobUpdateFunc.current[currentObjectInFront.objectInfo.objectId]('Remove-Object',"none");}
                                else
                                {
                                    
                                    itemController.value[currentObjectInFront.objectInfo.objectId]('REMOVE-ITEM')
                                }
                                
                                getNextPlatformInfo(playerDirection,'AfterMove');
    
                            }
                            else if (currentObjectInFront.effect == 'SPEAR')
                            {
                                AudioManage.play('grab');
                                
                                if(currentObjectInFront.objectInfo.objectDesc.isImportant){managePlayerKey()} 
                                
                                currentObjectInFront.objectInfo.isOnScene = false
                                objectRef.current[currentObjectInFront.objectInfo.objectId].children[0].visible = false;
                                getNextPlatformInfo(playerDirection,'AfterMove');
    
                                if(_appContext.level.current == 1)
                                {
                                    playerCanShoot = true;
                                    bulletGroupRef.current.visible = true
    
                                    
                                }
                            }
                         
                    }
                    
                }
                else
                {
                        if(touchPressed == ' ')
                        {   
                            aKeyisPressed.current = true;
                            if(_appContext.actualGameScreen.current == 'HELP-SCREEN' || _appContext.actualGameScreen.current == 'STORY-SCREEN')
                            {
                                // _appContext.setPause()
                                _appContext.KeyBoardManageStory.current()
                            }
                            else
                            {
                                
                            }
                            
                            
    
                            
                            
                        }
                }
                
                        
            } 
    }

    let playerMoveUpEventHandler = (touchPressed)=>
    {
        if(keyPressedName.current == touchPressed )
            {
                aKeyisPressed.current = false;
            }
    }
    for(let i = 0;i<totalBullet.value;i++)
    {
        bulletContainer[i] = <mesh
                                key={i}
                                position={[playerPoseVar.x,0.6,playerPoseVar.z]}
                                rotation={[0,Math.PI*2,0]}
                                ref={(val)=> bulletRef.current[i] = val }
                                >
                                    <sphereGeometry args={[0.05,10,10]} />
                                    <meshBasicMaterial visible={false}  />

                                    <SpearModel controller={{bulletModelController:bulletModelController,index:i}} _rotation={[Math.PI*0.5,0,0]}  _visible={false} posX={-0.1} posY={0.25} posZ={0} />
                            </mesh>
        bulletRefInfo.current[i] = {_index:i,isShooted:false,prepareMove:false,move:"none",direction:'none',hasCheckNextPlatform:false,moveDistance:0};
        bulletPositionOnMap[i] = {x:playerPoseVar.x,y:0.6,z:playerPoseVar.z};
    }

    
    useFrame((clock)=>
        {
            if(!_appContext.gamePause.current)
            {
                passedTime += 1/40;
                for(let i =0;i< spearModelIndexArr.value.length;i++)
                {   
                    // objectRef.current[spearModelIndexArr.value[i]].children[0].position.y += Math.sin(passedTime)/400;
                    // objectRef.current[spearModelIndexArr.value[i]].children[0].rotation.z += (0.1/4);
                    
                }
    
                if(camRotateStart.current)
                {
                    rotateCam(gloBalObject);
                }
                if(playerMoveIsActive.current)
                {   
                    
                    movePlayer(gloBalObject)
                       
                }
                moveBullet(gloBalObject)
            }
            
        })
      
    useEffect(()=>
        {
            _appContext.GameUIController.current({arg1:'SWITCH-TO',arg2:'STORY-SCREEN'})
        },[])
    useEffect(()=>
        {   
            
            
            prepareNextBullet(gloBalObject);
            _appContext.playerStats.current.keyCollected = 0
            _appContext.playerStats.current.mobKilled = 0
            _appContext.playerMoneyContainerRef.current.innerText = _appContext.playerStats.current.coinCollected;
            let playerMovePressedEventHandlerCallB = (evt)=>
            {
                playerMovePressedEventHandler(evt.key)
            }
            let playerMoveUpEventHandlerCallB = (evt)=>
            {
                playerMoveUpEventHandler(evt.key)
            }
            _appContext.touchEventMFunc.current.center = ()=>{playerMovePressedEventHandler(' ')}
            _appContext.touchEventMFunc.current.left = ()=>{playerMovePressedEventHandler('ArrowLeft')}
            _appContext.touchEventMFunc.current.right = ()=>{playerMovePressedEventHandler('ArrowRight')}
            _appContext.touchEventMFunc.current.up = ()=>{playerMovePressedEventHandler('ArrowUp')}
            _appContext.touchEventMFunc.current.down = ()=>{playerMovePressedEventHandler('ArrowDown')}
            _appContext.touchEventMFunc.current.turnRight = ()=>{playerMovePressedEventHandler('e')}
            _appContext.touchEventMFunc.current.turnLeft = ()=>{playerMovePressedEventHandler('a')}

            _appContext.touchEventTouchEndFunc.current.center = ()=>{playerMoveUpEventHandler(' ')}
            _appContext.touchEventTouchEndFunc.current.left = ()=>{playerMoveUpEventHandler('ArrowLeft')}
            _appContext.touchEventTouchEndFunc.current.right = ()=>{playerMoveUpEventHandler('ArrowRight')}
            _appContext.touchEventTouchEndFunc.current.up = ()=>{playerMoveUpEventHandler('ArrowUp')}
            _appContext.touchEventTouchEndFunc.current.down = ()=>{playerMoveUpEventHandler('ArrowDown')}
            _appContext.touchEventTouchEndFunc.current.turnRight = ()=>{playerMoveUpEventHandler('e')}
            _appContext.touchEventTouchEndFunc.current.turnLeft = ()=>{playerMoveUpEventHandler('a')}
            // if(iselemOnScene)
            // {   
    
                window.addEventListener('keydown',playerMovePressedEventHandlerCallB,true)
                window.addEventListener('keyup',playerMoveUpEventHandlerCallB,true)
            // }
            // _appContext.GameScreenTransitionRef.current.style.display = 'none';
            
            
            return ()=>
            {   
                // scene.dispose();
                // gl.dispose();
                window.removeEventListener('keydown',playerMovePressedEventHandlerCallB,true)
                window.removeEventListener('keyup',playerMoveUpEventHandlerCallB,true)
            }
        },[])
        gloBalObject = {moveDirection,getPlayerPosition,getCameraPOsition,getorbitPosition,playerCursorRef,
            camRef,orbitRef,playerSpeed,playerDistance,bulletRef,bulletRefInfo,walkEffectTimer,playerDistanceTarget,
            playerMoveIsActive,getNextPlatformInfo,playerDirection,aKeyisPressed,objetDirection,GameMap,playerPositionOnMap,
            directionToGo,camRotateInfo,camRotateStart,weaponReload,resetBullet,getCurrentBulletPlatform,objectRef,exitDoorModelIndexArr,
            gloBalObject,bulletSpeed,nextBulletToShoot,bulletPositionOnMap,mobUpdateFunc,checkWinCondition,objectContainer,exitDoorMapIndexArr,
            barierMapIndexArr,mobIndexArr,spearModelIndexArr,_appContext,spearScale,barierModelIndexArr,level,exitDoorVisible,itemController,
            wallController,exitDoorController,showWeapon3DModel,bulletModelController

            }
        placeModelOnScene(gloBalObject)
     
    return <>
                <gameAppContext.Provider
                    value={{GameMap,playerPositionOnMap,playerMoveIsActive,enemyLifePoint,reducePlayerLife,mobUpdateFunc,barierModelIndexArr,exitDoorModelIndexArr}}
                >
                        
                        {_appContext.devMode.current?
                            <>
                             <PerspectiveCamera position={[15,35,-2]} ref={camRef} makeDefault />
                             <OrbitControls target={[playerPoseVar.x+15,0.8,playerPoseVar.z]} ref={orbitRef} />
                            </> 
                        :
                            <>
                            <PerspectiveCamera position={[playerPoseVar.x,0.8,playerPoseVar.z]} ref={camRef} makeDefault />
                            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} target={[playerPoseVar.x,0.8,playerPoseVar.z+2]} ref={orbitRef} />
                            </>
                        }
                        {/* <PerspectiveCamera position={[playerPoseVar.x,0.8,playerPoseVar.z]} ref={camRef} makeDefault />
                        <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} target={[playerPoseVar.x,0.8,playerPoseVar.z+2]} ref={orbitRef} /> */}
                        
                        <axesHelper args={[15]} />
                        <GroundModel />
                        {objectContainer.current}
                        <mesh
                            name="PLAYER"
                            ref={playerCursorRef}
                            rotation={[0,Math.PI*2,0]}
                            position={[playerPositionOnMap.x,0.6,playerPositionOnMap.z]}
                        >
                            <boxGeometry args={[0.05,0.05,2]}/>
                            <meshBasicMaterial color={'blue'} wireframe visible={false} />

                            <mesh
                                name="PLAYER BODY"
                                position={[0,0,0]}
                                rotation={[Math.PI*1.5,0,0]}
                                
                            >
                                <boxGeometry args={[0.05,0.05,2]}/>
                                <meshBasicMaterial color={'blue'} wireframe visible={false}/>

                            </mesh>
                            {/* <SpearModel posX={0} posY={0} posZ={0} /> */}
                            {/* <SpearModel _ref={(val)=>weaponRef.current.spear=val} owner={'owner'} posX={-0.1} posY={0.25} posZ={0.1} /> */}
                            {/* <PlayerCursor x={0} y={0.15} z={2} /> */}
                            <PlayerCursor x={0} y={0.15} z={1} />
                           
                            
                        </mesh>
                        {/* <EnemyComponent /> */}
                        <group
                                ref={bulletGroupRef}
                                visible={_appContext.level.current==1? false:true}
                        >
                            {bulletContainer}
                        </group>
                        
                        {/* {mapBorderContainer} */}
                        {_appContext.devMode.current && <PlatformIndex />}
                        <fog attach={'fog'} args={[gameMapInfo.fogColor,gameMapInfo.fogNear,gameMapInfo.fogFar]} />
                        
                </gameAppContext.Provider>
            </>
}

//SIMULER UNE MARCHE A PIED EN CHANGEANT LE Y DE LA MAP

//ON VA CACHER LES ARMES POUR LA V2

//UN TIMER ENTRE CHAQUE TIRE