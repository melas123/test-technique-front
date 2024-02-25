import {useState, useEffect} from 'react';
import {View, Image, ScrollView, Text} from "react-native";
import styles from './Characters.stylesheet'
import { getCharacters } from 'rickmortyapi'
import { DataTable } from 'react-native-paper';

const itemsPerPage = 20;
const Characters = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;
  
  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacters()
      console.log(characters)
      // set state with the result
      setItems(characters.data.results);
    }

    // call the function
    fetchCharacters()
    // make sure to catch any error
    .catch(console.error);;
    }, [])
  const onSelectItem = () => {
    console.log('Button touched!');
  };
  return (
    <DataTable  styles={styles.container}>
    <ScrollView>
    <DataTable.Header styles={{display: 'flex', width: '100%'}}>
        <DataTable.Title  styles={{width: "10%"}}>Name</DataTable.Title>
        <DataTable.Title styles={{width: "10%"}}>Status</DataTable.Title>
        <DataTable.Title styles={{width: "10%"}}>Species</DataTable.Title>
      </DataTable.Header>
    
    {items.slice(from, to).map((item) => (
     
      <DataTable.Row key={item.key} styles={{justifyContent: 'space-between', backgroundColor: 'red'}} onPress={onSelectItem}>
        <DataTable.Cell><Text styles={styles.cell}>{item.name}</Text></DataTable.Cell> 
        <DataTable.Cell><Text>{item.status}</Text></DataTable.Cell>
        <DataTable.Cell><Text>{item.species}</Text></DataTable.Cell>
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

  )};

export default Characters;