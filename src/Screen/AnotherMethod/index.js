import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './style';

const pickupData = [
  { label: 'Box', value: 'Box' },
  { label: 'Pallet', value: 'Pallet' },
  { label: 'Euro Box', value: 'Euro Box' },
];

const quantityData = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
];

const AnotherMethod = () => {
  const [pickupLocations, setPickupLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const addItem = () => {
    const newItem = { item: selectedItem, count: selectedQuantity };
    const existingLocationIndex = pickupLocations.findIndex(loc => loc.address === location);
    if (existingLocationIndex !== -1) {
      const updatedLocations = [...pickupLocations];
      updatedLocations[existingLocationIndex].pickupItems.push(newItem);
      setPickupLocations(updatedLocations);
    } else {
      setPickupLocations(prevLocations => [...prevLocations, { address: location, notes: '', pickupItems: [newItem] }]);
    }
    setSelectedItem('');
    setSelectedQuantity('');
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Location"
          value={location}
          onChangeText={text => setLocation(text)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Dropdown
            style={styles.dropdown}
            data={pickupData}
            labelField="label"
            placeholder="Select Item"
            value={selectedItem}
            onChange={item => setSelectedItem(item.label)}
          />
          <Dropdown
            style={styles.dropdown}
            data={quantityData}
            labelField="label"
            placeholder="Select Quantity"
            value={selectedQuantity}
            onChange={quantity => setSelectedQuantity(quantity.label)}
          />
          <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pickupLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.headerContainer}>Pickup Location: {item.address}</Text>
              <Text>Notes: {item.notes}</Text>
              <FlatList
                data={item.pickupItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: pickupItem }) => (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Item: {pickupItem.item}</Text>
                    <Text>Quantity: {pickupItem.count}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AnotherMethod;