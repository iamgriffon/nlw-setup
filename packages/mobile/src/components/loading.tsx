import { ActivityIndicator, View } from "react-native";
import React from 'react'

export function Loading(){
  return (
    <View className="bg-black">
      <ActivityIndicator/>
    </View>
  )
}