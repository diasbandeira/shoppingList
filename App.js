import React, {useState, useEffect} from 'react';
import BarCode from './components/BarCode';
import ListProducts from './components/ListProducts';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import {Container, Header, Content, Tab, Tabs,Text } from 'native-base';
import firebase from 'firebase';
import 'firebase/firestore';

export default function App() {
  const [listProduct, setListProduct] = useState([{}]);
  const [productDescription, setProductDescription] = useState({});
  const [update, setUpdate] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyBDRAhOv-sj31E8_GG3VEbrTAp0sebrzks",
    authDomain: "listadecompra-541de.firebaseapp.com",
    databaseURL: "https://listadecompra-541de.firebaseio.com",
    projectId: "listadecompra-541de",
    storageBucket: "listadecompra-541de.appspot.com",
    messagingSenderId: "839365746259",
    appId: "1:839365746259:web:9ea425ca4478acf41ef0a6"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }
  const ref = firebase.database().ref('items');

  const updateList = () =>{
    let arrayTemp = [];
    ref.on('value', (snapshot) =>{
      snapshot.forEach((childSnapshot) =>{
        var objectData ={
          id: childSnapshot.key,
          name: childSnapshot.val().name,
          barCode: childSnapshot.val().barCode,
          value: childSnapshot.val().value,
          amount: childSnapshot.val().amount,
          aisle: childSnapshot.val().aisle,
        }
        arrayTemp.push(objectData);
      });
    });
    return arrayTemp;
  }
  const addItemList = ()=>{
    const {aisle, amount, barCode, name, value }  = productDescription;
    let newProduct = ref.push();
    newProduct.set({
      aisle : aisle ? aisle : 'null',
      amount : amount ? amount : 'null',
      barCode : barCode ? barCode : 'null',
      name : name ? name : 'null',
      value : value ? value : 'null'
    });
    let arrayTemp = updateList();
    setListProduct(arrayTemp);
  }
  const updateItemList = () => {
    const {barCode}  = productDescription;
    const index = listProduct.findIndex(item => item.barCode === barCode);
    let updates={};
    let key = listProduct[index].id;
    updates['/items/' + key] =  productDescription;
    firebase.database().ref().update(updates);
    let arrayTemp = updateList();
    setListProduct(arrayTemp);
  }

  useEffect(()=>{
    let arrayTemp = updateList();
    setListProduct(arrayTemp);
  },[]);

  useEffect(()=>{
    const {barCode}  = productDescription;
    const index = listProduct.findIndex(item => item.barCode === barCode);
    if (index < 0 ){
      addItemList();
    }else{
      updateItemList();
    }
  },[productDescription]);

  useEffect(()=> {
    console.log(listProduct);
  },[listProduct]);
    
  return (    
    <Container>
      <View>
        <Text>Shopping List</Text>
      </View>
      <Tabs initialPage={0} style={styles.tab} >
        <Tab heading="Buscar Produtos" >
          <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
            <BarCode 
              setListProduct={setListProduct}
              listProduct={listProduct}
              productDescription={productDescription}
              setProductDescription={setProductDescription}
            />
          </View>
        </Tab>
        <Tab heading="Produtos Listados" > 
          <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
            <ListProducts 
              setListProduct={setListProduct}
              listProduct={listProduct}
            />
          </View>
        </Tab>
        <Tab heading="Tab3" >
          <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
             <Text>Aba 3</Text>             
        </View>
      </Tab>
    </Tabs> 
  </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    
  },
  tab: {
    margin: 0,
  },
});
