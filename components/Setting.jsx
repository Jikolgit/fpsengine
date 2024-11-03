import { useContext } from "react";
import { appContext } from "../src/App";
import { AddDecor, AddDoor, AddItem, AddMob, AddMobItem, SetMapDimension, UpdateLevelConfig } from "./DefaultComponents";

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
                            <AddDoor position={[187]} open  />
                        </>
                    }
                    {AppContext.level.current == 2 &&
                        <>
                            <UpdateLevelConfig playerPosition={4} mobToKill={1}  />
                            <SetMapDimension width={3} height={15} addWallOnMap />
                            <AddMob position={[31]} />
                            <AddDoor position={[40]} />
                        </>
                    }
                    {AppContext.level.current == 3 &&
                        <>
                            <UpdateLevelConfig playerPosition={4} keyNumber={1}  />
                            <SetMapDimension width={3} height={15} addWallOnMap />
                            <AddItem position={[31]} name="key_item" important />
                            <AddDoor position={[40]} />
                        </>
                    }
                    {AppContext.level.current == 4 &&
                        <>
                            <UpdateLevelConfig playerPosition={4} keyNumber={1}  />
                            <SetMapDimension width={3} height={15} addWallOnMap />
                           
                            <AddMob position={[31]}>
                                <AddMobItem name="key_item" important  />
                            </AddMob>
                            <AddDoor position={[40]} />
                        </>
                    }
                    {AppContext.level.current == 5 &&
                        <>
                            <UpdateLevelConfig playerPosition={7} keyNumber={1}  />
                            <SetMapDimension width={5} height={15} addWallOnMap />

                            <AddMob position={[52]} active > 
                                <AddMobItem name="key_item" important />
                            </AddMob>
                            <AddDoor position={[67]} />

                        </>
                    }
                    {AppContext.level.current == 6 &&
                        <>
                            <UpdateLevelConfig playerPosition={7} keyNumber={6} />
                            <SetMapDimension width={5} height={15} addWallOnMap />

                            <AddItem name="coin_item" position={[31,32,33,36,37,38]} important />
                            <AddDoor position={[67]} />

                        </>
                    }
                    {AppContext.level.current == 7 &&
                        <>
                            <UpdateLevelConfig playerPosition={7} keyNumber={1} />
                            <SetMapDimension width={5} height={15} addWallOnMap />

                            <AddMob position={[31,33,37]} active />
                            <AddMob position={[32]}>
                                    <AddMobItem name="key_item" important />
                            </AddMob>
                            <AddDoor position={[67]} />


                        </>
                    }
            </>
    );
}