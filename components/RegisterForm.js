import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import textfieldValidation from '../validations/textfield-validation';
import emailValidation from '../validations/email-validation';
import passwordValidation from '../validations/password-validation';
import { useForm, Controller } from 'react-hook-form';
import * as accountServices from '../services/account-services';

export default function RegisterForm({ navigation }) {

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

        //executando o serviço da API
        accountServices.postRegister(data)
            .then( //capturando a resposta de sucesso (callback/promisse)
                result => {

                    //limpar os campos da tela
                    reset({
                        nome: '', email: '', senha: '', senhaConfirmacao: ''
                    });

                    Alert.alert(
                        'Parabéns!', result.message
                    );
                }
            )
            .catch( //capturando a resposta de erro (callback/promisse)
                e => {
                    switch (e.response.status) {
                        case 400:
                            Alert.alert(
                                'Erro de Preenchimento!',
                                e.response.data.errors.SenhaConfirmacao[0]
                            );
                            break;

                        case 422:
                            Alert.alert(
                                'Usuário inválido!',
                                e.response.data
                            );
                            break;

                        default:
                            Alert.alert(
                                'Falha!',
                                'Não foi possível realizar a operação, tente novamente.'
                            );
                            break;
                    }
                }
            )
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Card>
                <Card.Title
                    title="Crie sua Conta de Usuário"
                    subtitle="Entre com os seus dados e cadastre sua conta."
                />
                <Card.Content>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            rules={{
                                validate: textfieldValidation
                            }}
                            name="nome"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Entre com o seu nome:"
                                        keyboardType='default'
                                        autoComplete='name'
                                        mode='outlined'
                                        placeholder='Ex: João Pedro'
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.nome && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.nome.message}
                            </Text>
                        }

                    </View>

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

                        <Controller
                            control={control}
                            rules={{
                                validate: passwordValidation
                            }}
                            name="senha"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Entre com a sua senha:"
                                        keyboardType='default'
                                        secureTextEntry={true}
                                        mode='outlined'
                                        placeholder='Digite aqui'
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.senha && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senha.message}
                            </Text>
                        }

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            rules={{
                                validate: passwordValidation
                            }}
                            name="senhaConfirmacao"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Confirme a sua senha:"
                                        keyboardType='default'
                                        secureTextEntry={true}
                                        mode='outlined'
                                        placeholder='Digite aqui'
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.senhaConfirmacao && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senhaConfirmacao.message}
                            </Text>
                        }

                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Button mode='contained' onPress={
                            handleSubmit(onSubmit)
                        }>
                            Criar minha Conta
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