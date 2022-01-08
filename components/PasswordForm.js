import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import emailValidation from '../validations/email-validation';
import { useForm, Controller } from 'react-hook-form';
import * as accountServices from '../services/account-services';

export default function PasswordForm({ navigation }) {

    //declarando os elementos do formulário
    const {
        control, //captura de cada campo do formulário
        handleSubmit, //capturar o evento de SUBMIT do formulário
        formState: {
            errors //capturar os erros de validação
        },
        reset //limpar o formulário
    } = useForm();

    //função para capturar o evento SUBMIT do formulário
    const onSubmit = (data) => {

        accountServices.postPassword(data)
            .then(
                result => {
                    reset({ email: '' });
                    Alert.alert(
                        'Sucesso!', result.message
                    );
                }
            )
            .catch(
                e => {
                    switch (e.response.status) {
                        case 422:
                            Alert.alert(
                                'Usuário inválido!', e.response.data
                            );
                            break;
                        default:
                            Alert.alert(
                                'Falha ao recuperar senha!',
                                'Operação não pode ser realizada.'
                            );
                            break;
                    }
                }
            );
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Card>
                <Card.Title
                    title="Esqueci minha senha"
                    subtitle="Entre com o seu email para recuperar a senha de acesso."
                />
                <Card.Content>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            rules={{
                                validate: emailValidation
                            }}
                            name="email"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Entre com o seu email:"
                                        keyboardType='email-address'
                                        autoComplete='email'
                                        mode='outlined'
                                        placeholder='Ex: joaopedro@gmail.com'
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.email && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.email.message}
                            </Text>
                        }

                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Button mode='contained' onPress={
                            handleSubmit(onSubmit)
                        }>
                            Recuperar Senha
                        </Button>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Button mode='outlined' onPress={
                            () => navigation.navigate('login')
                        }>
                            Acessar Sistema
                        </Button>
                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}