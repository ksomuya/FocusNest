import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = ({ videoUrl, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  video: {
    flex: 1,
  },
});

export default VideoPlayer;
