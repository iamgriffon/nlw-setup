
import { StatusBar } from 'expo-status-bar';
import { Text, View  } from 'react-native';

export default function App() {
  return (
    <View className='bg-background h-full w-100'>
      <Text className='text-black'>CU</Text>
      <StatusBar style='light' />
    </View>
  );
}