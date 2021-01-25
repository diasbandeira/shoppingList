import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Dialog from  'react-native-dialog';
import NewItem from './NewItem';
import UpdateItem from './UpdateItem';

export default function BarCode(props) {
  const {listProduct, setListProduct, productDescription, setProductDescription} = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(null);
  const [valueLabel, setValueLabel] = useState(null);
  const [promptVisible, setPromptVisible] = useState(false);
  const [visibleProductExist, setVisibleProductExist] = useState(false);
  const [updateValue, setUpdateValue] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const found = listProduct.findIndex(item => item.barCode === data);
    setValueLabel(listProduct[found].value);
    //console.log(value);
    if(found < 0){
      setBarCode(data);
      setPromptVisible(true);
    }else{
      setBarCode(data);
      //setUpdateValue(true);
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
    if(promptVisible){
      setPromptVisible(false);
      setProductDescription({
          barCode: barCode,
          name: product,
          value: value,
          aisle: null,
          amount: null,
      });
      setBarCode(null);
      setProduct(null);
      setValue(null);
    }else{
      setVisibleProductExist(false);
      const index = listProduct.findIndex(item => item.barCode === barCode);
      setProductDescription({
        barCode: listProduct[index].barCode,
        name: listProduct[index].name,
        value: value,
        aisle: null,
        amount: null,
      });
      setValue(null);
      //const filtered = listProduct.filter(item => item.barCode !== barCode );
      //setListProduct([...filtered, productDescription]);
    }
  }

  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      {promptVisible ? (
        <NewItem 
          visible={promptVisible}
          handleProduct={handleProduct}
          setProduct={setProduct}
          setPromptVisible={setPromptVisible}
          handleProduct={handleProduct}
          setValue={setValue}
        />
      ): (
        <UpdateItem 
          visible={visibleProductExist}
          handleProduct={handleProduct}
          value={value}
          setValue={setValue}
          updateValue={updateValue}
          setVisibleProductExist={setVisibleProductExist}
          valueLabel={valueLabel}
        />
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
