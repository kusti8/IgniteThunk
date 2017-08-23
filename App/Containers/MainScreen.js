import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, Button, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MainActions, {send} from '../Redux/MainRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends Component {
  render () {
    console.log(this.props.out)
    return (
      <View style={{flex: 1}}>
        <TextInput style={{height: 40}} onChangeText={text => this.props.updateParams(text)} value={this.props.params} />
        <Button title="Send" onPress={() => this.props.send(this.props.params)}/>
        <Image source={{uri: this.props.out}} style={{flex: 1}}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.main.params,
    out: state.main.out
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send: params => {dispatch(send(params))},
    updateParams: text => {dispatch(MainActions.updateParams(text))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
