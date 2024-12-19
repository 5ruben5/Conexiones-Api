import React, { useState } from 'react';
import { Text, Image, View, Pressable, StyleSheet } from 'react-native';

const Card = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  const goToNextImage = () => {
    if (currentImageIndex < props.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(props.images.length - 1);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.nameAndImage}>
          <Text style={styles.text} onPress={props.back}>
            {props.name}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: props.images[currentImageIndex],
            }}
          />
        </View>
      </View>

      {/* Botones de navegación */}
      <View style={styles.buttons}>
        <Pressable onPress={goToPreviousImage} style={styles.button}>
          <Text style={styles.buttonText}>Anterior</Text>
        </Pressable>
        <Pressable onPress={goToNextImage} style={styles.button}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '90%',
    height: '60%', 
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  nameAndImage: {
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
  },
  button: {
    backgroundColor: 'black',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default Card;
