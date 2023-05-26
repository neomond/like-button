import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, likePosts} from '../redux/slice/postSlice';
import {ActivityIndicator} from 'react-native-paper';
import {StateType} from '../redux/store';
import LikeIcon from '../assets/svgs/LikeIIcon';

const PostComponent = () => {
  const dispatch = useDispatch<any>();
  const {loading, error, posts} = useSelector(
    (state: StateType) => state.postSlice,
  );
  const [likeCounts, setLikeCounts] = useState<{[postId: string]: number}>({});
  const userId = '6411780de8b30ccf9df2aa7b';
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  //   console.log(posts);

  const handleLike = (postId: string) => {
    console.log('geldimee');

    dispatch(likePosts({postId, userId}));
  };

  const updateLikeCount = (isLiked: boolean) => {
    // setLikeCount(prevCount => (isLiked ? prevCount + 1 : prevCount - 1));
  };

  const refresh = () => {
    dispatch(getPosts());
  };

  return (
    <View style={styles.mainCont}>
      <View>
        {loading == 'pending' ? (
          <ActivityIndicator />
        ) : (
          <>
            <FlatList
              refreshing={false}
              onRefresh={refresh}
              data={posts}
              renderItem={({item}: any) => (
                <View style={{flexDirection: 'column', marginBottom: 40}}>
                  <View style={styles.postheader}>
                    <Image
                      style={{width: 32, height: 32, borderRadius: 16}}
                      source={{uri: `${item.author?.profilePicture}`}}
                    />

                    <View>
                      <Text style={styles.textColor}>
                        {item.author.username}
                      </Text>
                      <Text style={styles.textColor}>20m ago</Text>
                    </View>
                  </View>
                  <View style={{rowGap: 15}}>
                    {item.photos && (
                      <Image
                        style={{width: '100%', height: 180, borderRadius: 12}}
                        source={{uri: `${item?.photos}`}}
                      />
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => handleLike(item._id)}>
                        <LikeIcon
                          isLiked={item.isLiked}
                          onPress={updateLikeCount}
                          item={item}
                          userId={userId}
                        />
                      </TouchableOpacity>
                      <Text style={styles.textColor}>{item.likes.length}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
            {error && <Text>{error}</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  textColor: {
    color: '#fff',
  },
  postheader: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 8,
  },
  mainCont: {
    marginHorizontal: 25,
  },
});
