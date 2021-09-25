import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import ContentPage from './pages/ContentPage'

export default class Page extends React.Component {
    render() {
        return (
            <ScrollView style={pageStyle.container}>
                <ContentPage/>
            </ScrollView >
        )
    }
}

const pageStyle = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#27292D'
    }
})