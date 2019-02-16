import React from 'react';
import { Image, TextInput, StatusBar, Picker, Button, StyleSheet, Text, View } from 'react-native';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rates: {}, currencyCodes: [], currencyCode: '', currencyPosition: 0, currencyAmount: 0, euroAmount: 0};
  }


  convert = () => {
    const currencyValues = Object.values(this.state.rates);
    const euroAmount = this.state.currencyAmount / currencyValues[this.state.currencyPosition];
    this.setState({euroAmount: euroAmount});     
  }

  componentDidMount() {
   
    this.getExRates();
   
  }

  getExRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=8fa770504376757241c23fb77ef368fe';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({rates: responseJson.rates});
      })
      .catch((error) => { 
        Alert.alert(error); 
      });    
  }

  render() {
    const currencyCodes = Object.keys(this.state.rates);
   
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.euro}>
        <Image source={require('./euro_1_cent.png')} style={styles.image}/>
        <Text
        >{this.state.euroAmount.toFixed(2)}€</Text>
        </View>
        <View style={styles.currencyInput}>
        <TextInput style={{width: 150}} placeholder='Currency amount' onChangeText={(currencyAmount) => this.setState({currencyAmount})} />
        <Picker
            style={{height: 50, width: 150}}
            mode="dropdown"
            selectedValue={this.state.currencyCode}
            onValueChange={(itemValue, itemPosition) => this.setState({currencyCode: itemValue, currencyPosition: itemPosition})}>
            {currencyCodes.map((item, index) => (
            <Picker.Item label={item} value={item} key={index}/> ))}
        </Picker>
        </View>
        <View style={styles.button}>      
        <Button title="Convert" onPress={this.convert} />
        </View>
        
     
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 100,
    width: 100
  },
  euro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',  
  },
});
