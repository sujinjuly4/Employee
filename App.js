import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView } from 'react-native'

import Route from "./src"

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Route />
    </SafeAreaView>
  )
}


export default App
