import { AudioManage } from "./audioComponents";

export function moveBullet(gloBalObject)
{
    if(gloBalObject.weaponReload.start)
    {
        gloBalObject.weaponReload.time ++;

        if(gloBalObject.weaponReload.time == gloBalObject.weaponReload.timeLimite)
        {
            prepareNextBullet(gloBalObject)
            gloBalObject.weaponReload.time = 0;
            
            gloBalObject.weaponReload.start = false
        }
    }
    for(let i = 0;i<gloBalObject.bulletRef.current.length;i++)
    {
        
        if(gloBalObject.bulletRefInfo.current[i].prepareMove)
        {
            if(!gloBalObject.bulletRefInfo.current[i].hasCheckNextPlatform)
            {
                let checkResult =   checkifBulletCanMoveNextPlatform(i,gloBalObject.playerDirection,gloBalObject)

                gloBalObject.bulletRefInfo.current[i].hasCheckNextPlatform = true;
                gloBalObject.bulletRefInfo.current[i].moveDistance = 2;
                gloBalObject.bulletRefInfo.current[i].move = checkResult;
                
                
            }
            else
            {   // LA BALLE BOUGE
                if(gloBalObject.bulletRefInfo.current[i].moveDistance > 0)
                {   
                    gloBalObject.bulletRefInfo.current[i].moveDistance -= Math.round(gloBalObject.bulletSpeed * 100) / 100;

                    if(gloBalObject.bulletRefInfo.current[i].direction == 'FRONT' )
                    {
                        
                        gloBalObject.bulletRef.current[i].position.z += Math.round(gloBalObject.bulletSpeed * 100) / 100;
                        gloBalObject.bulletRef.current[i].position.z = Math.round(gloBalObject.bulletRef.current[i].position.z * 100) / 100;

                    }
                    else if(gloBalObject.bulletRefInfo.current[i].direction == 'BACK' )
                    {
                        gloBalObject.bulletRef.current[i].position.z -= Math.round(gloBalObject.bulletSpeed * 100) / 100;
                        gloBalObject.bulletRef.current[i].position.z = Math.round(gloBalObject.bulletRef.current[i].position.z * 100) / 100;

                    }
                    else if(gloBalObject.bulletRefInfo.current[i].direction == 'LEFT' )
                    {
                        gloBalObject.bulletRef.current[i].position.x += Math.round(gloBalObject.bulletSpeed * 100) / 100;
                        gloBalObject.bulletRef.current[i].position.x = Math.round(gloBalObject.bulletRef.current[i].position.x * 100) / 100;

                    }
                    else if(gloBalObject.bulletRefInfo.current[i].direction == 'RIGHT' )
                    {
                        gloBalObject.bulletRef.current[i].position.x -= Math.round(gloBalObject.bulletSpeed * 100) / 100;
                        gloBalObject.bulletRef.current[i].position.x = Math.round(gloBalObject.bulletRef.current[i].position.x * 100) / 100;

                    }
                }
                else
                {   
                    
                    gloBalObject.bulletRefInfo.current[i].moveDistance = 0;
                    gloBalObject.bulletRefInfo.current[i].prepareMove = false
                    gloBalObject.bulletRefInfo.current[i].hasCheckNextPlatform = false;
                    
                    // QUE FAIRE MAINTENANT QUE LE MOUVEMENT EST FINIT
                    if(gloBalObject.bulletRefInfo.current[i].move == 'move-continue-none') //LA BALLE CONTINUE SA PROGRESSION NORMALEMENT
                    {   
                        gloBalObject.bulletRefInfo.current[i].prepareMove = true;
                    }
                    else if(gloBalObject.bulletRefInfo.current[i].move == 'move-stop-none')
                    {   
                        gloBalObject.resetBullet(i)
                    }
                    else if(gloBalObject.bulletRefInfo.current[i].move == 'move-stop-explode')
                    {
                        
                        let bulletPlatform = gloBalObject.getCurrentBulletPlatform(i);
                        gloBalObject.resetBullet(i);
                    }
                }
                
                
            }
            
        }
    }
}
function checkifBulletCanMoveNextPlatform(bulletIndex,direction,gloBalObject)
    {
        let checkPlatformForBullet = (elem)=>
        {
            return elem.xPose == gloBalObject.bulletPositionOnMap[bulletIndex].x && elem.zPose == gloBalObject.bulletPositionOnMap[bulletIndex].z 
        }
        let result

                    if(direction.value == 'LEFT'){gloBalObject.bulletPositionOnMap[bulletIndex].x += (gloBalObject.playerDistanceTarget.value);}
                    if(direction.value == 'RIGHT'){gloBalObject.bulletPositionOnMap[bulletIndex].x -= (gloBalObject.playerDistanceTarget.value);}
                    if(direction.value == 'FRONT'){gloBalObject.bulletPositionOnMap[bulletIndex].z += (gloBalObject.playerDistanceTarget.value);}
                    if(direction.value == 'BACK'){gloBalObject.bulletPositionOnMap[bulletIndex].z -= (gloBalObject.playerDistanceTarget.value);}
                
                
                    result = gloBalObject.GameMap.find(checkPlatformForBullet);
                    
                

                if(result === undefined)
                {   // PAS DE PLATFORME
                    return "move-stop-none"
                }
                else
                {
                    
                        // On vérifie si c'est un joueur ou un objet qui a fait la vérification
                        
                            if(result.object)
                            {
                                if(result.isOnScene)
                                {
                                   
                                    if(result.objectType == 'item' || result.objectType == 'decor')
                                    {
                                        if(result.objectType == 'item')
                                        {
                                            
                                        }
                                        else if(result.objectType == 'decor')
                                        {
                                           
                                        }
                                        return "move-stop-explode";
                                    }
                                    else if(result.objectType == 'mob_1' || result.objectType == 'mob_2' || result.objectType == 'dummy_mob_2')
                                    {
                                        if(result.hasEnemy)
                                        {   AudioManage.play('hit')
                                            if(result.objectDesc.life > 1)
                                                {
                                                    result.objectDesc.life --;
                                                    gloBalObject.mobUpdateFunc.current[result.objectId]('Update-Mob-Life',result.objectDesc.life);
                                                }
                                                else
                                                {   
                                                    result.objectDesc.life --;
                                                    result.hasEnemy = false;
                                                    gloBalObject.mobUpdateFunc.current[result.objectId]('Update-Mob-Life',result.objectDesc.life);
                                                    
                                                   
                                                    let effectAfterMobDeath = ()=>
                                                        {
                                                            if(result.objectDesc.hasObject)
                                                                {
                                                                    
                                                                    result.objectType = result.objectDesc.skin;
                                                                    gloBalObject.getNextPlatformInfo(gloBalObject.playerDirection,'AfterMove')
                                                                }
                                                                else
                                                                {
                                                                    result.isOnScene = false;
                                                                }
                                                        }
                                                    gloBalObject.mobUpdateFunc.current[result.objectId]('dead',effectAfterMobDeath);
                                                    
                                                    
                                                    gloBalObject._appContext.playerStats.current.mobKilled ++;
                                                    gloBalObject.checkWinCondition();
                                                }
                                                
                                                return "move-stop-explode";
                                        }
                                        else
                                        {
                                            return "move-continue-none"
                                        }
                                        
                                    }
                                    else if(result.objectType == "barier")
                                    {   
                                        return "move-continue-none"
                                    }
                                    else 
                                    {   
                                        return "move-continue-none";
                                    }
                                    
                                }
                                else
                                {
                                    return "move-continue-none";
                                } 
                                
                                
                            }
                            else
                            {   
                                if(result.hasEnemy)
                                {   
                                    
                                    // reduceEnemyLife()
                                    return "move-stop-explode";
                                }
                                else
                                {
                                    return "move-continue-none";
                                }
                                
                            }
                    
                }
            

    }
export function prepareNextBullet(gloBalObject)
{
    let lookForFreeBullet = ()=>
        {
            let checkForFreeBullet = (elem)=>
            {
                return !elem.isShooted; 
            }
            let result = gloBalObject.bulletRefInfo.current.find(checkForFreeBullet);
            return result;
        }
    gloBalObject.nextBulletToShoot.value = lookForFreeBullet();
    // rotateCam_CallBack();
    if(gloBalObject.playerDirection.value == 'LEFT')
        {
            gloBalObject.playerCursorRef.current.rotation.y = Math.PI*0.5
            
            for(let i =0;i<gloBalObject.bulletRef.current.length;i++)
            {
                if(!gloBalObject.bulletRefInfo.current[i].isShooted)
                {
                    gloBalObject.bulletRef.current[i].rotation.y = Math.PI*0.5
                }
                
            }
        }
        else if(gloBalObject.playerDirection.value == 'BACK')
        {
            
            for(let i =0;i<gloBalObject.bulletRef.current.length;i++)
            {
                if(!gloBalObject.bulletRefInfo.current[i].isShooted)
                {
                    gloBalObject.bulletRef.current[i].rotation.y = Math.PI*1
                }
                
            }
        }
        else if(gloBalObject.playerDirection.value == 'RIGHT')
        {
            
            for(let i =0;i<gloBalObject.bulletRef.current.length;i++)
            {
                if(!gloBalObject.bulletRefInfo.current[i].isShooted)
                {
                    gloBalObject.bulletRef.current[i].rotation.y = Math.PI*1.5
                }
                
            }
        }
        else if(gloBalObject.playerDirection.value == 'FRONT')
        {
            
            for(let i =0;i<gloBalObject.bulletRef.current.length;i++)
            {
                if(!gloBalObject.bulletRefInfo.current[i].isShooted)
                {
                    gloBalObject.bulletRef.current[i].rotation.y = Math.PI*2
                }
                
            }
        }
    gloBalObject.bulletRef.current[gloBalObject.nextBulletToShoot.value._index].children[0].material.visible = true;
    gloBalObject.bulletPositionOnMap[gloBalObject.nextBulletToShoot.value._index].x = gloBalObject.playerPositionOnMap.x;
    gloBalObject.bulletPositionOnMap[gloBalObject.nextBulletToShoot.value._index].z = gloBalObject.playerPositionOnMap.z;
    gloBalObject.bulletRef.current[gloBalObject.nextBulletToShoot.value._index].position.x = gloBalObject.playerPositionOnMap.x
    gloBalObject.bulletRef.current[gloBalObject.nextBulletToShoot.value._index].position.z = gloBalObject.playerPositionOnMap.z
}

