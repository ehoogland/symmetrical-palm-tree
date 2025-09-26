import { useState }from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

/* import { COMMENTS } from '../shared/comments'; --IGNORE-- */

{/* Remove from CampsiteInfoScreen body: const [comments, setComments] = useState(COMMENTS); --- IGNORE ---*/}

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments); 
    /* const [favorite, setFavorite] = useState(false); --IGNORE-- */
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    
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
     * ListHeaderComponent or ListFooterComponent prop (in this case, ListHeaderComponent)
     * The ListHeaderComponent prop is used to render content at the top of the FlatList.
     * In this case, it is used to render the RenderCampsite component and a title for the comments section.
     * ListFooterComponent can be used similarly to add content at the bottom of the list.
     * 
    
     */
    return (
        <>
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
                            // isFavorite={favorite} --IGNORE--
                            isFavorite={favorites.includes(campsite.id)} 
                            // markFavorite={() => setFavorite(true)} --IGNORE--
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))} 
                            onShowModal={() => setShowModal(!showModal)}
                        />
                            <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => setShowModal(!showModal)}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </>
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
    },
    modal: { 
        justifyContent: 'center', 
        margin: 20
    }
});

export default CampsiteInfoScreen;