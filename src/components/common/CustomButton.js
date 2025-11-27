import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.button, styles.buttonSecondary];
      case 'outline':
        return [styles.button, styles.buttonOutline];
      default:
        return [styles.button, styles.buttonPrimary];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonTextSecondary;
      case 'outline':
        return styles.buttonTextOutline;
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={
            variant === 'outline' ? Colors.primary : Colors.text.light
          } 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...GlobalStyles.button,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
  },
  buttonTextSecondary: {
    ...GlobalStyles.buttonText,
  },
  buttonTextOutline: {
    color: Colors.primary,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
});

export default CustomButton;