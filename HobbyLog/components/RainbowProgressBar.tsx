import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const RainbowProgressBar = ({ progress }) => {
  const colors = [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#8B00FF', // Violet
    '#FF0000', // Red (same as the first color for smooth transition)
  ];

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const cycleColors = () => {
      Animated.timing(animatedValue, {
        toValue: colors.length - 1, // Target the last index of the color array
        duration: colors.length * 1000, // Total duration
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        animatedValue.setValue(0);
        cycleColors(); // Restart the animation
      });
    };

    cycleColors();
  }, [animatedValue, colors.length]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: colors.map((_, index) => index),
    outputRange: colors,
    extrapolate: 'clamp', // Ensures the value stays within the defined range
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: `${progress * 100}%`,
            backgroundColor: interpolatedColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

export default RainbowProgressBar;
