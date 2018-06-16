import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home - Camera List',
    headerTitleStyle: {color: 'black'},
    headerStyle: {backgroundColor: 'white'}
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          onPress= { () => navigate("Cameras") }
          title="Click here to see the list of traffic cameras"
          color="#000000"
          />
      </View>
    );
  }
}

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}

class CameraScreen extends Component {
  static navigationOptions = {
    title: 'Camera List',
    headerTitleStyle: {color: 'black'},
    headerStyle: {backgroundColor: 'white'}
  };

  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

  cameraType(camera) {
      if(camera.Type == 'wsdot'){
          return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;           
      }else{
          return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={ ({item}) =>
            <View style={styles.textM}>
            
            <Text style={{fontSize: 18, color: 'black'}}>
                {`${item.Cameras[0].Description}`}
              </Text>

             <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 210}}
                />

            </View>
          }
         />
      </View>

    );
  }

}

const NavigationApp = createStackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: CameraScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textM: {
    marginBottom: 30
  },
});
 
