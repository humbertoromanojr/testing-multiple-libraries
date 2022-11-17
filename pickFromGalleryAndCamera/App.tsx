import React, {useState} from 'react';

import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export default function App() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [imagePet, setImagePet] = useState<string>(
    'https://github.com/humbertoromanojr.png',
  );

  const handleImageUser = () => {
    Alert.alert('Selecione', 'De onde você quer enviar a sua foto!', [
      {
        text: 'Galeria de fotos',
        onPress: () => pickImageFromGallery(),
        style: 'default',
      },
      {
        text: 'Camera',
        onPress: () => pickImageFromCamera(),
        style: 'default',
      },
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('Algo deu errado, tente em alguns minutos'),
      },
    ]);
  };

  const pickImageFromGallery = async () => {
    setPhotoIsLoading(true);

    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
      };

      const photoSelect = await launchImageLibrary(options);

      if (photoSelect?.assets) {
        setImagePet(photoSelect.assets[0].uri!);
        return;
      }
    } catch (error) {
      console.log('== launchImageLibrary ==> ', error);
    } finally {
      setPhotoIsLoading(false);
    }

    // tratar erro depois
  };

  const pickImageFromCamera = async () => {
    setPhotoIsLoading(true);

    try {
      const options: CameraOptions = {
        mediaType: 'photo',
        //saveToPhotos: true,
        cameraType: 'front',
        quality: 1,
      };

      const cameraSelect = await launchCamera(options);

      if (cameraSelect?.assets) {
        setImagePet(cameraSelect.assets[0].uri!);
        return;
      }
    } catch (error) {
      console.log('== pickImageFromCamera ==> ', error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleImageUser}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{padding: 16, backgroundColor: '#222', color: '#fff'}}>
        Postar foto
      </Text>
      <View>
        {photoIsLoading ? (
          <Text>Carregando...</Text>
        ) : (
          <Image
            source={{uri: imagePet}}
            alt="avatar"
            style={{width: 200, height: 200, margin: 5, borderRadius: 7}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
