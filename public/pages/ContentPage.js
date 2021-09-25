import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import Card from './Card'
import getData from '../api/getData'

const windowHeight = Dimensions.get('window').height
export default class ContentPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        const fetchMarketData = async () => {
            const marketData = await getData()
            this.setState({
                isLoaded: true,
                items: marketData,
            })
        }

        fetchMarketData()
    }

    handleClick = () => {
        this.setState({ items: [], isLoaded: false })
        const fetchMarketData = async () => {
            const marketData = await getData()
            this.setState({
                isLoaded: true,
                items: marketData,
            })
        }

        fetchMarketData()
    }

    render() {
        const { error, isLoaded, items } = this.state
        if (isLoaded) {
            return (
                <View>
                    <TouchableOpacity style={style.navbar} onPress={this.handleClick}>
                        <Text style={style.navHeader}>Обновить данные</Text>
                    </TouchableOpacity>
                    {
                        items.map(item => {
                            return (
                                <Card data={item} key={item.name} />
                            )
                        })
                    }

                    <Text style={style.footer}>
                        Автор Владислав Вольф
                    </Text>

                </View>
            )
        }
        else {
            return (
                <View style={style.center}>
                    <Text style={style.loadind}>cryptochecker</Text>
                    <Text style={style.loadind}>loading...</Text>
                </View>
            )
        }
    }
}

const style = StyleSheet.create({
    navbar: {
        marginTop: 20,
        marginBottom: 10,
        height: 60,
        textAlign: 'center',
        backgroundColor: '#2D2F34',
        justifyContent: 'center'
    },
    navHeader: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 12,
        color: '#FFFFFFa5',
        fontWeight: 'bold',
    },
    center: {
        marginTop: windowHeight / 2 - 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loadind: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#ffffff1a',
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
    },
    footer: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#ffffff1a',
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
        marginTop: 20,
        marginBottom: 20
    }
})

