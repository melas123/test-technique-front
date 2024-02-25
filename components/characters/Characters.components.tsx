import { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { getCharacters, Character } from 'rickmortyapi';
import { DataTable } from 'react-native-paper';
import styles from './Characters.stylesheet';

const itemsPerPage = 20;
function Characters() {
  const [items, setItems] = useState<Character[]>([]);
  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacters();
      console.log(characters);
      // set state with the result
      setItems(characters.data.results || []);
    };

    // call the function
    fetchCharacters()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  const onSelectItem = () => {
    console.log('Button touched!');
  };
  return (
    <DataTable>
      <ScrollView>
        <DataTable.Header >
          <DataTable.Title >Name</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title >Species</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row
            key={item.id}
            onPress={onSelectItem}
          >
            <DataTable.Cell>
              <Text>{item.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{item.status}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{item.species}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(items?.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items?.length}`}
        />
      </ScrollView>
    </DataTable>
  );
}

export default Characters;
