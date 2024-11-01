import { Barier_Model, ItemType1Model, ExitDoor_model, ItemType2Model, SpearModel,SpearModelOnMap, TreeDecor_model, WallModel, GroundModel } from "./Game3DAssets";
import { Mob_2 } from "./mob_2";

export function placeModelOnScene(gloBalObject)
{
    for(let i =0;i<gloBalObject.GameMap.length;i++)
        {
            
            
            gloBalObject.platformModelContainer.current[i] = <GroundModel x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
            if(gloBalObject.GameMap[i].objectType == 'item')
            { 
                let objectComponents=null;
                if(gloBalObject.GameMap[i].objectDesc.skin =='coin_item_1')
                {objectComponents =<ItemType1Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} 
                skin={gloBalObject.GameMap[i].objectDesc.skin} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose}  /> }
                else if(gloBalObject.GameMap[i].objectDesc.skin =='dummy')
                {
                    objectComponents =<Mob_2 _mobSkin={gloBalObject.GameMap[i].objectDesc.skin} _attack={false} hasObject={gloBalObject.GameMap[i].objectDesc.hasObject} skin={gloBalObject.GameMap[i].objectDesc.skin} 
                    mobLife={gloBalObject.GameMap[i].objectDesc.life} maxMobLife={structuredClone(gloBalObject.GameMap[i].objectDesc.life)}  
                    mobObjectId = {gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                }
                else
                {
                    objectComponents = <ItemType2Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} 
                    skin={gloBalObject.GameMap[i].objectDesc.skin} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                }
                let arrElem = gloBalObject.GameMap[i].isOnScene?
                <group
                key={i}
                ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                >
                {objectComponents}
                </group> : null;
                gloBalObject.objectContainer.current[i] = arrElem;
                
            }
            if(gloBalObject.GameMap[i].objectType == 'wall')
            { 
                let objectComponents=null;
                if(gloBalObject.GameMap[i].objectDesc.skin =='wall_1')
                {
                    objectComponents = <WallModel controller={{wallController:gloBalObject.wallController,index:gloBalObject.GameMap[i].objectId}} 
                    skin={gloBalObject.GameMap[i].objectDesc.skin} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                }
                let arrElem = gloBalObject.GameMap[i].isOnScene?
                <group
                key={i}
                ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                >
                {objectComponents}
                </group> : null;
                gloBalObject.objectContainer.current[i] = arrElem;
                
            }
            else if(gloBalObject.GameMap[i].objectType == 'Exitdoor')
            {
                let objectComponents=null;
                
                objectComponents = <ExitDoor_model controller={{exitDoorController:gloBalObject.exitDoorController,index:gloBalObject.GameMap[i].objectId}} 
                skin={gloBalObject.GameMap[i].objectDesc.skin} isOpen={gloBalObject.GameMap[i].objectDesc.open } visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                
                let arrElem = gloBalObject.GameMap[i].isOnScene?
                <group
                key={i}
                ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                >
                {objectComponents}
                </group> : null;
                gloBalObject.objectContainer.current[i] = arrElem;

                                    
                    gloBalObject.exitDoorMapIndexArr.value.push(i);
                    
            }

            else if(gloBalObject.GameMap[i].objectType == 'final_exitDoor')
                {
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                
                            <ExitDoor_model x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                    </group> : null;
                    gloBalObject.objectContainer.current[i] = arrElem
                    
                    
                }
            else if(gloBalObject.GameMap[i].objectType == 'decor')
                {
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                
                            <TreeDecor_model x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                    </group> : null;
                    gloBalObject.objectContainer.current[i] = arrElem
                    
                    
                }
            
            else if(gloBalObject.GameMap[i].objectType == 'barier')
                {
                    gloBalObject.barierMapIndexArr.value.push(i)
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                
                            <Barier_Model _for={'barier'} refID={gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                    </group> : null;
                    gloBalObject.barierModelIndexArr.value.push({objectId:gloBalObject.GameMap[i].objectId,ModelFunc:null});
                    gloBalObject.objectContainer.current[i] = arrElem
                    
                    
                }
            else if(gloBalObject.GameMap[i].objectType == 'dummy_mob_2')
                {
                    gloBalObject.mobIndexArr.value.push(gloBalObject.GameMap[i].objectId)
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                <Mob_2 _mobSkin={gloBalObject.GameMap[i].objectDesc.mobSkin} _attack={true} hasObject={gloBalObject.GameMap[i].objectDesc.hasObject} skin={gloBalObject.GameMap[i].objectDesc.skin} 
                                mobLife={gloBalObject.GameMap[i].objectDesc.life} maxMobLife={structuredClone(gloBalObject.GameMap[i].objectDesc.life)}  
                                mobObjectId = {gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                            
                    </group> : null;
                    gloBalObject.objectContainer.current[i] = arrElem
                }
            else if(gloBalObject.GameMap[i].objectType == 'mob')
                {  
                    let objectComponents=null;
                    if(gloBalObject.GameMap[i].objectDesc.mobType=='mob_1')
                    {
                        objectComponents = <Mob_2 _mobSkin={gloBalObject.GameMap[i].objectDesc.mobSkin} _attack={false} hasObject={gloBalObject.GameMap[i].objectDesc.hasObject} objectSkin={gloBalObject.GameMap[i].objectDesc.objectSkin} 
                        mobLife={gloBalObject.GameMap[i].objectDesc.life} maxMobLife={structuredClone(gloBalObject.GameMap[i].objectDesc.life)}  
                        mobObjectId = {gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                    }
                    else if(gloBalObject.GameMap[i].objectDesc.mobType=='mob_2')
                    {
                        objectComponents = <Mob_2 _mobSkin={gloBalObject.GameMap[i].objectDesc.mobSkin} _attack={true} hasObject={gloBalObject.GameMap[i].objectDesc.hasObject} objectSkin={gloBalObject.GameMap[i].objectDesc.objectSkin} 
                        mobLife={gloBalObject.GameMap[i].objectDesc.life} maxMobLife={structuredClone(gloBalObject.GameMap[i].objectDesc.life)}  
                        mobObjectId = {gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                    }
                    gloBalObject.mobIndexArr.value.push(gloBalObject.GameMap[i].objectId)
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                            {objectComponents}
                            
                    </group> : null;
                    gloBalObject.objectContainer.current[i] = arrElem
                }
            

            

                
        }
}