import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export interface CustomInputProps {
  value: string;
  labelText: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
}

const CustomButton: React.SFC<CustomInputProps> = ({
  value,
  labelText,
  onChangeText,
  isPassword = false,
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        secureTextEntry={isPassword}
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
