import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default class TextStyle extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        if(this.props.type == 'title') {
            return (
                <Text style={styles.title}>
                    {this.props.text}
                </Text>
            )    
        }
        else if(this.props.type == 'content') {
            return (
                <Text style={styles.content}>
                    {this.props.text}
                </Text>
            ) 
        }

        else if(this.props.type == 'main') {
            return (
                <Text style={styles.main}>
                    {this.props.text}
                </Text>
            ) 
        }
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#ffffffa8',
        fontSize: 20
    },
    content: {
        color: '#ffffffa6',
        fontSize: 16
    },
    main: {
        color: '#ffffffa9',
        fontSize: 20,
        textTransform: 'uppercase'
    }
})