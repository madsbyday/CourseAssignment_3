import React from 'react';
import { ScrollView, StyleSheet, Button, Image, View, ActivityIndicator, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DetailsScreen from '../screens/Details';

export default class InterestingPlaces extends React.Component {
    constructor() {
        super();
        this.state = { places: [] }

    }
    static navigationOptions = {
        title: 'Most Intersting places',
    };

    componentDidMount() {
        const { navigate } = this.props.navigation;
        return fetch('https://ca3.cph-an178.dk/backend/seedMaven/api/place/all')
            .then(results => {
                return results.json();
            }).then(data => {
                let places = data.map((place) => {
                    //  let url = "details/" + place.id
                    return (

                        //<Link to={url}>

                        <View key={place.id}>
                            <Text> {place.name} </Text>
                            <TouchableOpacity onPress={() => navigate('Details', {id: place.id})} >
                                <Image source={{ uri: place.imgURI }} style={{ width: 400, height: 400 }} />
                            </TouchableOpacity>
                        </View>
                        //</Link>

                    )
                })
                this.setState({ places: places });
                console.log("state", this.state.places);
            }).catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (

            <View >
                <Text>Our current Places: </Text>
                <ScrollView>
                    {this.state.places}
                </ScrollView>
            </View>
        )
    }
}
const App = StackNavigator({
    Home: { screen: InterestingPlaces },
    Details: {screen: DetailsScreen }
})