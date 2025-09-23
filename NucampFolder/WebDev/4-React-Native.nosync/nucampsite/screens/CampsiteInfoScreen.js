import { useState }from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
/* import { COMMENTS } from '../shared/comments'; --IGNORE-- */

{/* Remove from CampsiteInfoScreen body: const [comments, setComments] = useState(COMMENTS); --- IGNORE ---*/}

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const [favorite, setFavorite] = useState(false);
   

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}    >
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    /**
     * FlatList needs to be at the top level of the return statement
     * in order to regulate the scroll height of the entire screen and to
     * make the whole screen scrollable.
     *
     * The data prop is set to the comments array filtered by the campsiteId because
     * it is a common pattern to only show comments relevant to the currently displayed item.
     * 
     * keyExtractor is used to extract a unique key for each item in the list.
     * Here, it converts the id of each comment to a string to ensure it is unique and
     * to ensure it avoids the error message regarding missing keys in lists.
     *
     * To add material above or below the Flatlist, use a
     ListHeaderComponent or ListFooterComponent prop (in this case, ListHeaderComponent) */
    return (
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite campsite={campsite} 
                    campsiteId={campsite.id}  
                    isFavorite={favorite} 
                    markFavorite={() => setFavorite(true)}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color:'#43484D', 
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    }
});

export default CampsiteInfoScreen;