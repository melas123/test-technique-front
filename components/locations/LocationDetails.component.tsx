import { Text } from 'react-native-paper';
import { Image, Modal, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Location } from 'rickmortyapi';
import styles from './LocationDetails.stylesheet';
import LocationsService from '../../services/locations/locations.service';

function LocationDetails({
  visible,
  onDismiss,
  locationId,
}: {
  visible: boolean;
  onDismiss: () => void;
  locationId: number;
}) {
  const [location, setLocation] = useState<Location | undefined>();

  const fetchLocation = async () => {
    const response = await LocationsService.getLocation(locationId);
    setLocation(response);
  };

  useEffect(() => {
    // call the function
    fetchLocation()
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
          {/*          <Image
            style={{ width: 120, height: 100 }}
            source={{
              uri:
                location?.image || 'https://reactnative.dev/img/tiny_logo.png',
            }}
          /> */}
          <Text>{location?.name}</Text>
          <Text>{location?.dimension}</Text>
          <Text>{location?.type}</Text>
          <View style={styles.buttonClose}>
            <Button title="Close" onPress={onDismiss} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LocationDetails;
