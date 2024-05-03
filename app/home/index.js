import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { useState } from "react";
import Category from "../../components/category";
import { apiCall } from "../../api";
import ImageGride from "../../components/imageGride";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 20;
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      }else{
        setImages([...res.data.hits])
      }
    }
  };

  useEffect(() => { 
    fetchImages();
  }, []);

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
  };

  console.log(activeCategory);
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={26}
            colors={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search Pixels.."
            style={styles.searchInput}
            value={search}
            ref={searchInputRef}
            onChangeText={(value) => setSearch(value)}
          />
          {search && (
            <Pressable style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={30}
                color={theme.colors.neutral(0.6)}
                style={styles.closeIcons}
              />
            </Pressable>
          )}
        </View>
        {/* categories  */}
        <View style={styles.categories}>
          {/* passing state(null) and function */}
          <Category
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
{/* images container  */}

<View>
  {
    images.length > 0 &&<ImageGride images={images}/>
  }
</View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeight.semibold,
    colors: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    padding: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});
