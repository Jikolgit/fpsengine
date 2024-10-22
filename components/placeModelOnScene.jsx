import { Barier_Model, ItemType1Model, ExitDoor_model, ItemType2Model, SpearModel,SpearModelOnMap, TreeDecor_model } from "./Game3DAssets";
import { Mob_2 } from "./mob_2";

export function placeModelOnScene(gloBalObject)
{
    for(let i =0;i<gloBalObject.GameMap.length;i++)
        {
            
            
            // if(gloBalObject.GameMap[i].objectType == 'coin')
            // {
            //     let arrElem = gloBalObject.GameMap[i].isOnScene?
            //     <group
            //     key={i}
            //     ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
            //     >
            //                 <mesh
                                
                                
            //                     position={[gloBalObject.GameMap[i].xPose,0.5,gloBalObject.GameMap[i].zPose]}
            //                     rotation={[0,0,0]}
            //                 >
            //                     <cylinderGeometry args={[0.2,0.2,0.7,10,1]} />
            //                     <meshBasicMaterial color={'blue'} />
            
            //                 </mesh>
                        
            //     </group> : null;
            //     gloBalObject.objectContainer.current[i] = arrElem
                
                
            // }
            
            if(gloBalObject.GameMap[i].objectType == 'item')
            { 
                let arrElem = gloBalObject.GameMap[i].isOnScene?
                <group
                key={i}
                ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                >
                {gloBalObject.GameMap[i].objectDesc.skin =='cauris_item' && 
                <ItemType1Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} 
                skin={gloBalObject.GameMap[i].objectDesc.skin} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose}  /> }
                {gloBalObject.GameMap[i].objectDesc.skin !='cauris_item' && 
                <ItemType2Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} skin={gloBalObject.GameMap[i].objectDesc.skin} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                }
                </group> : null;
                gloBalObject.objectContainer.current[i] = arrElem;
                
                
            }
            // else if(gloBalObject.GameMap[i].objectType == 'cauris_item')
            // {   
            //     let arrElem = gloBalObject.GameMap[i].isOnScene?
            //     <group
            //     key={i}
            //     ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
            //     >
                            
            //     <ItemType1Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} skin={'cauris'} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
    
            //     </group> : null;
            //     gloBalObject.objectContainer.current[i] = arrElem;
                
                
            // }
            // else if(gloBalObject.GameMap[i].objectType == 'heal_item')
            // {
            //     let arrElem = gloBalObject.GameMap[i].isOnScene?
            //     <group
            //     key={i}
            //     ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
            //     >
                            
            //         <ItemType2Model controller={{itemController:gloBalObject.itemController,index:gloBalObject.GameMap[i].objectId}} skin={'healJar'} visible={true} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
            //     </group> : null;
            //     gloBalObject.objectContainer.current[i] = arrElem
                
                
            // }
            else if(gloBalObject.GameMap[i].objectType == 'Exitdoor')
                {
                    let visibleState = true;
                    if(gloBalObject.level.current==13 || gloBalObject.level.current==9 || gloBalObject.level.current==11){visibleState = false}
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    visible={visibleState}
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                
                                <Barier_Model _for={'exit'} _visible={visibleState} refID={gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                            
                    </group> : null;
                    
                    if(gloBalObject.exitDoorVisible.value){gloBalObject.objectContainer.current[i] = arrElem}
                    gloBalObject.exitDoorMapIndexArr.value.push(i);
                    gloBalObject.exitDoorModelIndexArr.value.push({objectId:gloBalObject.GameMap[i].objectId,modelFunc:null})
                    
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
            // else if(gloBalObject.GameMap[i].objectType == 'wall')
            //     {
            //         let arrElem = gloBalObject.GameMap[i].isOnScene?
            //         <group
            //         key={i}
            //         ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
            //         >
            //                     <mesh
                                    
                                    
            //                         position={[gloBalObject.GameMap[i].xPose,1,gloBalObject.GameMap[i].zPose]}
            //                         rotation={[0,0,0]}
            //                     >
            //                         <boxGeometry args={[2,2,2]} />
            //                         <meshBasicMaterial color={'white'} wireframe />
                
            //                     </mesh>
                            
            //         </group> : null;
            //         gloBalObject.objectContainer.current[i] = arrElem
                    
                    
            //     }
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
            else if(gloBalObject.GameMap[i].objectType == 'mob_1')
                {
                    gloBalObject.mobIndexArr.value.push(gloBalObject.GameMap[i].objectId)
                    let arrElem = gloBalObject.GameMap[i].isOnScene?
                    <group
                    key={i}
                    ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
                    >
                                <Mob_2 _mobSkin={gloBalObject.GameMap[i].objectDesc.mobSkin} _attack={false} hasObject={gloBalObject.GameMap[i].objectDesc.hasObject} skin={gloBalObject.GameMap[i].objectDesc.skin} 
                                mobLife={gloBalObject.GameMap[i].objectDesc.life} maxMobLife={structuredClone(gloBalObject.GameMap[i].objectDesc.life)}  
                                mobObjectId = {gloBalObject.GameMap[i].objectId} x={gloBalObject.GameMap[i].xPose} z={gloBalObject.GameMap[i].zPose} />
                            
                    </group> : null;
                    gloBalObject.objectContainer.current[i] = arrElem
                }
            else if(gloBalObject.GameMap[i].objectType == 'mob_2')
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
            // else if(gloBalObject.GameMap[i].objectType == 'weapon')
            // {
            //     gloBalObject.spearModelIndexArr.value.push(gloBalObject.GameMap[i].objectId)
            //     let arrElem = gloBalObject.GameMap[i].isOnScene?
            //     <group
            //     key={i}
            //     ref={(val)=>{gloBalObject.objectRef.current[gloBalObject.GameMap[i].objectId] = val}}
            //     >
                    
            //             <mesh
                            
            //                 // rotation={[Math.PI*1.5,0,0]}
            //                 position={[gloBalObject.GameMap[i].xPose,0.5,gloBalObject.GameMap[i].zPose]}
            //             >
            //                 <boxGeometry args={[1,0.5]} />

            //                 <meshBasicMaterial color={'blue'} visible={false} />
            //                 {gloBalObject.GameMap[i].objectDesc.skin == 'spear' && <SpearModelOnMap _visible={true} posX={0} posY={0} posZ={0} /> }
                            
            //             </mesh>
                    
                    
            //     </group> : null;
            //     gloBalObject.objectContainer.current[i] = arrElem
                
                
            // }

            

                
        }
}