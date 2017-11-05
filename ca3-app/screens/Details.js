import React from 'react';
import { ScrollView, StyleSheet, Button, Image, View, ActivityIndicator, Text, Dimensions, TextInput } from 'react-native';
import  {StackNavigator, TabNavigator } from 'react-navigation'; 

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = { json: "", imgURI: "" };
    }
    static navigationOptions = {
       
    };

   componentDidlMount() {
      return fetch('https://ca3.cph-an178.dk/backend/seedMaven/api/place/single/5')
           .then(results => {
               return results.json();
           }).then(data => {
               let json = data;
               this.setState({ json: json });
               this.setState({ imgURI: json.imgURI})
           })
  
    };

   render() {
       const {state} = this.props.navigation;
    return (
        <View>
        <Text> Name: </Text>
        <Image source={this.state.json.imgURI} style={{ width: 400, height: 400 }} />
        <Text> Address: </Text>
        <Text> GPS-Location: </Text>
        <Text> Description: </Text>
        <Text> Rating: </Text>
        
        </View>

    )
   }

}