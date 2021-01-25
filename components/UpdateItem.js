import React from 'react';
import { View,} from 'react-native';
import Dialog from  'react-native-dialog';

const UpdateItem = (props) =>{
const {
    visible, 
    handleProduct, 
    value, 
    setValue, 
    updateValue, 
    setVisibleProductExist, 
    valueLabel
} = props;
return(
    <View>
        <Dialog.Container visible={visible}>
            <Dialog.Title>Valor anterior do Produto R$: {valueLabel}. Alterar valor? </Dialog.Title>
            <Dialog.Input onChangeText={event => setValue(event)}  placeholder="novo valor"/>
            <Dialog.Button label="Não" onPress={() => setVisibleProductExist(false)}/>
            <Dialog.Button label="Sim" onPress={handleProduct}/>
        </Dialog.Container>
    </View>
 );
}
export default UpdateItem;