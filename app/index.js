import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome,} from "../components";
//import NewCard from "./NewCard";
import PopularJobCard from "../components/common/cards/popular/PopularJobCard";

const Home = () => {
        const router = useRouter();
        const [searchTerm, setSearchTerm] = useState("");

        const handleHeaderLeftClick = () => {
            // Use router.push to navigate to the NewCard screen when headerRight is clicked
            //router.push("PopularJobCard"); // Replace "NewCard" with the actual name you assigned to your card screen
            console.log("Left");
        };        

        const handleHeaderRightClick = () => {
            // Use router.push to navigate to the NewCard screen when headerRight is clicked
            //router.push("PopularJobCard"); // Replace "NewCard" with the actual name you assigned to your card screen
            console.log("Right");
        };

        return (
            // shows content safely without overlap 
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
                        headerTitle: "",
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

export default Home;