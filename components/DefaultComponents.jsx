import { useContext } from "react";
import { appContext } from "../src/App";
import { createObject } from "./gameMap";



export function UpdateLevelConfig({mobToKill,keyNumber})
{
  const AppCntext = useContext(appContext);

  AppCntext.levelInfo.current._MobToKillNumber = mobToKill? mobToKill : 0;
  AppCntext.levelInfo.current._KeyNumber = keyNumber? keyNumber : 0;

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
 
  return null
}

export function AddItem(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {
    if(props.name == 'healItem')
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
export function AddWeapon(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {

      objectDetailArr[i] = {position:props.position[i],objectName:'weapon_item',skin:props.name,isImportant:true}
    
   
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
      createObject(AppCntext.gameMap,'item',objectDetailArr,i);
      
  }
  return null
}
export function AddDecor(props)
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

export function AddDoor(props)
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
/**
 * 
 * @param {{life:number,lootObject:boolean,active:boolean,position: number[]}} param0 
 * @returns 
 */
export function AddMob({life,lootObject,active,position})
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = [];
  let lifeProps = life? life : 2;
  let lootObjectProps = lootObject? lootObject : 'none'
  let hasObject = lootObject? true : false;
  let fromMob = lootObject? true : false;
  let type = active? 'mob_2' : 'mob_1'
  for(let i = 0;i<position.length;i++)
  {
    objectDetailArr[i] = {position:position[i],life:lifeProps,mobType:type,mobSkin:'dummy',hasObject:hasObject,fromMob:fromMob,isImportant:false,skin:lootObjectProps}
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
            createObject(AppCntext.gameMap,'mob',objectDetailArr,i);
  }
  return null
}
export function AddWall(props)
{
  const AppCntext = useContext(appContext);
  let objectDetailArr = []

  for(let i = 0;i<props.position.length;i++)
  {

      objectDetailArr[i] = {position:props.position[i],objectName:'Wall_type_1',skin:'wall_1',life:props.value?props.value:0,isImportant:false}
    
  }
  for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
  {   
      createObject(AppCntext.gameMap,'wall',objectDetailArr,i);
      
  }
  return null
}
// export function AddMobType2(props)
// {
//   const AppCntext = useContext(appContext);
//   let objectDetailArr = [];
//   let life = props.life? props.life : 2;
//   let lootObject = props.lootObject? props.lootObject : 'none'
//   let hasObject = props.lootObject? true : false;
//   let fromMob = props.lootObject? true : false;
//   for(let i = 0;i<props.position.length;i++)
//   {
//     objectDetailArr[i] = {position:props.position[i],life:life,mobSkin:'dummy',hasObject:hasObject,fromMob:fromMob,isImportant:false,skin:lootObject}
//   }
//   for(let i =0;i<(AppCntext.mapWidth*AppCntext.mapHeight);i++)
//   {   
//             createObject(AppCntext.gameMap,'dummy_mob_2',objectDetailArr,i);
//   }
//   return null
// }

