import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Location } from 'rickmortyapi';
import { DataTable, Text } from 'react-native-paper';
import LocationDetails from './LocationDetails.component';
import LocationsService from '../../services/locations/locations.service';

const itemsPerPage = 20;

function Locations() {
  const [items, setItems] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [count, setCount] = useState(0);
  const from = (page - 1) * itemsPerPage + 1;
  const to = page * itemsPerPage;
  const [visible, setVisible] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(0);

  const fetchLocations = async () => {
    const response = await LocationsService.getListLocations({ page });
    // set state with the result
    setItems(response.results || []);
    setNumberOfPages(response?.info?.pages || 0);
    setCount(response?.info?.count || 0);
  };

  useEffect(() => {
    // call the function
    fetchLocations()
      // make sure to catch any error
      .catch(console.error);
  }, [page]);
  const onSelectItem = (characterId: number) => {
    setVisible(true);
    setSelectedCharacterId(characterId);
  };

  const setUpPage = async (pageNumber: number) => {
    if (pageNumber > 0) {
      setPage(pageNumber);
    }
  };

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <DataTable>
      {visible && (
        <LocationDetails
          visible={visible}
          onDismiss={onDismiss}
          locationId={selectedCharacterId as number}
        />
      )}
      <ScrollView>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Species</DataTable.Title>
        </DataTable.Header>

        {items.map(item => (
          <DataTable.Row key={item.id} onPress={() => onSelectItem(item.id)}>
            <DataTable.Cell>
              <Text>{item.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{item.dimension}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{item.type}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={targetPage => setUpPage(targetPage)}
          label={`${from}-${to} of ${count}`}
          selectPageDropdownLabel="Rows per page"
        />
      </ScrollView>
    </DataTable>
  );
}

export default Locations;
