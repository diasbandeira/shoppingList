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
import * as firebase from 'firebase';
import 'firebase/firestore';


export default function App() {
  const [listProduct, setListProduct] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyBDRAhOv-sj31E8_GG3VEbrTAp0sebrzks",
    authDomain: "listadecompra-541de.firebaseapp.com",
    databaseURL: "https://listadecompra-541de.firebaseio.com",
    projectId: "listadecompra-541de",
    storageBucket: "listadecompra-541de.appspot.com",
    messagingSenderId: "839365746259",
    appId: "1:839365746259:web:9ea425ca4478acf41ef0a6"
  };
  firebase.initializeApp(firebaseConfig);
  const dbh = firebase.firestore();
  dbh.collection("ListaDeCompra").doc("items").set({
    "aisle" : 1,
    "amount" : 1,
    "barCode" : 123434,
    "name" : "nome",
    "value" : "000"
  })

  const firebaseApp = firebase.initializeApp(firebaseConfig);



  useEffect(()=>{
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
