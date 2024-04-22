import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PickupLocation from './src/Screen/PIckupLocation'
import DropoffLocation from './src/Screen/DropLocation'


const App = () => {
  return (

    <>
    <ScrollView>
  <PickupLocation/>

  <DropoffLocation/>
    </ScrollView>
    </>
  )
}

export default App