import React from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

export default function Home() {
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Card>
                <Card.Title
                    title="Agenda de Contatos"
                    subtitle="Seja bem vindo ao aplicativo"
                />
            </Card>
        </ScrollView>
    )
}