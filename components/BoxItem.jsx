import { useEffect } from "react";
import { ItemType2Model } from "./Game3DAssets";

export function BoxItem(props)
{
    let parentItemController = {value:[]};
    let childItemController = {value:[]};
    useEffect(()=>
        { 
            
          props.controller.itemController.value[props.controller.index] = (args,params)=>
          {
              if(args == 'SHOW-CHILD-ITEM')
              {
               
                parentItemController.value[0]('REMOVE-ITEM')
                childItemController.value[0]('SHOW-ITEM')
              }

              else if(args == 'REMOVE-ITEM')
              {
                childItemController.value[0]('REMOVE-ITEM')
              }

              else if(args == 'Update-Item-Life')
              {
                console.log('il reste '+params)
              }

              else if(args == 'destroy-Item')
              {
                console.log('vue')
                params();
              }
          } 
        },[])
        
    return(
            <>
                <group>
                        <ItemType2Model controller={{itemController:parentItemController,index:0}} 
                        skin={props.skin} x={props.x} z={props.z} _visible={true}
                        />
                        {props.hasChildObject?
                            <>
                            {props.childObjectSkin == 'coin_item_1'? null :
                                <ItemType2Model controller={{itemController:childItemController,index:0}} 
                                skin={props.childObjectSkin} x={props.x} z={props.z} _visible={false}
                                />
                            }
                            </>
                            :
                            null
                        }
                </group>
            </>
    )
}