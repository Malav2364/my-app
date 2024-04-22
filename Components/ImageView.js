import React from "react";
import { StyleSheet, Image } from "react-native";

export default function ImgCmp({placeholderImageSource, selectedImage}){
    const imageSource = selectedImage ? {uri : selectedImage} : placeholderImageSource;
    return(
        <Image source={imageSource} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image:{
        height: 440,
        width: 320,
        borderRadius: 18,
    }
});