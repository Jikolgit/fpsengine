
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

            // if(objectType == 'wall')
            // {
            //     map_level[index].active = true,map_level[index].objectType ='wall' ,map_level[index].object = true;map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            if(objectType == 'barier')
            {
                map_level[index].active = true,map_level[index].objectType ='barier', map_level[index].objectDesc={pass:objectIndexArr[i].pass}, map_level[index].object = true;map_level[index].objectId = objectIdValue;
                objectIdValue ++;
            }
            // else if(objectType == 'dummy_mob_2')
            // {
            //     map_level[index].active = true,map_level[index].hasEnemy = true, map_level[index].objectType ='dummy_mob_2' ,
            //     map_level[index].objectDesc={mobSkin:objectIndexArr[i].mobSkin,life:objectIndexArr[i].life,hasObject:objectIndexArr[i].hasObject,fromMob:objectIndexArr[i].fromMob,skin:objectIndexArr[i].skin,isImportant:objectIndexArr[i].isImportant},
            //     map_level[index].object = true;map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            // else if(objectType == 'mob_1')
            // {
            //     map_level[index].active = true,map_level[index].hasEnemy = true, map_level[index].objectType ='mob_1' ,
            //     map_level[index].objectDesc={mobSkin:objectIndexArr[i].mobSkin,life:objectIndexArr[i].life,hasObject:objectIndexArr[i].hasObject,fromMob:objectIndexArr[i].fromMob,skin:objectIndexArr[i].skin,isImportant:objectIndexArr[i].isImportant},
            //     map_level[index].object = true;map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            // else if(objectType == 'mob_2')
            // {
            //     map_level[index].active = true,map_level[index].hasEnemy = true, map_level[index].objectType ='mob_2' ,
            //     map_level[index].objectDesc={mobSkin:objectIndexArr[i].mobSkin,life:objectIndexArr[i].life,hasObject:objectIndexArr[i].hasObject,fromMob:objectIndexArr[i].fromMob,skin:objectIndexArr[i].skin,isImportant:objectIndexArr[i].isImportant},map_level[index].object = true;map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            // else if(objectType == 'heal_item')
            // {   console.log('ici')
            //     map_level[index].active = true,map_level[index].objectType ='heal_item', map_level[index].objectDesc ={isImportant:objectIndexArr[i].isImportant,heal:objectIndexArr[i].heal,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
            //     objectIdValue ++;
            // }
            else if(objectType == 'item')
            {   
                map_level[index].active = true,map_level[index].objectType = objectType, 
                map_level[index].objectDesc ={objectName:objectIndexArr[i].objectName,isImportant:objectIndexArr[i].isImportant,value:objectIndexArr[i].value,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
                objectIdValue ++;
                
            }
            // else if(objectType == 'cauris_item')
            // {
            //     map_level[index].active = true,map_level[index].objectType ='cauris_item', map_level[index].objectDesc ={value:objectIndexArr[i].value,skin:objectIndexArr[i].skin},map_level[index].object = true,map_level[index].objectId = objectIdValue
            //     objectIdValue ++;
            // }
            else if(objectType == 'decor')
            {
                map_level[index].active = true,map_level[index].objectType ='decor',map_level[index].objectDesc={decorType:objectIndexArr[i].decorType} ,map_level[index].object = true
            }
            else if(objectType == 'final_exitDoor')
            {
                map_level[index].active = true,map_level[index].objectType ='final_exitDoor',map_level[index].object = true
            }
            // else if(objectType == 'coin')
            // {
            //     map_level[index].active = true,map_level[index].objectType ='coin' , map_level[index].objectDesc ={value:objectIndexArr[i].value},map_level[index].object = true,map_level[index].objectId = objectIdValue
            //     objectIdValue ++;
            // }
            // else if(objectType == 'chest')
            // {
            //     map_level[index].active = true,map_level[index].objectType ='chest' , map_level[index].objectDesc ={life:objectIndexArr[i].life,hasKey:false},map_level[index].object = true,map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            // else if(objectType == 'weapon')
            // {
            //     map_level[index].active = true,map_level[index].objectType ='weapon' , map_level[index].objectDesc ={skin:objectIndexArr[i].skin,isImportant:objectIndexArr[i].isImportant},map_level[index].object = true,map_level[index].objectId = objectIdValue;
            //     objectIdValue ++;
            // }
            else if(objectType == 'Exitdoor')
            {
                map_level[index].active = true,map_level[index].objectType ='Exitdoor', map_level[index].objectDesc ={open:objectIndexArr[i].open},map_level[index].object = true,map_level[index].objectId = objectIdValue;

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
                isOnScene:true, // Est ce que l'objet présent à cette zone est toujours sur scène
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
                    {mapTemplate[i].objectLimit = true}
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
export function createLevel(level)
{

        let mapTemplate = createMapTemplate()
        
        for(let i =0;i<(mapWidth*mapHeight);i++)
        {
                if(level == 1)
                {   

                    // createObject(mapTemplate,'item',[{position:135,heal:null,skin:"spear",isImportant:true}],i);
                    // createObject(mapTemplate,'Exitdoor',[{open:false,position:240},{open:false,position:241},{open:false,position:242},{open:false,position:243},
                    //                                      {open:false,position:244},{open:false,position:245},{open:false,position:246},{open:false,position:247},
                    //                                      {open:false,position:248},{open:false,position:249},{open:false,position:250},{open:false,position:251},
                    //                                      {open:false,position:252},{open:false,position:253},{open:false,position:254},{open:false,position:255}],i);
                    // createObject(mapTemplate,'decor',[{position:45,decorType:'tree'},{position:66,decorType:'tree'},{position:192,decorType:'tree'},
                    //     {position:147,decorType:'tree'},{position:126,decorType:'tree'},{position:187,decorType:'tree'}
                    // ],i);

                    
        
                }
                else if(level == 2)
                {
                    // createObject(mapTemplate,'decor',[{position:126,decorType:'tree'},{position:156,decorType:'tree'},{position:114,decorType:'tree'},
                    //     {position:133,decorType:'tree'},{position:185,decorType:'tree'}
                    // ],i);
                    // createObject(mapTemplate,'Exitdoor',[{open:false,position:240},{open:false,position:241},{open:false,position:242},{open:false,position:243},
                    //     {open:false,position:244},{open:false,position:245},{open:false,position:246},{open:false,position:247},
                    //     {open:false,position:248},{open:false,position:249},{open:false,position:250},{open:false,position:251},
                    //     {open:false,position:252},{open:false,position:253},{open:false,position:254},{open:false,position:255}],i);
                    // createObject(mapTemplate,'mob_1',[{position:134,life:2,mobSkin:'dummy',hasObject:false,fromMob:false,isImportant:false,skin:'none'},{position:168,life:2,mobSkin:'dummy',hasObject:false,fromMob:false,isImportant:false,skin:'none'}],i);

                }
                else if(level == 3)
                {
  
                    // createObject(mapTemplate,'Exitdoor',[{open:false,position:240},{open:false,position:241},{open:false,position:242},{open:false,position:243},
                    //     {open:false,position:244},{open:false,position:245},{open:false,position:246},{open:false,position:247},
                    //     {open:false,position:248},{open:false,position:249},{open:false,position:250},{open:false,position:251},
                    //     {open:false,position:252},{open:false,position:253},{open:false,position:254},{open:false,position:255}],i);
                    // createObject(mapTemplate,'mob_1',[{position:62,mobSkin:'dummy',life:3,hasObject:false,fromMob:false,isImportant:false,skin:'none'},
                    //                                   {position:148,mobSkin:'dummy',life:3,hasObject:false,fromMob:false,isImportant:false,skin:'none'},
                    //                                   {position:140,mobSkin:'dummy',life:3,isImportant:false,hasObject:false,fromMob:false,skin:'none'}],i);
                    // createObject(mapTemplate,'decor',[{position:46,decorType:'tree'},{position:60,decorType:'tree'},{position:189,decorType:'tree'},
                    //     {position:122,decorType:'tree'},{position:149,decorType:'tree'},{position:20,decorType:'tree'},{position:65,decorType:'tree'},{position:85,decorType:'tree'}
                    // ],i);
        
                }
                else if(level == 4)
                {
  
                    // createObject(mapTemplate,'decor',[{position:46,decorType:'tree'},{position:50,decorType:'tree'},{position:158,decorType:'tree'},
                    //     {position:184,decorType:'tree'},{position:149,decorType:'tree'},{position:132,decorType:'tree'},{position:147,decorType:'tree'}
                    // ],i); 
                    // createObject(mapTemplate,'Exitdoor',[{open:false,position:240},{open:false,position:241},{open:false,position:242},{open:false,position:243},
                    //     {open:false,position:244},{open:false,position:245},{open:false,position:246},{open:false,position:247},
                    //     {open:false,position:248},{open:false,position:249},{open:false,position:250},{open:false,position:251},
                    //     {open:false,position:252},{open:false,position:253},{open:false,position:254},{open:false,position:255}],i);
                    // createObject(mapTemplate,'mob_1',[{position:146,mobSkin:'dummy',life:2,hasObject:true,fromMob:true,isImportant:true,skin:'cauris_item'},
                    //                                   {position:94,mobSkin:'dummy',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'}
                    // ],i);    
                }
                else if(level == 5)
                {

                    createObject(mapTemplate,'decor',[{position:2,decorType:'tree'},{position:0+(mapWidth*4),decorType:'tree'},{position:14+(mapWidth*5),decorType:'tree'},
                        {position:6+(mapWidth*10),decorType:'tree'},{position:13+(mapWidth*8),decorType:'tree'}
                    ],i);   
                    createObject(mapTemplate,'Exitdoor',[{open:false,position:0+(mapWidth*15)},{open:false,position:1+(mapWidth*15)},{open:false,position:2+(mapWidth*15)},{open:false,position:3+(mapWidth*15)},
                        {open:false,position:4+(mapWidth*15)},{open:false,position:5+(mapWidth*15)},{open:false,position:6+(mapWidth*15)},{open:false,position:7+(mapWidth*15)},
                        {open:false,position:8+(mapWidth*15)},{open:false,position:9+(mapWidth*15)},{open:false,position:10+(mapWidth*15)},{open:false,position:11+(mapWidth*15)},
                        {open:false,position:12+(mapWidth*15)},{open:false,position:13+(mapWidth*15)},{open:false,position:14+(mapWidth*15)},{open:false,position:15+(mapWidth*15)}],i);
                    createObject(mapTemplate,'mob_1',[{position:1+(mapWidth*3),mobSkin:'dummy',life:2,hasObject:true,fromMob:true,isImportant:true,skin:'cauris_item'},{position:14+(mapWidth*4),mobSkin:'dummy',life:3,hasObject:true,fromMob:true,isImportant:true,skin:'cauris_item'},
                        {position:6+(mapWidth*8),mobSkin:'dummy',life:3,hasObject:true,fromMob:true,isImportant:true,skin:'cauris_item'}
                    ],i); 
                }
                else if(level == 6)
                {
                    createObject(mapTemplate,'barier',[{pass:false,position:48+(16*1)},{pass:false,position:49+(16*1)},{pass:false,position:50+(16*1)},{pass:false,position:51+(16*1)},{pass:false,position:52+(16*1)},{pass:false,position:53+(16*1)},{pass:false,position:54+(16*1)},
                        {pass:false,position:55+(16*1)},{pass:false,position:56+(16*1)},{pass:false,position:57+(16*1)},{pass:false,position:58+(16*1)},{pass:false,position:59+(16*1)},{pass:false,position:60+(16*1)},
                        {pass:false,position:61+(16*1)},{pass:false,position:62+(16*1)},{pass:false,position:63+(16*1)}
                    ],i); 
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                    createObject(mapTemplate,'dummy_mob_2',[{position:114,mobSkin:'dummy',life:1,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                        {position:125,mobSkin:'dummy',life:1,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                        {position:136,mobSkin:'dummy',life:1,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'}
                    ],i); 
                    // createObject(mapTemplate,'heal_item',[{position:118,heal:2,skin:'jar'},{position:122,heal:2,skin:'jar'}],i);
                }
                else if(level == 7)
                {
                    createObject(mapTemplate,'decor',[{position:126,decorType:'tree'},{position:156,decorType:'tree'},{position:114,decorType:'tree'},
                        {position:133,decorType:'tree'},{position:185,decorType:'tree'}
                    ],i);
                    createObject(mapTemplate,'barier',[{pass:false,position:48+(16*1)},{pass:false,position:49+(16*1)},{pass:false,position:50+(16*1)},{pass:false,position:51+(16*1)},{pass:false,position:52+(16*1)},{pass:false,position:53+(16*1)},{pass:false,position:54+(16*1)},
                        {pass:false,position:55+(16*1)},{pass:false,position:56+(16*1)},{pass:false,position:57+(16*1)},{pass:false,position:58+(16*1)},{pass:false,position:59+(16*1)},{pass:false,position:60+(16*1)},
                        {pass:false,position:61+(16*1)},{pass:false,position:62+(16*1)},{pass:false,position:63+(16*1)}
                    ],i); 
                    createObject(mapTemplate,'Exitdoor',[{open:false,position:240},{open:false,position:241},{open:false,position:242},{open:false,position:243},
                        {open:false,position:244},{open:false,position:245},{open:false,position:246},{open:false,position:247},
                        {open:false,position:248},{open:false,position:249},{open:false,position:250},{open:false,position:251},
                        {open:false,position:252},{open:false,position:253},{open:false,position:254},{open:false,position:255}],i);
                    createObject(mapTemplate,'dummy_mob_2',[{position:94,mobSkin:'dummy',life:2,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                                                            {position:91,mobSkin:'dummy',life:3,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                                                            {position:85,mobSkin:'dummy',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'cauris_item'},
                                                            {position:82,mobSkin:'dummy',life:3,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                                                            {position:87,mobSkin:'dummy',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'cauris_item'}
                    ],i); 
                }
                else if(level == 8)
                {
                    createObject(mapTemplate,'decor',[{position:126,decorType:'tree'},{position:156,decorType:'tree'},{position:114,decorType:'tree'},
                        {position:133,decorType:'tree'},{position:185,decorType:'tree'}
                    ],i);
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                    // createObject(mapTemplate,'heal_item',[{position:119,heal:2,skin:'jar',isImportant:true}],i);
                    createObject(mapTemplate,'item',[{position:135,value:2,skin:"heal_item_1",isImportant:true}],i);
                    // createObject(mapTemplate,'cauris_item',[{position:39,value:2,skin:'cauris'}],i);
                }
                else if(level == 9)
                {
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);

                    
                }
                else if(level == 10)
                {
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                    createObject(mapTemplate,'barier',[{pass:false,position:48+(16*1)},{pass:false,position:49+(16*1)},{pass:false,position:50+(16*1)},{pass:false,position:51+(16*1)},{pass:false,position:52+(16*1)},{pass:false,position:53+(16*1)},{pass:false,position:54+(16*1)},
                        {pass:false,position:55+(16*1)},{pass:false,position:56+(16*1)},{pass:false,position:57+(16*1)},{pass:false,position:58+(16*1)},{pass:false,position:59+(16*1)},{pass:false,position:60+(16*1)},
                        {pass:false,position:61+(16*1)},{pass:false,position:62+(16*1)},{pass:false,position:63+(16*1)}
                    ],i); 
                    createObject(mapTemplate,'mob_2',[{position:98,mobSkin:'mob2',life:2,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                        {position:110,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'},
                        {position:119,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'}
                    ],i);  
                    
                }
                else if(level == 11)
                {
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                    createObject(mapTemplate,'heal_item',[{position:119,heal:2,skin:'jar'}],i);
                    createObject(mapTemplate,'cauris_item',[{position:66,value:2,skin:'cauris'},{position:62,value:2,skin:'cauris'},{position:156,value:2,skin:'cauris'},{position:198,value:2,skin:'cauris'}],i);
                    
                }
                else if(level == 12)
                {
                    createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                        {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                        {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                        {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                    createObject(mapTemplate,'barier',[{pass:false,position:48+(16*1)},{pass:false,position:49+(16*1)},{pass:false,position:50+(16*1)},{pass:false,position:51+(16*1)},{pass:false,position:52+(16*1)},{pass:false,position:53+(16*1)},{pass:false,position:54+(16*1)},
                        {pass:false,position:55+(16*1)},{pass:false,position:56+(16*1)},{pass:false,position:57+(16*1)},{pass:false,position:58+(16*1)},{pass:false,position:59+(16*1)},{pass:false,position:60+(16*1)},
                        {pass:false,position:61+(16*1)},{pass:false,position:62+(16*1)},{pass:false,position:63+(16*1)}
                    ],i); 
                    createObject(mapTemplate,'heal_item',[{position:119,heal:2,skin:'jar'}],i);
                    createObject(mapTemplate,'mob_2',[{position:98,mobSkin:'mob2',life:2,hasObject:true,fromMob:true,isImportant:false,skin:'cauris_item'},
                        {position:110,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'},
                        {position:119,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'},
                        {position:92,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'},
                        {position:88,mobSkin:'mob2',life:3,hasObject:false,fromMob:true,isImportant:false,skin:'none'}
                    ],i); 
                }
                else if(level == 13)
                    {
                        createObject(mapTemplate,'Exitdoor',[{open:true,position:240},{open:true,position:241},{open:true,position:242},{open:true,position:243},
                            {open:true,position:244},{open:true,position:245},{open:true,position:246},{open:true,position:247},
                            {open:true,position:248},{open:true,position:249},{open:true,position:250},{open:true,position:251},
                            {open:true,position:252},{open:true,position:253},{open:true,position:254},{open:true,position:255}],i);
                        createObject(mapTemplate,'final_exitDoor',[{position:247+(16*3)}
                                
                            ],i);
                        
                    }
        }
    // return [mapTemplate,createLevelHeaderInfo(level)];
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