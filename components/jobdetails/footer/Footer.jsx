import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

//import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

//const MMKV = new MMKVLoader().initialize();

const Footer = ({ url }) => {
  //const [user, setUser] = useMMKVStorage("user", MMKV, "robert");
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
          // implement a simple storage for react native to store liked jobs 
          //onPress={() => { setUser("andrew"); }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;