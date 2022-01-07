import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import emailValidation from '../validations/email-validation';
import passwordValidation from '../validations/password-validation';
import { useForm, Controller } from 'react-hook-form';

//criando o componente como função
export default function LoginForm({ navigation }) {

  //declarando os elementos do formulário
  const {
    control, //captura de cada campo do formulário
    handleSubmit, //capturar o evento de SUBMIT do formulário
    formState: {
      errors //capturar os erros de validação
    },
    reset //limpar os campos do formulário
  } = useForm();

  //função para capturar o evento de SUBMIT do formulário
  const onSubmit = () => {
    Alert.alert(
      'Seja bem vindo.', //título da mensagem
      'Autenticação realizada com sucesso!'
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Card>
        <Card.Cover
          source={{
            uri: "https://cdn.consumidormoderno.com.br/wp-content/uploads/2021/06/Business-Performance.jpg"
          }}
        />
        <Card.Title
          title="Acesso ao Sistema"
          subtitle="Entre com suas credenciais para acessar o aplicativo"
        />
        <Card.Content>
          <View style={{ marginBottom: 20 }}>

            <Controller
              control={control}
              rules={{
                validate: emailValidation
              }}
              name='email'
              defaultValue=''
              render={
                ({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label='Email de acesso'
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
              defaultValue=""
              render={
                ({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label='Senha de acesso'
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
          <View style={{ marginBottom: 10 }}>
            <Button mode='contained' onPress={
              handleSubmit(onSubmit)
            }>
              Acessar Conta
            </Button>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Button mode='outlined' onPress={
              () => navigation.navigate('register')
            }>
              Crie sua Conta de Usuário
            </Button>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Button mode='outlined' onPress={
              () => navigation.navigate('password')
            }>
              Esqueci minha senha
            </Button>
          </View>
          <View style={{ marginBottom: 20, alignItems: 'center' }}>
            <Text>
              Aplicativo para controle de contatos v1.0
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )

}