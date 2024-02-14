import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from 'react-native-svg';

const FavoriteIcon = ({ width, height, fill }) => (
    <Svg width={width} height={height} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7.2752 13.35L6.2203 12.3897C2.47357 8.99215 0 6.75139 0 4.00136C0 1.7606 1.7606 0 4.00136 0C5.26725 0 6.48221 0.589292 7.2752 1.52052C8.0682 0.589292 9.28316 0 10.549 0C12.7898 0 14.5504 1.7606 14.5504 4.00136C14.5504 6.75139 12.0768 8.99215 8.33011 12.3969L7.2752 13.35Z" fill="#FF8181"
      />
    </Svg>
  );
  
  const UnfavoriteIcon = ({ width, height, fill }) => (
    <Svg width={width} height={height} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
     d="M6.55689 12.0199L6.55617 12.0193C4.67274 10.3114 3.15003 8.9295 2.09215 7.63615C1.04001 6.34981 0.5 5.21213 0.5 4.00136C0.5 2.03674 2.03674 0.5 4.00136 0.5C5.11585 0.5 6.19333 1.02126 6.89453 1.84469L7.2752 2.29172L7.65588 1.84469C8.35708 1.02126 9.43455 0.5 10.549 0.5C12.5137 0.5 14.0504 2.03674 14.0504 4.00136C14.0504 5.21214 13.5104 6.34984 12.4581 7.63719C11.4005 8.93119 9.87829 10.3144 7.99553 12.0254L7.99492 12.0259L7.99384 12.0269L7.27648 12.675L6.55689 12.0199Z" stroke="#323743"
    />
  </Svg>
  );
  

const Favorite = ({isFavorite, handleToggleFavorite}) => {
    return (
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
        {isFavorite ? <FavoriteIcon width={24} height={24} fill="red" /> : <UnfavoriteIcon width={24} height={24} fill="black" />}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    favoriteButton: {
        zIndex: 99,
        position: "absolute",
        top: 10,
        left: 10
    }
})

export default Favorite;