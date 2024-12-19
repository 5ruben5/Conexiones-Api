import { Text, View, Image, Pressable, StyleSheet } from 'react-native';

export default function Ejercicio1() {
  
  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
      }}>
      <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Memory</Text>

      <View style={{ marginTop: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ padding: 3 }}>
            <Pressable
              style={{
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                width: 80,
                height: 80,
                backgroundColor: 'blue',
              }}>
              <Image
                style={styles.tinyPhoto}
                source={{
                  uri: '',
                }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyPhoto: {
    width: 80,
    height: 80,
  },
});