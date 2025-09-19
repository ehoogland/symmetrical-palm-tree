import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { FILMS } from '../shared/films';

const FilmCatalogue = () => {
  const [films] = useState(FILMS);
  const [expandedId, setExpandedId] = useState(null);

  const renderFilm = ({item}) => {
    const expanded = expandedId === item.id;
    const subtitle = (
      <View>
        <Text>{item.director}</Text>
        {expanded && (
          <>
            <Text>{item.category} • {item.language}</Text>
            <Text>{item.year}</Text>
          </>
        )}
      </View>
    );

    return (
      <ListItem onPress={() => setExpandedId(expanded ? null : item.id)}>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
      </ListItem>
    );
  };

  const Header = () => (
    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, marginTop: 18, marginBottom: 10 }}>Film Catalogue</Text>
  );

  return (
    <Card>
      <FlatList 
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
        data={films}
        renderItem={renderFilm}
        keyExtractor={item=>item.id.toString()}
      />
    </Card>
  );
};


export default FilmCatalogue;