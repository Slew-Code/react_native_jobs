import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from "../components";

import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import { Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

// To save data
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
    }
}

// To read data
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}

function Home({ navigation }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");  

    const handleHeaderLeftClick = () => {
        // Use router.push to navigate to the NewCard screen when headerRight is clicked
        //router.push("PopularJobCard"); // Replace "NewCard" with the actual name you assigned to your card screen
        console.log("Left");
        navigation.openDrawer();
    };       

    const handleHeaderRightClick = () => {
        // Use router.push to navigate to the NewCard screen when headerRight is clicked
        //router.push("PopularJobCard"); // Replace "NewCard" with the actual name you assigned to your card screen
        console.log("Right");
        
    };

    return (
        // shows content safely without overlap 
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }} >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                        iconUrl={icons.menu} dimension="60%" 
                        handlePress={handleHeaderLeftClick}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={images.profile} dimension="100%"
                            handlePress={handleHeaderRightClick} // Call the function when headerRight is clicked
                        />
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

function NotificationsScreen({ navigation }) {
    const [storedValue, setStoredValue] = useState('');

    storeData('Hello, world!');

    useEffect(() => {
        const fetchStoredValue = async () => {
            const value = await AsyncStorage.getItem('@storage_Key');
            if (value !== null) {
                setStoredValue(value);
            }
        };

        fetchStoredValue();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
            <Text>{storedValue}</Text>
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (       
        <Drawer.Navigator initialRouteName="Home" options={{ headerTitle: "sfs" }} >
            <Drawer.Screen name="Home" component={Home} /> 
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />   
        </Drawer.Navigator>
    );
}