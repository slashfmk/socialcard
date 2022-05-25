import Home from './app/screens/Home';
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import React from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {

    const [isLoaded] = useFonts({
        MontserratBlack: require('../socialcard/app/assets/fonts/montserrat/Montserrat-Black.ttf'),
        MontserratBold: require('../socialcard/app/assets/fonts/montserrat/Montserrat-Bold.ttf'),
        MontserratExtraLight: require('../socialcard/app/assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
        Montserrat: require('../socialcard/app/assets/fonts/montserrat/Montserrat-Regular.ttf'),
        MontserratMedium: require('../socialcard/app/assets/fonts/montserrat/Montserrat-Medium.ttf'),
    });

    if (!isLoaded) {
        return <AppLoading/>;
    }
    return <Home/>
}

