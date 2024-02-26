import { Text } from 'react-native-paper';
import { Modal, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Episode } from 'rickmortyapi';
import styles from './EpisodeDetails.stylesheet';
import EpisodesService from '../../services/episodes/episodes.service';

function CharacterDetails({
  visible,
  onDismiss,
  characterId,
}: {
  visible: boolean;
  onDismiss: () => void;
  characterId: number;
}) {
  const [episode, setEpisode] = useState<Episode | undefined>();

  const fetchEpisode = async () => {
    const response = await EpisodesService.getLocation(characterId);
    setEpisode(response);
  };

  useEffect(() => {
    // call the function
    fetchEpisode()
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
          <Text>{episode?.name}</Text>
          <Text>{episode?.air_date}</Text>
          <Text>{episode?.created}</Text>
          <View style={styles.buttonClose}>
            <Button title="Close" onPress={onDismiss} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CharacterDetails;
