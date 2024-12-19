import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Modal, Pressable } from 'react-native';
import Card from '../components/Card';

const Screen2 = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null)


  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data.results); // Guardamos los Pokémon
      setNextUrl(data.next); // URL para la siguiente página de Pokémon
      setPreviousUrl(data.previous); // URL para la página anterior
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
    }
  };

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon?limit=20'); // Obtener los primeros 20 Pokémon
  }, []);

  // Maneja la selección del Pokémon y sus imágenes
  const handlePokemonSelect = async (pokemon) => {
    const pokemonId = pokemon.url.split('/')[6]; // Obtener el ID del Pokémon desde la URL
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();

    // Las imágenes del carrusel
    const images = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.back_shiny,
      data.sprites.front_shiny
    ];

    setSelectedPokemon({
      name: pokemon.name,
      images: images,
    });
  };

  // Navegar a la siguiente página
  const goToNextPage = () => {
    if (nextUrl) {
      fetchData(nextUrl); // Si hay siguiente, carga la siguiente página
    } else {
      // Si no hay más siguiente, ir a la primera página
      fetchData('https://pokeapi.co/api/v2/pokemon?limit=20');
    }
  };

  // Navegar a la página anterior
  const goToPreviousPage = () => {
    if (previousUrl) {
      fetchData(previousUrl); // Si hay anterior, carga la página anterior
    } else {
      // Si no hay página anterior, ir a la última página
      fetchData('https://pokeapi.co/api/v2/pokemon?limit=20&offset=1300'); // Ajusta el `offset` según sea necesario para cargar la última página
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Pókemons</Text>
      {/* ScrollView para mostrar los Pokémon */}
      <ScrollView contentContainerStyle={styles.container}>
        {pokemonData.map((pokemon, index) => (
          <View style={styles.pokemonCard} key={index}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Pressable onPress={() => handlePokemonSelect(pokemon)}>
              <Image
                style={styles.pokemonImage}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
                }}
              />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Paginación */}
      <View style={styles.buttons}>
        <Pressable
          onPress={goToPreviousPage}
          style={[styles.button, !previousUrl]}>
          <Text style={styles.buttonText}>Anterior</Text>
        </Pressable>
        <Pressable
          onPress={goToNextPage}
          style={[styles.button, !nextUrl]}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>

      {/* Modal para mostrar el Pokémon seleccionado */}
      <Modal
        visible={selectedPokemon !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPokemon(null)}
      >
        <View style={styles.modalBackground}>
          <Card
            name={selectedPokemon?.name}
            images={selectedPokemon?.images}
            back={() => setSelectedPokemon(null)} // Cerrar modal
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  pokemonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Screen2;
