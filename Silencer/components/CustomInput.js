import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const CustomButton = ({
  value,
  labelText,
  onChangeText,
  isPassword = false,
  setRef = (ref) => {},
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        secureTextEntry={isPassword}
        ref={setRef}
      />
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingHorizontal: 5,
  },
});
