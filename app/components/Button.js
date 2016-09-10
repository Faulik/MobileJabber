import React, { PropTypes } from 'react';

import {
  View,
  TouchableNativeFeedback,
} from 'react-native';

import s from '../styles/components/Button';

const Button = ({ onPress, children, styles }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress()}
    >
      <View style={[s.button, styles]}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.element.isRequired,
  styles: PropTypes.number,
};

export default Button;
