import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { data } from "../constants/data";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function Category({activeCategory,handleChangeCategory}) {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem 
        isActive={activeCategory == item}
        handleChangeCategory={handleChangeCategory}
        title={item} 
        index={index} />
      )}
    />
  );
}
const CategoryItem = ({ title, index ,isActive,handleChangeCategory}) => {
  let color=isActive? theme.colors.white:theme.colors.neutral(0.8);
  let backgroundColor=isActive? theme.colors.neutral(0.8):theme.colors.white;

  return (
    <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)} >
      <Pressable 
      onPress={()=>handleChangeCategory(isActive?null:title)}
      style={[styles.category,{backgroundColor}]}>
        <Text style={[styles.title,{color}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category:{
    paddingVertical:12,
    paddingHorizontal:15,
    borderWidth:1,
    borderColor:theme.colors.grayBG,
    borderRadius:theme.radius.sm,
    borderCurve:'continuous'
  },
  title:{
    fontWeight:theme.fontWeight.medium,
  }
});
