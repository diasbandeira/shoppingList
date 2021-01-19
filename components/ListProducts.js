import React, { useState, useEffect } from 'react';
//import { Text, View, StyleSheet, Button } from 'react-native';
import { StyleSheet, SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Dialog from  'react-native-dialog';
const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function ListProducts(props) {
  const {listProduct, setListProduct} = props;
  
  const renderItem = ({ item }) => <Item title={`${item.barCode} - ${item.name} - R$ ${item.value}`}/>;
  return (
    <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
    {/*           {!listProduct && listProduct.map((item, index) => (
                <Text key={index}>{item.barCode} - {item.name}</Text> 
              ))} */}
    

        <SafeAreaView style={styles.container}>
            <FlatList 
                data={listProduct} 
                renderItem={renderItem} 
                keyExtractor={item => item.barCode} 
            />
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        },
    item: {
        backgroundColor: '#ccc',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
});
