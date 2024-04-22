import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {styles} from './style';

const pickupData = [
  {label: 'Box', value: '1'},
  {label: 'Euro Box', value: '2'},
  {label: 'Euro Pallet', value: '3'},
];

const quantityData = [
  {label: '10', value: '1'},
  {label: '20', value: '2'},
  {label: '30', value: '3'},
];
  
const PickupLocation = () => {
  const [pickupType, setPickupType] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [pickupList, setPickupList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isClick, setIsClick] = useState();
  const [addItem, setAddItem] = useState([]);
  const [addpickup, setAddPickup] = useState([]);

  console.log('object', JSON.stringify(pickupList));

  const handleLocation = text => {
    setLocation(text);
  };

  const handleChange = item => {
    setPickupType(item.label);
  };

  const handleQuantity = item => {
    setSelectedQuantity(item.label);
  };

  const handlelistChange = () => {
    if (pickupType && selectedQuantity && location) {
      const newItem = {item: pickupType, count: selectedQuantity};
      const locationIndex = pickupList.findIndex(
        item => item.location === location,
      );
      if (locationIndex !== -1) {
        setPickupList(prevList => {
          const newList = [...prevList];
          newList[locationIndex].items.push(newItem);
          return newList;
        });
      } else {
        setPickupList(prevList => [...prevList, {location, items: [newItem]}]);
      }
      setPickupType('');
      setSelectedQuantity('');
      setIsClick(true);
    }
  };
  useEffect(() => {
    handlelistChange();
  }, [pickupType, selectedQuantity, location]);

  const handleAddItem = () => {
    const newItem = (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          data={pickupData}
          labelField="label"
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="Select Pickup Type"
          value={pickupType}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          data={quantityData}
          labelField="label"
          onChange={handleQuantity}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="Count"
          value={selectedQuantity}
        />
      </View>
    );

    setAddItem([newItem, ...addItem]);
  };
  const handleAddPick = () => {
    if (pickupType && selectedQuantity && location) {
      const newItem = {item: pickupType, count: selectedQuantity};
      const locationIndex = pickupList.findIndex(
        item => item.location === location,
      );
      if (locationIndex !== -1) {
        setPickupList(prevList => {
          const newList = [...prevList];
          newList[locationIndex].items.push(newItem);
          return newList;
        });
      } else {
        setPickupList(prevList => [...prevList, {location, items: [newItem]}]);
      }
      setPickupType('');
      setSelectedQuantity('');
      alert('Please select type and quantity');
    }
  };

  const AddDropLocation = () => {
    setAddItem([]);
    setPickupType('');
    setSelectedQuantity('');
    setLocation('');

    const newData = (
      <View>
        <TextInput
          placeholder="Select Location"
          style={styles.textInput}
          onChangeText={handleLocation}
          value={location}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={pickupData}
            labelField="label"
            onChange={handleChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Pickup Type"
            value={pickupType}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={quantityData}
            labelField="label"
            onChange={handleQuantity}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Count"
            value={selectedQuantity}
          />
        </View>

        {addItem.map((item, index) => (
          <View key={index}>{item}</View>
        ))}
        <TouchableOpacity style={styles.addItem} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
    setAddPickup([...addpickup, newData]);
  };
  return (
    <ScrollView>
      <View>
        <Text style={styles.headerContainer}>Dropoff Information</Text>
        <TextInput
          placeholder="Select Location"
          style={styles.textInput}
          onChangeText={handleLocation}
          value={location}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={pickupData}
            labelField="label"
            onChange={handleChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Pickup Type"
            value={pickupType}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={quantityData}
            labelField="label"
            onChange={handleQuantity}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Count"
            value={selectedQuantity}
          />
        </View>

        {addItem.map((item, index) => (
          <View key={index}>{item}</View>
        ))}

        <TouchableOpacity style={styles.addItem} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addItem} onPress={AddDropLocation}>
          <Text style={styles.buttonText}>Add Dropoff location</Text>
        </TouchableOpacity>


        

        <Text style={styles.headerContainer}>Dropoff Pickups:</Text>
        {pickupList.map((pickup, index) => (
          <View key={index}>
            <Text>Location: {pickup.location}</Text>
            {pickup.items.map((item, itemIndex) => (
              <Text key={itemIndex}>
                Item: {item.item}, Count: {item.count}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PickupLocation;
