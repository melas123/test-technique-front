import { Text } from 'react-native-paper';
import { Image, Modal, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Character } from 'rickmortyapi';
import styles from './CharacterDetails.stylesheet';
import CharactersService from '../../services/characters/characters.service';

function CharacterDetails({
  visible,
  onDismiss,
  characterId,
}: {
  visible: boolean;
  onDismiss: () => void;
  characterId: number;
}) {
  const [character, setCharacter] = useState<Character | undefined>();

  const fetchCharacter = async () => {
    const response = await CharactersService.getCharacter(characterId);
    setCharacter(response);
  };

  useEffect(() => {
    // call the function
    fetchCharacter()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={false}
        visible={visible}
        onRequestClose={onDismiss}
        style={containerStyle}
      >
        <View style={styles.modalView}>
          <Image
            style={{ width: 120, height: 100 }}
            source={{
              uri:
                character?.image || 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Text>{character?.name}</Text>
          <Text>{character?.gender}</Text>
          <Text>{character?.status}</Text>
          <Text>{character?.species}</Text>
          <View style={styles.buttonClose}>
            <Button title="Close" onPress={onDismiss} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CharacterDetails;
