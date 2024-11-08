import { useContext } from "react";
import { appContext } from "../src/App";
import { AddDecor, AddDoor, AddItem, AddMob, AddChildItem, SetMapDimension, UpdateLevelConfig, AddTimer, AddWall } from "./DefaultComponents";

//TROUVER UN MOYEN de coder l'ouverture de la porte sans gener l'utilisateur
export function Settings()
{
    const AppContext = useContext(appContext);
    return(
            <>
                    {AppContext.level.current == 1 &&
                        <>
                            <UpdateLevelConfig playerPosition={22}   />
                            <SetMapDimension width={15} height={15} addWallOnMap />
                            <AddDecor position={[71,168,32]} skin="tombstone" />
                            <AddDecor position={[145,94]} skin="lampadaire" />
                            {/* <AddItem name="upgrade_shoot_power_item" position={[68]} /> */}
                            {/* <AddItem name="box_item" life={2} position={[68]} >
                                    <AddChildItem name="upgrade_shoot_power_item"/>
                            </AddItem> */}
                            <AddMob position={[68]} life={5} type="2" />
                            <AddMob position={[67]} life={5} type="2">
                                    <AddChildItem name="upgrade_shoot_power_item"/>
                            </AddMob>
                            <AddDoor position={[187]} open  />
                        </>
                    }
                    {AppContext.level.current == 2 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddItem name="key_item" position={[45]} />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 3 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} mobToKill={2}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddMob position={[64]} life={3} type="2" />
                            <AddMob position={[68]} life={3} type="2" />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 4 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} mobToKill={3}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                           
                            <AddMob position={[52,60,58]} active type="2" important />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 5 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={2}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddMob position={[52,82,78]} life={5} type="2" /> 
                            <AddItem name="box_item" position={[96,92]} life={3}>
                                <AddChildItem name="key_item" important   />
                            </AddItem>
                            <AddDecor skin="lampadaire" position={[67,65]} />
                            <AddDoor position={[94]} />

                        </>
                    }
                    {AppContext.level.current == 6 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddItem name="coin_item" position={[30,31,32,58,59,60]} />
                            <AddDoor position={[94]} open />

                        </>
                    }
                    {AppContext.level.current == 7 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1} />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddMob position={[45]} type="2">
                                    <AddChildItem name="key_item" important />
                            </AddMob>
                            <AddDoor position={[94]} />


                        </>
                    }
                    {AppContext.level.current == 8 &&
                        <>
                            <UpdateLevelConfig playerPosition={9} mobToKill={5} />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddMob position={[38,46,54,44,50]} type="2" />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 9 &&
                        <>
                            <UpdateLevelConfig playerPosition={22} mobToKill={2} />
                            <SetMapDimension width={15} height={15} addWallOnMap />
                            <AddMob position={[116,152]} type="3" life={5} difficulty="medium" />
                            <AddDoor position={[202]} />
                        </>
                    }

                    {AppContext.level.current == 10 &&
                        <>
                            <UpdateLevelConfig playerPosition={47} mobToKill={4} />
                            <SetMapDimension width={25} height={25} addWallOnMap />
                            <AddWall position={[45,70,95,120,145,170,195,220,245,270,295,320]} />
                            <AddWall position={[345,344,343,342,341,340,339,338,337,336,335,334,332,333,330,329]} />
                            <AddWall position={[448,447,446,445,444,443,442,441,440,439,438,437,436,435,434,433]} />
                            <AddWall position={[354,379,404,429,454,479,504,529,554,579,458,483,508,533,558,583]} />

                            <AddWall position={[307,305,282,280,257,255,232,231,230]} />
                            <AddMob position={[417,388,355,281]} type="2" life={5} difficulty="medium" />
                            <AddDoor position={[581]} />
                        </>
                    }
            </>
    );
}