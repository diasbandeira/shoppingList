import React from 'react';
import { View } from 'react-native';
import Dialog from  'react-native-dialog';

const NewItem = (props)=> {
    const {visible, setProduct, setValue, setPromptVisible, handleProduct} = props;
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Adicionar Produto</Dialog.Title>
                <Dialog.Input onChangeText={event => setProduct(event)} placeholder="Descrição do produto"/>
                <Dialog.Input onChangeText={event => setValue(event)} placeholder="Valor do produto"  />
                <Dialog.Button label="Cancelar" onPress={() => setPromptVisible(false)}/>
                <Dialog.Button label="Adicionar" onPress={handleProduct}/>
            </Dialog.Container>
        </View>
    );
}
export default NewItem;