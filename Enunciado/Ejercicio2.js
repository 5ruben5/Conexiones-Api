import {
  View,
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function Ejercicio2() {
  
  return (
    <ScrollView>
      <View style={styles.page}>
        <Text style={{ fontSize: 30 }}>Pókemons</Text>
        <View style={styles.container}>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <Text style={styles.text}>Nombre pokémon</Text>
            <Pressable>
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                source={{
                  uri: '',
                }}
              />
            </Pressable>
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <Text style={styles.text}>Nombre pokémon</Text>
            <Pressable>
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                source={{
                  uri: '',
                }}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.containerButtons}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Anterior</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    marginTop: 35,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});