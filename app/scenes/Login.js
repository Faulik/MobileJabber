import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Text,
  View,
  TextInput,
} from 'react-native';

import s from '../styles/scenes/Login';
import { ConnectWithJid } from '../actions';
import Button from '../components/Button';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jid: '',
      password: '',
    };
  }

  render() {
    const { connectWithJid } = this.props;
    return (
      <View style={s.container}>
        <Text style={s.label}>
          Login with this data
        </Text>
        <TextInput
          style={s.jid}
          placeholder="Jid"
          value={this.state.jid}
          onChangeText={(jid) => this.setState({ jid })}
        />
        <TextInput
          style={s.password}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => connectWithJid()} styles={s.button}>
          <Text style={s.buttonText}>Login</Text>
        </Button>
      </View>
    );
  }
}

Login.propTypes = {
  connectWithJid: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  connectWithJid: bindActionCreators(ConnectWithJid, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
