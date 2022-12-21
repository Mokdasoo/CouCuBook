import React, { ReactNode } from 'react';
import {Image, ImageSourcePropType, StyleSheet, View, ViewStyle} from 'react-native';

interface IPage {
  item: {
    order: number; 
    content: ReactNode;
    imageSource: ImageSourcePropType;
  };
  style: ViewStyle;
}


export default function Page({item, style}: IPage) {
  return (
    <View style={[style, styles.pageItem]}>
        {item.content}
    </View>
  );
}

const styles = StyleSheet.create({
    pageItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
        
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30
    }
});