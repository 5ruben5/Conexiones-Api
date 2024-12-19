import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';

const Screen1 = () => {
  const [gameState, setGameState] = useState('start');
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (gameState === 'playing') {
      fetchCharacters();
    }
  }, [gameState, level]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();

      let numGroups;
      if (level === 1) {
        numGroups = 6;
      } else if (level === 2) {
        numGroups = 8;
      } else if (level === 3) {
        numGroups = 4;
      }

      const randomCharacters = data.results.sort(() => 0.5 - Math.random()).slice(0, numGroups);
      const images = randomCharacters.map((character) => ({
        id: character.id,
        uri: character.image,
      }));

      let duplicatedImages;
      if (level === 3) {
        duplicatedImages = [...images, ...images, ...images];
      } else {
        duplicatedImages = [...images, ...images];
      }

      const shuffledBoard = duplicatedImages.sort(() => 0.5 - Math.random());
      setBoard(shuffledBoard);
      setFlipped(shuffledBoard.map((_, index) => index));
      setMatched([]);
      setTimeout(() => setFlipped([]), 2000);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleCardPress = (index) => {
    if (flipped.includes(index) || matched.includes(board[index].id)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    const isMatch = (indices) => {
      const ids = indices.map((i) => board[i].id);
      return ids.every((id) => id === ids[0]);
    };

    if ((level < 3 && newFlipped.length === 2) || (level === 3 && newFlipped.length === 3)) {
      if (isMatch(newFlipped)) {
        setMatched((prev) => [...prev, board[newFlipped[0]].id]);
        setFlipped([]);
        if (matched.length + 1 === board.length / (level === 3 ? 3 : 2)) {
          if (level < 3) {
            setTimeout(() => {
              setLevel((prev) => prev + 1);
              fetchCharacters();
            }, 1000); // 1 segundo de retardo
          } else {
            setGameState('won');
          }
        }
      } else {
        setErrors((prev) => prev + 1);
        if (errors + 1 >= 3) {
          setGameState('lost');
          return;
        }
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setGameState('start');
    setLevel(1);
    setBoard([]);
    setFlipped([]);
    setMatched([]);
    setErrors(0);
  };

  if (gameState === 'start') {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => setGameState('playing')}>
          <Text style={styles.title}>Memory</Text>
        </Pressable>
      </View>
    );
  }

  if (gameState === 'lost') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Has Perdido!</Text>
        <Pressable style={styles.startButton} onPress={resetGame}>
          <Text style={styles.startButtonText}>Volver a Jugar</Text>
        </Pressable>
      </View>
    );
  }

  if (gameState === 'won') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Has Ganado!</Text>
        <Pressable style={styles.startButton} onPress={resetGame}>
          <Text style={styles.startButtonText}>Volver a Jugar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={level === 1 ? styles.boardLevel1 : level === 2 ? styles.boardLevel2 : styles.boardLevel3}>
        {board.map((card, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(index)}>
            <Image
              style={styles.image}
              source={{ uri: flipped.includes(index) || matched.includes(card.id) ? card.uri : null }}
            />
          </Pressable>
        ))}
      </View>
      <Text style={styles.errorText}>Errors: {errors}/3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  boardLevel1: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 320,
  },
  boardLevel2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 400,
  },
  boardLevel3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 400,
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default Screen1;
