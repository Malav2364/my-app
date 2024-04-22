import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import ImageView from './Components/ImageView'
import Button from './Components/Button';
import CircleButton from './Components/CircleButton';
import IconButton from './Components/IconButton';
import EmojiPicker from './Components/EmojiPicker';
import EmojiList from './Components/EmojiList';
import EmojiSticker from './Components/EmojiSticker';
import {GestureHandlerRootView} from 'react-native-gesture-handler' 
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import domtoimage from 'dom-to-image';
import {captureRef} from 'react-native-view-shot'
import { useState, useRef } from 'react';

const imgAdd = require('./assets/images/background-image.png')

export default function App() {
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }else{
      alert('You did not select any image.')
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () =>{
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try{
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if(localUri){
          alert('Saved!')
        }
      }catch(e){
        console.log(e)
      }
    }else{
      try{
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl;
        link.click();
      }catch(e){
        console.log(e);
      }
    }
  };

  if (status === null){
    requestPermission();
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imgCont}>
        <View ref={imageRef} collapsable={false}>
          <ImageView placeholderImageSource={imgAdd} selectedImage={selectedImage}/>
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button label={'Choose a Photo'} theme={'primary'} onPress={pickImageAsync}/>
        <Button label={'Use this Photo'} onPress={ ()=> setShowAppOptions(true)}/>
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCont:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer:{
    flex: 1/3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer:{
    position: 'absolute',
    bottom: 80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },
});
