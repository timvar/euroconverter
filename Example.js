import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar } from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jobs: [], description: '', location: ''};
  }

  getJobs = () => {
    const url = 'https://jobs.github.com/positions.json?description=' + this.state.description + '&location=' + this.state.location;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({jobs: responseJson});
      })
      .catch((error) => { 
        Alert.alert(error); 
      });    
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id} 
          renderItem={({item}) => <Text style={{fontSize: 18}}>{item.title}, {item.company}</Text>} data={this.state.jobs} 
          ItemSeparatorComponent={this.listSeparator} /> 
        <TextInput style={{fontSize: 18, width: 200}} placeholder='description' onChangeText={(description) => this.setState({description})} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='location' onChangeText={(location) => this.setState({location})} />
        <Button title="Find" onPress={this.getJobs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});