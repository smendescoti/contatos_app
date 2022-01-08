import AsyncStorage from '@react-native-async-storage/async-storage';

//função para gravar na memória do aplicativo os
//dados obtidos após a autenticação do usuário
export const signIn = async (data) => {
    try {
        await AsyncStorage.setItem('USER_AUTH', JSON.stringify(data));

        //imprimindo no LOG do aplicativo
        console.log('Dados do usuário gravados com sucesso!');
        console.log(JSON.stringify(data));
    }
    catch (e) {
        console.log(e);
    }
}