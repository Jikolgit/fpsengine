import React, { useContext, useEffect, useRef } from "react";
import { appContext } from "../src/App";
import { createLevel, createObject } from "./gameMap";
import { storyText } from "./gameStory";




/**
 * 
 * @param {{mobToKill:number,keyNumber:number,finalLevel:boolean,playerPosition:number}} param0 
 * @returns 
 */
export function UpdateLevelConfig({mobToKill,keyNumber,finalLevel,playerPosition})
{
  const AppCntext = useContext(appContext);

  AppCntext.levelInfo.current._MobToKillNumber = mobToKill? mobToKill : 0;
  AppCntext.levelInfo.current._KeyNumber = keyNumber? keyNumber : 0;
  AppCntext.levelInfo.current.finalLevel = finalLevel? finalLevel : false;
  AppCntext.playerPosition.current = playerPosition?playerPosition : 0
  

  return null
}
export function UpdatePlayerStat(props)
{ //creer une propriété pour ajouter les onfiguration par défaut et elles s'appliqueron au reste des niveau
  const AppCntext = useContext(appContext);
  if(props.moveSpeed == 0.05 || props.moveSpeed == 0.1 || props.moveSpeed == 0.2)
  {
    AppCntext.playerStats.current.moveSpeed = props.moveSpeed;
  }
  else
  {
    AppCntext.playerStats.current.moveSpeed = 0.1;
  }
  if(props.showWeapon)
  {
    AppCntext.playerStats.current.showWeapon = true;
  }
  else
  {
    AppCntext.playerStats.current.showWeapon = false;
  }
  if(props.life > 5 || props.life <= 0)
  {
    AppCntext.playerStats.current.life = 5;
  }
  else
  {
    AppCntext.playerStats.current.life = props.life;
  }
  if(props.shootInterval)
  {
    AppCntext.playerStats.current.shootInterval = props.shootInterval;
  }
  else
  {
    AppCntext.playerStats.current.shootInterval = 25;
  }
  return null
}

export function AddItem(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {
    if(props.name == 'heal_item')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'heal_item',skin:'heal_item_1',value:props.value?props.value:2,isImportant:true}
    }
    else if(props.name == 'coin_item')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:props.name,skin:'coin_item_1',value:props.value?props.value:1,isImportant:true}
    }
    else if(props.name == 'wallItem')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'wall_1',skin:'wall_1',value:props.value?props.value:0,isImportant:false}
    }
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
      createObject(AppCntext.gameMap.current,'item',objectDetailArr,i);
      
  }
  return null
}
export function AddWeapon(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {

      objectDetailArr[i] = {position:props.position[i],objectName:'weapon_item',skin:props.name,isImportant:true}
    
   
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
      createObject(AppCntext.gameMap.current,'item',objectDetailArr,i);
      
  }
  return null
}
/**
 * 
 * @param {{position:number,skin:string}} param0 
 * @returns 
 */
export function AddDecor({position,skin})
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<position.length;i++)
  {
    objectDetailArr[i] = {position:position[i],skin:skin}
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
            createObject(AppCntext.gameMap.current,'decor',objectDetailArr,i);
  }
  return null
}
/**
 * 
 * @param {{position : number[],open:boolean}} param0 
 * @returns 
 */
export function AddDoor({position,open})
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = [];

  for(let i = 0;i<position.length;i++)
  {
    objectDetailArr[i] = {open:open?open:false,position:position[i]}
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
            createObject(AppCntext.gameMap.current,'Exitdoor',objectDetailArr,i);
  }
  return null
}
/**
 * 
 * @param {{life:number,lootObject:boolean,active:boolean,position: number[]}} param0 
 * @returns 
 */
export function AddMob({life,lootObject,active,position,children})
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = [];
  let lifeProps = life? life : 2;
  let objectSkin = 'none'
  let hasObject = lootObject? lootObject : false;
  let objectValue = 1;
  let objectPosition = 0;
  let type = active? 'mob_2' : 'mob_1';

  if(children)
  {
    
    if(children.length)
    {
      if(children[0].props.name)
      {
        hasObject = children[0].props.name;
        objectValue = children[0].props.value? children[0].props.value : 1; 

        if(hasObject == 'heal_item'){objectSkin = 'heal_item_1'}
        if(hasObject == 'coin_item'){objectSkin = 'coin_item_1'}
      }
      else
      {
        
      }
      
    }
    else
    {
        if(children.props.name)
        {
          hasObject = children.props.name;
          objectValue = children.props.value? children.props.value : 1; 

          if(hasObject == 'heal_item'){objectSkin = 'heal_item_1'}
          if(hasObject == 'coin_item'){objectSkin = 'coin_item_1'}
        }
        else
        {
          
        }
      
    }
  }
  else
  {
    hasObject = false;
  }
  for(let i = 0;i<position.length;i++)
  {
    objectDetailArr[i] = {position:position[i],life:lifeProps,mobType:type,mobSkin:'dummy',hasObject:hasObject,fromMob:true,isImportant:false,
                          objectValue,objectPosition,objectSkin}
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
            createObject(AppCntext.gameMap.current,'mob',objectDetailArr,i);
  }
  return children? children : null
}
export function AddWall(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {

      objectDetailArr[i] = {position:props.position[i],objectName:'Wall_type_1',skin:'wall_1',destructible:props.destructible?props.destructible:false,life:props.value?props.value:0,isImportant:false}
    
  }
  for(let i =0;i<(AppCntext.mapWidth.current*AppCntext.mapHeight.current);i++)
  {   
      createObject(AppCntext.gameMap.current,'wall',objectDetailArr,i);
      
  }
  return null
}
/**
 * 
 * @param {{htmlContent:React.ReactNode[]}} param0 
 * @returns 
 */
export function UpdateStroryScreen({htmlContent,children})
{
  const AppCntext = useContext(appContext);
  
    if(children)
    {
      if(children.length)
      {
        storyText.value = children;
      }
      else
      {
        storyText.value = [children];
      }
      
    }
    else
    {
      storyText.value = ['none'];
    }
   
  useEffect(()=>
    {
      return()=>
        { 
          storyText.value = ['none'];
        }
    },[])
  return null
}

/**
 * 
 * @param {{minute:number,second:number}} param0 
 */
export function AddTimer({minute,second})
{
  let _appContext = useContext(appContext);
  const isUnmounted = useRef(false);
    if(second>=0 && second<60)
    {
      _appContext.levelInfo.current.timerSecond = second;
    }
    else
    {
      _appContext.levelInfo.current.timerSecond = 0;
    }
    if(minute>=0 && minute<10)
      {
        _appContext.levelInfo.current.timerMinute = minute;
      }
    else
    {
        _appContext.levelInfo.current.timerMinute = 0;
    }

    return null
}

/**
 * 
 * @param {{width:number,height:number,addWallOnMap:boolean}} param0 
 * @returns 
 */
export function SetMapDimension({width,height,addWallOnMap})
{
  let _appContext = useContext(appContext)
  _appContext.mapWidth.current = width? width : 16;
  _appContext.mapWidth.current = _appContext.mapWidth.current > 0? _appContext.mapWidth.current : 16;

  _appContext.mapHeight.current = height? height : 19;
  _appContext.mapHeight.current = _appContext.mapHeight.current > 0? _appContext.mapHeight.current : 19;

  _appContext.setMapWall.current = true

  _appContext.gameMap.current = createLevel(_appContext.level.current,_appContext.mapWidth.current,_appContext.mapHeight.current)
  return null
}

