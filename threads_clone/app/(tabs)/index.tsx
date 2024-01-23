import * as React from 'react'
import { ScrollView,SafeAreaView,StyleSheet, Platform, RefreshControl } from 'react-native';
import Lottie from 'lottie-react-native'

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { ThreadContext } from '@/context/thread-context';
import ThreadItem from '@/components/ThreadItem';

export default function TabOneScreen() {

  const animationRef = React.useRef<Lottie>(null)

  const threads = React.useContext(ThreadContext)

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView 
          contentContainerStyle={{
            paddingHorizontal:10,
            paddingTop: Platform.select({android:30}),
            
          }}

          refreshControl={
            <RefreshControl onRefresh={() => {animationRef?.current?.play()}} refreshing={false} tintColor={'transparent'}/>
          }
        >
        <Lottie
          ref={animationRef} 
          source={require('../../Animation - 1705997678142.json')}
          autoPlay
          loop={false}
          style={{
            width:90,
            height:90,
            alignSelf:'center'

          }}
        />

        <View style={{gap:15}}>

        {
          threads?.map((thread) => (
            <ThreadItem key={thread.id} {...thread} />
            ) )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
      
  );
}