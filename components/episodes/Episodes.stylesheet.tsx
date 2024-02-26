import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: '60%',
    width: '50%',
    backgroundColor: 'red',
  },
  datatable: {
    justifyContent: 'space-around',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  row: {
    dislay: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: 'red',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    justifyContent: 'space-around',
  },
});

export default styles;
