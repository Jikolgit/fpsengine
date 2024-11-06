import { useContext } from "react";
import { appContext } from "../src/App";
import { AddDecor, AddDoor, AddItem, AddMob, AddChildItem, SetMapDimension, UpdateLevelConfig } from "./DefaultComponents";

//TROUVER UN MOYEN de coder l'ouverture de la porte sans gener l'utilisateur
export function Settings()
{
    const AppContext = useContext(appContext);
    return(
            <>
                    {AppContext.level.current == 1 &&
                        <>
                            <UpdateLevelConfig playerPosition={22} keyNumber={1}  />
                            <SetMapDimension width={15} height={15} addWallOnMap />
                            <AddDecor position={[71,168,32]} skin="tombstone" />
                            <AddDecor position={[145,94]} skin="lampadaire" />
                            <AddItem position={[172]} name="box_item" life={3} >
                                <AddChildItem name="key_item" important />
                            </AddItem>
                            <AddDoor position={[187]}  />
                        </>
                    }
                    {AppContext.level.current == 2 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} mobToKill={1}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddMob position={[73]} active />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 3 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddItem position={[73]} name="key_item" important />
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 4 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                           
                            <AddMob position={[73]}>
                                <AddChildItem name="key_item" important  />
                            </AddMob>
                            <AddDoor position={[94]} />
                        </>
                    }
                    {AppContext.level.current == 5 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1}  />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddMob position={[73]} active > 
                                <AddChildItem name="key_item" important />
                            </AddMob>
                            <AddDoor position={[94]} />

                        </>
                    }
                    {AppContext.level.current == 6 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={6} />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddItem name="coin_item" position={[30,31,32,37,38,39]} important />
                            <AddDoor position={[94]} />

                        </>
                    }
                    {AppContext.level.current == 7 &&
                        <>
                            <UpdateLevelConfig playerPosition={10} keyNumber={1} />
                            <SetMapDimension width={7} height={15} addWallOnMap />

                            <AddMob position={[44,46,52]} active />
                            <AddMob position={[45]}>
                                    <AddChildItem name="key_item" important />
                            </AddMob>
                            <AddDoor position={[94]} />


                        </>
                    }
                    {AppContext.level.current == 8 &&
                        <>
                            <UpdateLevelConfig playerPosition={9} mobToKill={1} />
                            <SetMapDimension width={7} height={15} addWallOnMap />
                            <AddDecor position={[58,47]} skin="tombstone" />
                            <AddMob position={[67]} life={5} active />
                            <AddMob position={[66]} life={5} active />
                            <AddDoor position={[94]} />
                            
                            


                        </>
                    }
            </>
    );
}