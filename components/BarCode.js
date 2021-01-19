import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Dialog from  'react-native-dialog';

export default function BarCode(props) {
  const {listProduct, setListProduct} = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(null);
  const [promptVisible, setPromptVisible] = useState(false);
  const [visibleProductExist, setVisibleProductExist] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const found = listProduct.findIndex(item => item.barCode === data);
    if(found < 0){
      setBarCode(data);
      setPromptVisible(true);
    }else{
      setBarCode(data);
      setVisibleProductExist(true);
    }    
  };

 
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleProduct = () => {
    let productDescription = {};
    if(promptVisible){
      setPromptVisible(false);
      productDescription = {
          barCode: barCode,
          name: product,
          value: value,
          aisle: null,
          amount: null,
      };
      setListProduct([...listProduct, productDescription]);
    }else{
      setVisibleProductExist(false);
      const index = listProduct.findIndex(item => item => item.barCode === barCode);
      productDescription ={
        barCode: listProduct[index].barCode,
        name: listProduct[index].name,
        value: value,
      }
      const filtered = listProduct.filter(item => item.barCode !== barCode );
      setListProduct([...filtered, productDescription]);
    }
  }

  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      {promptVisible ? (<Dialog.Container visible={promptVisible}>
        <Dialog.Title>Adicionar Produto</Dialog.Title>
        <Dialog.Input onChangeText={event => setProduct(event)} placeholder="Descrição do produto"/>
        <Dialog.Input onChangeText={event => setValue(event)} placeholder="Valor do produto"  />
        <Dialog.Button label="Cancelar" onPress={() => setPromptVisible(false)}/>
        <Dialog.Button label="Adicionar" onPress={handleProduct}/>
      </Dialog.Container>): (
      <Dialog.Container visible={visibleProductExist}>
        <Dialog.Title>Informe valor do produto:</Dialog.Title>
        {/* <Dialog.Input onChangeText={event => setProduct(event)} placeholder="Descrição do produto"/> */}
        <Dialog.Input onChangeText={event => setValue(event)} placeholder="Valor do produto"  />
        <Dialog.Button label="Cancelar" onPress={() => setVisibleProductExist(false)}/>
        <Dialog.Button label="Adicionar" onPress={handleProduct}/>
      </Dialog.Container>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
