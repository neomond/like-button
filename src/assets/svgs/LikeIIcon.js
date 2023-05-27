import React, {useEffect, useState} from 'react';
import Svg, {Path} from 'react-native-svg';

const LikeIcon = ({item, userId}) => {
  const [pressed, setPressed] = useState();

  useEffect(() => {
    const isliked = item.likes.find(e => e == userId);
    if (isliked) {
      setPressed(true);
    } else {
      setPressed(false);
    }
  }, [item]);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={pressed ? '#ECEBED' : '#727477'}
      width={24}
      height={24}
      viewBox="0 0 24 24">
      <Path
        stroke={pressed ? '#ECEBED' : '#727477'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M9.333 6.667h3.176a1.333 1.333 0 0 1 1.193 1.929l-2.333 4.667a1.333 1.333 0 0 1-1.194.737H7.497c-.108 0-.217-.013-.323-.04l-2.507-.627m4.666-6.666V3.333A1.333 1.333 0 0 0 8 2h-.063a.603.603 0 0 0-.604.603c0 .476-.14.942-.405 1.338L4.667 7.333v6m4.666-6.666H8m-3.333 6.666H3.333A1.333 1.333 0 0 1 2 12V8a1.333 1.333 0 0 1 1.333-1.333H5"
      />
    </Svg>
  );
};

export default LikeIcon;

// <TouchableOpacity onPress={() => handleLike(item._id)}>: This is a component from React Native that renders a touchable area that responds to user presses. When the touchable area is pressed, it triggers the handleLike function with the item._id as an argument. It's likely that item represents a specific post object in a list, and item._id uniquely identifies that post.

// <LikeIcon isLiked={item.isLiked} onPress={updateLikeCount} item={item} userId={userId} />: This is the rendering of the LikeIcon component. It receives several props:

// isLiked: This prop seems to indicate whether the post is already liked. However, in this code snippet, it is not used.
// onPress: This prop seems to indicate an updateLikeCount function, but it is not used either.
// item: This prop represents the post object that the LikeIcon component is associated with.
// userId: This prop represents the ID of the user who is interacting with the component.
// const [pressed, setPressed] = useState();: This line uses the useState hook to define a state variable called pressed and a function setPressed to update its value. The initial value of pressed is not explicitly set here, so it will be undefined initially.

// useEffect(() => { ... }, [item]);: This is a useEffect hook that runs whenever the item prop changes. In this case, it is likely that the item represents a post object, and this effect is triggered whenever the item prop is updated.

// Inside the useEffect hook:

// const isLiked = item.likes.find(e => e == userId);: This line checks if the userId is present in the item.likes array. It uses the Array.prototype.find() method to search for a matching element. If a match is found, the isLiked variable will hold that element; otherwise, it will be undefined.

// if (isLiked) { setPressed(true); } else { setPressed(false); }: This condition checks the value of isLiked. If isLiked is truthy (meaning the user has already liked the post), setPressed(true) is called to update the pressed state to true. Otherwise, setPressed(false) is called to update the pressed state to false.

// Finally, the pressed state is used to determine the fill and stroke colors of the rendered SVG icon in the LikeIcon component. When pressed is true, the fill and stroke colors will be set to #ECEBED; otherwise, they will be set to #727477.

// In summary, this code snippet sets up a touchable area (TouchableOpacity) that triggers the handleLike function when pressed. It also renders a LikeIcon component that visually represents the like status of a post. The LikeIcon component checks if the user represented by userId has already liked the post (item). Based on the result, the pressed state is updated, which in turn determines the visual representation of the SVG icon.
