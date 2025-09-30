import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';
// import { COMMENTS } from '../shared/comments'; --IGNORE--

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    
    const handleSubmit = () => {
        const newComment = { author, rating, text, campsiteId: campsite.id };
        dispatch(postComment(newComment));
        setShowModal(false);
    };
    
    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };
    
    const renderCommentItem = ({ item }) => (
        <View style={styles.commentItem}>
            <Text style={{ fontSize: 14 }}>{item.text}</Text>
            <Rating
                readonly
                startingValue={item.rating}
                imageSize={10}
                style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
            <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
        </View>
    );
    /** Flatlist has to be at top to make whole screen scrollable
     * @note originally was data={comments.filter((comment) => comment.campsiteId === campsite.id)}
     * now using data={comments.commentsArray.filter((comment) => comment.campsiteId === campsite.id)}
     * because comments itself is now an object with isLoading, errMess, commentsArray and not just an array
     * @note we are getting campsite.id from our {route} prop at the top:
     *  const CampsiteInfoScreen = ({ route }) => {...}. The outer parentheses () around {route} indicates
     *  that we are destructuring the route object to get the campsite.id. The inner curly braces {} indicate
     *  that we are extracting the route property from the props object.
     */
    return (
        <>
            <FlatList
                data={comments.commentsArray.filter((comment) => comment.campsiteId === campsite.id)}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            campsiteId={campsite.id}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(true)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />

            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                            <Rating
                                showRating
                                startingValue={rating}
                                imageSize={40}
                                onFinishRating={(r) => setRating(r)}
                                style={{ paddingVertical: 10 }}
                            />
                            <Input
                                placeholder='Author'
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                leftIconContainerStyle={{ paddingRight: 10 }}
                                onChangeText={(val) => setAuthor(val)}
                                value={author}
                            />
                            <Input
                                placeholder='Comment'
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                leftIconContainerStyle={{ paddingRight: 10 }}
                                onChangeText={(val) => setText(val)}
                                value={text}
                            />

                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { handleSubmit(); resetForm(); }}
                            color='#5637DD'
                            title='Submit'
                        />
                    </View>

                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { resetForm(); setShowModal(false); }}
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
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;