import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isGoPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (text) => {
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } 
    catch (err) {
      alert('Oh no! This word is not available in our dictionary. ');
      this.setState({
        text: '',
        isGoPressed: false,
      });
    }
  };

render() {
  return (
    <View>
      <Header
        backgroundColor={'#000'}
        centerComponent={{
          text: 'Pocket Dictionary',
          style: {  color: 'white', fontSize: 25, fontFamily: 'Ariel'},
        }}
      />

        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isGOPressed: false,
                word: 'Please wait...',
                lexicalCategory: '',
                examples: [],
                defination: '',
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              this.setState({ isGoPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text style={styles.goText}>Go!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 18 }}>
            {this.state.isGoPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word: </Text>
                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type: </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition: </Text>
                <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'green',
  },

    goButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'limeyellow',
    backgroundColor: '#ffebcd'
  },

  goText: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailsTitle: {
    fontFamily: 'times',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
