
let objectIdValue = 0;
let mapHeight = 19;
let mapWidth = 16;
function createLevelHeaderInfo(level)
{   
    let levelInfo = 
    {
        openExitCondition:null, //GET-KEY,KILL-MOB,DESTROY-OBJECTS,NO-CONDITIONS
        _KeyNumber:null,
        _MobToKillNumber:null,
        fogColor:'#5394ac',
        fogNear:0.1,
        fogFar:0

    }
    if(level == 1)
    {
        
        levelInfo._KeyNumber = 1;
        levelInfo._MobToKillNumber = 0;
    }
    else if(level == 2)
    {
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 2;
    }
    else if(level == 3)
    {
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 3;
    }
    else if(level == 4)
    {
        
        levelInfo._KeyNumber = 1;
        levelInfo._MobToKillNumber = 1;
    }
    else if(level == 5)
    {
        
        levelInfo._KeyNumber = 3;
        levelInfo._MobToKillNumber = 3;
    }
    else if(level == 6)
    {
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 3;
    }
    else if(level == 7)
    {
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 5;
    }
    else if(level == 8)
    {
        levelInfo.openExitCondition = 'NOTHING',
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 0;
    }
    else if(level == 9)
    {
        levelInfo.fogNear = 3;
        levelInfo.fogFar = 20;
    }
    else if(level == 10)
    {
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 3;
        levelInfo.fogNear = 3;
        levelInfo.fogFar = 20;
    }
    else if(level == 11)
    {
        levelInfo.fogColor = '#000000';
        levelInfo.fogNear = 3;
        levelInfo.fogFar = 20;
    }
    else if(level == 12)
    {     
        
        levelInfo._KeyNumber = 0;
        levelInfo._MobToKillNumber = 5;
        levelInfo.fogColor = '#000000';
        levelInfo.fogNear = 3;
        levelInfo.fogFar = 20;
    }
    else if(level == 13)
    {     

        levelInfo.fogColor = '#000000';
        levelInfo.fogNear = 3;
        levelInfo.fogFar = 40;
    }
    return levelInfo;
}
/**
 * 
 * @param {*[]} map_level 
 * @param {string} objectType 
 * @param {*[]} objectIndexArr 
 * @param {number} index 
 */
export function createObject(map_level,objectType,objectIndexArr,index)
{   
    for(let i =0;i<objectIndexArr.length;i++)
    {   
        if(objectIndexArr[i].position == index)
        {

            
            if(objectType == 'barier')
            {
                map_level[index].active = true,map_level[index].objectType ='barier', map_level[index].objectDesc={pass:objectIndexArr[i].pass}, map_level[index].object = true;map_level[index].objectId = objectIdValue;
                objectIdValue ++;
            }
            
            else if(objectType == 'mob')
            {   
                map_level[index].active = true,map_level[index].hasEnemy = true, map_level[index].objectType ='mob' ,map_level[index].isOnScene = true
                map_level[index].objectDesc={mobType:objectIndexArr[i].mobType,mobDifficulty:objectIndexArr[i].difficulty,mobSkin:objectIndexArr[i].mobSkin,life:objectIndexArr[i].life,
                                             hasObject:objectIndexArr[i].hasObject,objectName:objectIndexArr[i].hasObject,objectValue:objectIndexArr[i].objectValue,objectSkin:objectIndexArr[i].objectSkin,
                                             fromMob:true,isImportant:objectIndexArr[i].isImportant,objectIsImportant:objectIndexArr[i].objectIsImportant},
                map_level[index].object = true;map_level[index].objectId = objectIdValue;
                objectIdValue ++;
                
             
            }
            
            
            else if(objectType == 'item')
            {   
                if(objectIndexArr[i].objectName == 'box_item')
                {
                    map_level[index].active = true,map_level[index].objectType = objectType, map_level[index].isOnScene = true
                    map_level[index].objectDesc ={objectName:objectIndexArr[i].objectName,isImportant:objectIndexArr[i].isImportant,value:objectIndexArr[i].value,skin:objectIndexArr[i].skin,
                                                  objectLife:objectIndexArr[i].life,hasChildObject:objectIndexArr[i].hasChildObject,
                                                  childObjectSkin:objectIndexArr[i].childObjectSkin,childObjectValue:objectIndexArr[i].childObjectValue,childObjectIsImportant:objectIndexArr[i].childObjectIsImportant
                    },
                    map_level[index].object = true,map_level[index].objectId = objectIdValue
                    objectIdValue ++;
                }
                else if(objectIndexArr[i].objectName == 'upgrade_shoot_power_item' || objectIndexArr[i].objectName == 'upgrade_shoot_speed_item')
                {
                    map_level[index].active = true,map_level[index].objectType = objectType, map_level[index].isOnScene = true
                    map_level[index].objectDesc ={objectName:objectIndexArr[i].objectName,isImportant:objectIndexArr[i].isImportant,
                        value:objectIndexArr[i].value,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
                    objectIdValue ++;
                }
                else
                {
                    map_level[index].active = true,map_level[index].objectType = objectType, map_level[index].isOnScene = true
                    map_level[index].objectDesc ={objectName:objectIndexArr[i].objectName,isImportant:objectIndexArr[i].isImportant,value:objectIndexArr[i].value,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
                    objectIdValue ++;
                }
               
                
            }
            else if(objectType == 'wall')
            {   
                map_level[index].active = true,map_level[index].objectType = objectType, map_level[index].isOnScene = true
                map_level[index].objectDesc ={destructible:objectIndexArr[i].destructible,objectName:objectIndexArr[i].objectName,isImportant:objectIndexArr[i].isImportant,life:objectIndexArr[i].value,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
                objectIdValue ++;
                
            }
            
            else if(objectType == 'decor')
            {
                map_level[index].active = true,map_level[index].isOnScene = true,map_level[index].objectType ='decor',map_level[index].objectDesc={skin:objectIndexArr[i].skin} ,map_level[index].object = true
            }
            else if(objectType == 'final_exitDoor')
            {
                map_level[index].active = true,map_level[index].objectType ='final_exitDoor',map_level[index].object = true
            }
            
            else if(objectType == 'Exitdoor')
            {
                map_level[index].active = true,map_level[index].isOnScene = true,map_level[index].objectType ='Exitdoor', map_level[index].objectDesc ={open:objectIndexArr[i].open},map_level[index].object = true,map_level[index].objectId = objectIdValue;

                objectIdValue ++;
            }
        }
        
    }
}

function createMapTemplate()
{
    let mapTemplate = [];
    let xMap =1, zMap =1;
    let xLevel = 0,zLevel = 0;
    for(let i =0;i<(mapWidth*mapHeight);i++)
        {
            for(let i1 =0;i1<mapHeight;i1++)
            {
                if(i1 == 0){}
                else
                {
                    if(i == mapWidth*i1 )
                        {  
                            xLevel = 0;
                            zLevel +=2;
                        }
                }
                
            }
            mapTemplate[i] = 
            {
                id:i, 
                xPose:xMap + xLevel,
                zPose:zMap + zLevel,
                hasEnemy:false,
                isOnScene:false, // Est ce que l'objet présent à cette zone est toujours sur scène
                active:true,
                object:false,
                objectType:'none',
                objectId:"none",
                objectDesc:null,
                objectLimit:false, //La zone que les objects ne peuvent pas dépasser
                
                
            }
            for(let i2 =0;i2<mapHeight;i2++)
            {
                if(i2 == 0)
                {}
                else
                {
                    if(i<mapWidth || i>(mapWidth*(mapHeight-1)) || i == mapWidth*i2 || i == mapWidth*(i2+1)-1)
                    {   
                        mapTemplate[i].objectLimit = true
                        
                    }
                }
                
                    
            }

            xLevel += 2;
        }

    return mapTemplate
}
/**
 * 
 * @param {number} level 
 * @returns {{id:number,xPose:number,zPose:number;hasEnemy:boolean,
 *              isOnScene:boolean,active:boolean,object:boolean,
*              objectType:string,objectId:string,objectDesc:*,objectLimit:boolean}[]}
 */
export function createLevel(level,mapW,mapH)
{

        mapHeight = mapH;
        mapWidth = mapW;
        let mapTemplate = createMapTemplate()
        

    return mapTemplate;
}
let defaultObjectInfo = 
        {
            objectType:'STATIC', // DYNAMIC-ITEM STATIC-ITEM 
            position:0,
            name:'none', // ITEM OR MOB
            effect:'none', // APPLY WHEN SHOOT OR INTERACT 1-INCREASE PLAYER STAT 2-GET A WEAPON OR KEY 3-UPDATE PROPERTY OF ANOTHER OBJECT ON THE MAP
            isImportant:false, // IS REQUIRED TO GO NEXT LEVEL ONLY DYNAMIC-ITEM CAN BE IMPORTANT
            loot:false, // IF A DYNAMIC-ITEM CAN DROP AN OBJECT OR NOT, OBJECT DROPPED FROM LOOT ARE
            open:false, // FOR DOOR OBJECT ONLY, TRUE IF AREA WIN CONDITION ARE COMPLETED
            

        }

// POUR LES OBJETS DE BASE QUE JE VAIS INTEGRER
// function addHealObjectonMap(position,value,isImportant) 
// {
//     for(let i =0;i<(mapWidth*mapHeight);i++)
//     {
//         createObject(mapTemplate,'heal_item',[{position:position,heal:value,skin:'jar',isImportant:isImportant}],i);
//     }
    
// }
export function addWeaponObjectonMap(name,position) 
{
    for(let i =0;i<(mapWidth*mapHeight);i++)
    {
        createObject(mapTemplate,'item',[{position:position,heal:null,skin:name,isImportant:true}],i);
    }
}
function addCoinObjectonMap(name,position,) 
{
    
}
function addHealObjectonMap(name,position,) 
{
    
}
function addDecorObjectonMap(name,position) 
{
    
}
function createObjectonMap(name) // SI ON VEUT CREER SES PROPRES OBJETS
{
    
}
// map_level = createLevel(1)
// map_level_2 = createLevel(2)
//export {map_level,map_level_2}

 /* 1 a 3*/
 // 3 TYPES DOBJET A RAMASSER
 // 1- CAURIS
 // 2- ARMES
 // 3- POTION DE SANTE