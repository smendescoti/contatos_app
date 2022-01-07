import React  from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

//criando um componente para carregar o layout
//da toolkit react-native-paper
export default function Main() {
    return (
        <PaperProvider>
            <App/>
        </PaperProvider>
    )
}

//carregando o componente App.js como tela inicial do aplicativo
AppRegistry.registerComponent(appName, () => Main);
