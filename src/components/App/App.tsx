import React from 'react';
import Map from '../Map/Map';
import LanguageStoreProvider from "../../providers/LanguageStore.provider";
import Header from "../Header/Header";
import AppStateProvider from "../../providers/AppState.provider";
import SidePanel from "../SidePanel/SidePanel";

const App = () => {

    return (
        <div className="App">
            <AppStateProvider>
                <LanguageStoreProvider>
                    <Header />
                    <SidePanel />
                    <Map />
                </LanguageStoreProvider>
            </AppStateProvider>
        </div>
    );
}

export default App;
