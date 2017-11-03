import React from 'react';
import { ScrollView, StyleSheet, Button, Image, View, ActivityIndicator, Text, Dimensions, TextInput } from 'react-native';
import { ImagePicker, Constants, MapView, Location, Permissions } from 'expo';

const { height, width } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0142;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AddPlace extends React.Component {
  static navigationOptions = {
    title: 'Add Place',
  };
  state = {
    image: null,
    status: "",
    uploading: false,
    mapRegion: { latitude: 55.7704365, longitude: 12.5118186, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
    locationResult: null,
    location: { coords: { latitude: 55.7704365, longitude: 12.5118186 } },
    placeName: "Place name",
    placeDesc: "Place description"
  };

  componentDidMount() {
    this._getLocationAsync();
  }
  // _handleLocationChange ?? 
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

  render() {
    let { image } = this.state;
    var gps = this.state.location.coords.latitude + "," + this.state.location.coords.longitude;
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={styles.inputName}
            onChange={(text) => this.setState({ placeName: text })}
            value={this.state.placeName}
          />
          <TextDesc
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({ placeDesc: text })}
            value={this.state.placeDesc}

          />
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        <View style={styles.container}>
          <Button
            title="Center"
            onPress={this._handleMapRegionChange}
          />
          <MapView
            style={{ height: 200 }}
            region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
          >
            <MapView.Marker
              coordinate={this.state.location.coords}
              title="Current posistion"
              description={"lat: " + this.state.location.coords.latitude + " long: " + this.state.location.coords.longitude}
            />
          </MapView>
          <Text>{gps}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 }}>
          {this.state.uploading && <ActivityIndicator color="blue" animating size="large" />}
          {image && <Button title="Add Place" onPress={() => {
            this.setState({ uploading: true });
            this._uploadImage(image)
          }
          } />}

        </View>
      </ScrollView>
    );
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _uploadImage = (uri) => {
    this.setState({ uploading: true });
    // Change apiUrl to your domain
    let apiUrl = "https://ca3.cph-an178.dk/backend";
    let apiURL = apiUrl + "/seedMaven/api/upload/file";
    console.log('apiURL: ', apiURL);
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let fileName = uri.split('/').pop();
    console.log('uri: ', uri);
    let formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: `photo.${fileName}`,
      type: `image/${fileType}`,
    });
    formData.append("user", "Mobile User");

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    fetch(apiURL, options).
      then((res) => {
        console.log('RES: ', res);
        let status = res.ok ? "Image uploaded successfully" : "Failed to upload image. Error: " + res.status + ": " + res.statusText;
        this.setState({ status, uploading: false })
      }).catch((err) => {
        console.log("ERROR: ");
        this.setState({ status: "Failed to upload image", uploading: false })
      });
  }
}

class TextDesc extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={true}
        maxLength={200}
        style={{ width: 300 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  inputName: {
    fontSize: 32,
    height: 44,
    width: 200,
    padding: 8,
  },
});
