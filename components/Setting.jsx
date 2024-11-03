import { useContext } from "react";
import { appContext } from "../src/App";
import { AddDecor, AddDoor, AddMob, SetMapDimension, UpdateLevelConfig } from "./DefaultComponents";

//TROUVER UN MOYEN de coder l'ouverture de la porte sans gener l'utilisateur
export function Settings()
{
    const AppContext = useContext(appContext);
    return(
            <>
                    {AppContext.level.current == 1 &&
                        <>
                            <UpdateLevelConfig playerPosition={22}  />
                            <SetMapDimension width={15} height={15} addWallOnMap />
                            <AddDecor position={[71,168,32]} skin="tombstone" />
                            <AddDecor position={[145,94]} skin="lampadaire" />
                            <AddDoor position={[187]} open  />
                        </>
                    }
                    {AppContext.level.current == 2 &&
                        <>
                            <UpdateLevelConfig playerPosition={4}  />
                            <SetMapDimension width={3} height={15} addWallOnMap />
                            <AddMob position={[31]} />
                            <AddDoor position={[40]} open  />
                        </>
                    }
            
            
            
            </>
    );
}