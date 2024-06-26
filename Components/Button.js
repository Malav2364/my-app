import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function Button({label, theme, onPress}){
    if (theme === 'primary'){
        return(
            <View style={[styles.buttonContainer, {borderWidth: 4, borderColor: '#ffd33d', borderRadius: 10}]}>
                <Pressable
                    style={[styles.button, {backgroundColor: '#fff'}]}
                    onPress={onPress}
                >
                <FontAwesome
                    name = 'picture-o'
                    size={18}
                    color={'#25292e'}
                    style={styles.buttonIcon}
                />
                    <Text style={[styles.buttonLabel, {color: '#25292e'}]}>{label}</Text>
                </Pressable>
            </View> 
        );
    }
    return(
        <View style={styles.butonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button:{
        borderRadius: 10,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonIcon:{
        paddingRight: 8,
    },
    buttonLabel:{
        color: '#fff',
        fontSize: 18,
    },
});