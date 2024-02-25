import { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { getCharacters, Character } from 'rickmortyapi';
import { DataTable } from 'react-native-paper';

const itemsPerPage = 20;

function Characters() {
  const [items, setItems] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [count, setCount] = useState(0);
  const from = (page - 1) * itemsPerPage + 1;
  const to = page * itemsPerPage;

  const fetchCharacters = async () => {
    const characters = await getCharacters({ page });
    // set state with the result
    setItems(characters.data.results || []);
    setNumberOfPages(characters?.data?.info?.pages || 0);
    setCount(characters?.data?.info?.count || 0);
  };

  useEffect(() => {
    // call the function
    fetchCharacters()
      // make sure to catch any error
      .catch(console.error);
  }, [page]);
  const onSelectItem = () => {
    console.log('Button touched!');
  };

  const setUpPage = async (pageNumber: number) => {
    if (pageNumber > 0) {
      setPage(pageNumber);
    }
  };

  return (
    <DataTable>
      <ScrollView>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Species</DataTable.Title>
        </DataTable.Header>

        {items.map(item => (
          <DataTable.Row key={item.id} onPress={onSelectItem}>
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
          numberOfPages={numberOfPages}
          onPageChange={page => setUpPage(page)}
          label={`${from}-${to} of ${count}`}
          selectPageDropdownLabel="Rows per page"
        />
      </ScrollView>
    </DataTable>
  );
}

export default Characters;
