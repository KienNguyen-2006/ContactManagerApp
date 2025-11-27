import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const LoadingSpinner = ({message = 'Loading...'}) => {
  return (
    <View style={[GlobalStyles.centered, styles.container]}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: Spacing.md,
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
});

export default LoadingSpinner;