import React, {Context, createContext, useContext, useEffect, useState} from "react";

export interface AppStateContextType {
    handleSidePanelState: (open: boolean) => void
    handleDropdownState: (open: boolean) => void,
    sidePanelIsOpen: boolean,
    languageDropdownIsOpen: boolean
}

export interface AppStateProviderProps {
    children: JSX.Element | JSX.Element[];
}

const AppStateContext: Context<AppStateContextType> = createContext<AppStateContextType>(null!);

const AppStateProvider = ({ children }: AppStateProviderProps) => {

    const [sidePanelIsOpen, setSidePanelIsOpen] = useState<boolean>(false);
    const [languageDropdownIsOpen, setLanguageDropdownIsOpen] = useState<boolean>(false);

    const handleDropdownState = (open: boolean) => {
        setLanguageDropdownIsOpen(open);
    }

    const handleSidePanelState = (open: boolean) => {
        setSidePanelIsOpen(open);
    }

    const ctx = {
        handleSidePanelState,
        handleDropdownState,
        sidePanelIsOpen,
        languageDropdownIsOpen
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
    }, [hasBeenExited]);

    return hasBeenExited;
}

export const useAppState = () => {
    return useContext(AppStateContext);
}

export default AppStateProvider;