import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export default function Icon() {
  return (
    <View style={styles.container}>
      <Svg width="80" height="80" viewBox="0 0 80 80">
        {/* Capacete */}
        <Path
          d="M15 35 C15 20, 30 10, 40 10 C50 10, 65 20, 65 35 L65 45 C65 50, 60 55, 55 55 L25 55 C20 55, 15 50, 15 45 Z"
          fill="#ffd700"
        />
        {/* Listras do capacete */}
        <Rect x="35" y="12" width="3" height="30" fill="#e6c200" />
        <Rect x="42" y="12" width="3" height="30" fill="#e6c200" />
        
        {/* Chave inglesa */}
        <Path
          d="M20 50 L35 35 L40 40 L45 35 L50 40 L40 50 L35 45 Z"
          fill="#ffd700"
        />
        <Rect x="18" y="48" width="8" height="4" rx="2" fill="#e6c200" />
        
        {/* Martelo */}
        <Rect x="45" y="30" width="4" height="25" fill="#8b4513" />
        <Rect x="40" y="28" width="14" height="6" rx="3" fill="#ffd700" />
        
        {/* Tablet/Checklist */}
        <Rect x="52" y="40" width="20" height="28" rx="3" fill="#ffd700" stroke="#e6c200" strokeWidth="1" />
        
        {/* Checkmarks no tablet */}
        <Path d="M57 48 L59 50 L63 46" stroke="#1a365d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <Path d="M57 54 L59 56 L63 52" stroke="#1a365d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <Path d="M57 60 L59 62 L63 58" stroke="#1a365d" strokeWidth="2" fill="none" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});