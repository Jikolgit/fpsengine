import { useContext } from "react";
import { appContext } from "../src/App";
import { createObject } from "./gameMap";



export function UpdateLevelConfig(props)
{
  const AppCntext = useContext(appContext);

  AppCntext.levelInfo.current._MobToKillNumber = props.mobToKill? props.mobToKill : 0;
  AppCntext.levelInfo.current._KeyNumber = props.keyNumber? props.keyNumber : 0;

  return null
}
export function UpdatePlayerStat(props)
{
  const AppCntext = useContext(appContext);
  if(props.moveSpeed == 0.05 || props.moveSpeed == 0.1 || props.moveSpeed == 0.2)
  {
    AppCntext.playerStats.current.moveSpeed = props.moveSpeed;
  }
  else
  {
    AppCntext.playerStats.current.moveSpeed = 0.1;
  }

  if(props.life > 5 || props.life <= 0)
  {
    AppCntext.playerStats.current.life = 5;
  }
  else
  {
    AppCntext.playerStats.current.life = props.life;
  }
 
  return null
}

export function AddItem(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {
    if(props.name == 'spear')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'weapon_item',skin:'spear',isImportant:true}
    }
    else if(props.name == 'healItem')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'heal_item',skin:'heal_item_1',value:props.value?props.value:2,isImportant:true}
    }
    else if(props.name == 'coinItem')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'coin_item',skin:'cauris_item',value:props.value?props.value:1,isImportant:true}
    }
    else if(props.name == 'wallItem')
    {
      objectDetailArr[i] = {position:props.position[i],objectName:'wall_1',skin:'wall_1',value:props.value?props.value:0,isImportant:false}
    }
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
      createObject(AppCntext.gameMap,'item',objectDetailArr,i);
      
  }
  return null
}

export function AddDecorItem(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {
    objectDetailArr[i] = {position:props.position[i],decorType:'tree'}
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
            createObject(AppCntext.gameMap,'decor',objectDetailArr,i);
  }
  return null
}

export function AddExitDoor(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {
    objectDetailArr[i] = {open:false,position:props.position[i]}
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
            createObject(AppCntext.gameMap,'Exitdoor',objectDetailArr,i);
  }
  return null
}

export function AddMobType1(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = [];
  let life = props.life? props.life : 2;
  let lootObject = props.lootObject? props.lootObject : 'none'
  let hasObject = props.lootObject? true : false;
  let fromMob = props.lootObject? true : false;
  for(let i = 0;i<props.position.length;i++)
  {
    objectDetailArr[i] = {position:props.position[i],life:life,mobSkin:'dummy',hasObject:hasObject,fromMob:fromMob,isImportant:false,skin:lootObject}
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
            createObject(AppCntext.gameMap,'mob_1',objectDetailArr,i);
  }
  return null
}

export function AddMobType2(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = [];
  let life = props.life? props.life : 2;
  let lootObject = props.lootObject? props.lootObject : 'none'
  let hasObject = props.lootObject? true : false;
  let fromMob = props.lootObject? true : false;
  for(let i = 0;i<props.position.length;i++)
  {
    objectDetailArr[i] = {position:props.position[i],life:life,mobSkin:'dummy',hasObject:hasObject,fromMob:fromMob,isImportant:false,skin:lootObject}
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
            createObject(AppCntext.gameMap,'dummy_mob_2',objectDetailArr,i);
  }
  return null
}

