import React, {Context, createContext, useContext, useEffect, useState} from "react";
import {IMapControlButton, MapButtonGroups} from "../utils/types";

export interface AppStateContextType {
    addMapButtonGroup: (key: MapButtonGroups, buttonGroup: IMapControlButton[]) => void,
    buttonGroupsMap: Record<MapButtonGroups, IMapControlButton[]>
}

export interface AppStateProviderProps {
    children: JSX.Element | JSX.Element[];
}

const AppStateContext: Context<AppStateContextType> = createContext<AppStateContextType>(null!);

const AppStateProvider = ({ children }: AppStateProviderProps) => {

    const [buttonGroupsMap, setButtonGroupsMap] = useState<Record<MapButtonGroups, IMapControlButton[]>>({} as Record<MapButtonGroups, IMapControlButton[]>);

    const addMapButtonGroup = (key: MapButtonGroups, buttonGroup: IMapControlButton[]) => {
        if (buttonGroup.length < 1 || ( buttonGroupsMap[key] && buttonGroupsMap[key].length === buttonGroup.length )) return;
        const newGroup: Record<MapButtonGroups, IMapControlButton[]> = {
            ...buttonGroupsMap,
            [key]: buttonGroup
        };
        setButtonGroupsMap(newGroup);
    }

    const addMapButtonGroup = (key: MapButtonGroups, buttonGroup: IMapControlButton[]) => {
        console.log(buttonGroup)
        if (!buttonGroupsMap.has(key) || !buttonGroupsMap.get(key)) {
            buttonGroupsMap.set(key, buttonGroup);
        }
    }

    const ctx = {
        addMapButtonGroup,
        buttonGroupsMap
    }

    return (
        <AppStateContext.Provider
            value={ctx}
        >
            {children}
        </AppStateContext.Provider>
    )
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (ref: any) =>  {

    const [hasBeenExited, setHasBeenExited] = useState<boolean>(false);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        setHasBeenExited(false);

        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                setHasBeenExited(true);
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setHasBeenExited(true);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            // Unbind the event listener on clean up
            setHasBeenExited(false);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [hasBeenExited, ref]);

    return hasBeenExited;
}

export const useAppState = () => {
    return useContext(AppStateContext);
}

export default AppStateProvider;
