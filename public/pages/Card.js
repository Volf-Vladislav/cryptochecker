import React from 'react'
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 50
let chartsX = new Array()
let chartsY = new Array()

let valueColor = '#ffffffa8'

export default class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const apiData = this.props.data
        let counter = 0
        for (let i = 0; i < 6; i++) {
            chartsX[i] = getCurrentTimeFromStamp(apiData.sparkline_in_7d.price[counter].x)
            chartsY[i] = apiData.sparkline_in_7d.price[counter].y
            counter += 27
        }

        return (
            <View style={style.card}>
                <View style={style.cardTitle}>
                    <View>
                        <Text style={style.name}>{apiData.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.symbol}>{apiData.symbol}</Text>
                            <Image
                                style={style.logo}
                                source={{
                                    uri: apiData.image
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={style.price}>${apiData.current_price.toLocaleString('en-US', { currency: 'USD' })}</Text>
                        <Text style={style.change}>{valueFormater(apiData.price_change_percentage_7d_in_currency)}</Text>
                    </View>
                </View>
                <LineChart style={{ marginTop: 10 }}
                    data={{
                        labels: chartsX,
                        datasets: [
                            {
                                data: chartsY,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                                strokeWidth: 2
                            }
                        ]
                    }}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: '#2D2F34',
                        backgroundGradientTo: '#2D2F34',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: '5',
                            strokeWidth: '1',
                            stroke: 'rgba(255, 255, 255, 0.9)'
                        }
                    }}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 14,
        height: 14,
        marginLeft: 5,
        marginTop: 1
    },
    card: {
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#2D2F34',
        shadowColor: '#010101',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13
    },
    name: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 20,
    },
    symbol: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    price: {
        color: 'rgba(2, 242, 102, 0.65)'
    },
    change: {
        color: valueColor,
        fontSize: 13,
    }
})

function getCurrentTimeFromStamp(timestamp) {
    let d = new Date(timestamp * 1000)
    let date, mouth
    d.getDate() < 10 ? date = '0' + d.getDate() : date = d.getDate()
    d.getMonth() < 10 ? mouth = '0' + d.getMonth() : mouth = d.getMonth()
    var timeStampCon = `${date}.${mouth}`
    return timeStampCon
}

function valueFormater(value) {
    let formatedValue = value.toFixed(6)
    if(value < 0) {
        valueColor = 'red'
        return formatedValue
    }
    else {
        valueColor = '#02f266a6'
        return `+${formatedValue}`
    }
}