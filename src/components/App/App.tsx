import React from 'react';
import Map from '../Map/Map';
import LanguageStoreProvider from "../../providers/LanguageStore.provider";
import Header from "../Header/Header";
import AppStateProvider from "../../providers/AppState.provider";
import CountriesListContainer from "../CountriesListContainer/CountriesListContainer";

const App = () => {

    return (
        <div className="App">
            <AppStateProvider>
                <LanguageStoreProvider>
                    <Header />
                    <CountriesListContainer />
                    <Map />
                </LanguageStoreProvider>
            </AppStateProvider>
        </div>
    );
}

export default App;
