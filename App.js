import React,{useState, useEffect} from 'react';
import {FlatList, ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = {
    background: {
        flex: 1,
        backgroundColor: '#131313',
        padding:30,
    },
    container: {
        margin:5,
        padding:15,
        borderRadius:20,
        backgroundColor: '#7e0332',
        borderWidth: 1,
        borderColor: 'white',
    },
    header: {
        fontSize:30,
        fontWeight: 'bold',
        color:'white',
    },
    bar: {
        borderWidth: 1,
        borderColor: 'white',
    },
    data: {
        margin: 5,
        padding:0,
        borderWidth:1,
        borderColor: 'white',
        borderRadius: 20,
    },
    text: {
        fontSize:15,
        color: 'white',
    },
    title: {
        fontSize:30,
        alignSelf: 'center',
        textAlign:'center',
        margin:20,
        color:'white',
        fontWeight: 'bold',
    },
}

let originalData = [];
const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(()  => {
        fetch("https://mysafeinfo.com/api/data?list=albumreleases2013&format=json&case=default")
            .then((response) => {
                return response.json();
            })
            .then((myJson)=> {
                if(originalData.length<1) {
                    setMydata(myJson);
                    originalData=myJson;
                }
            });
    },[]);

  const FilterData = (text) => {
      if (text!='') {
          const myFilteredData = originalData.filter((item) =>
              item.AlbumName.toLowerCase().includes(text.toLowerCase()) ||
              item.Artist.toLowerCase().includes(text.toLowerCase()) ||
              item.Genre.toLowerCase().includes(text.toLowerCase())
          );

          setMydata(myFilteredData);
      }
      else {
          setMydata(originalData);
      }
  }
  const renderItem = ({item, index}) => {
    return (
    <View style={styles.container}>
    <Text style={styles.header}>{item.AlbumName}</Text>
        <Text style={styles.text}>Artist: {item.Artist}</Text>
        <Text style={styles.text}>Genre: {item.Genre}</Text>
    </View>
    );
  };

  return (
    <View style={styles.background}>
      <StatusBar/>
        <View flexDirection="row" justifyContent="space-around" >
            <Entypo name="music" size={50} color='#7e0332' marginTop={30} />
            <Text style={styles.title}>Album Releases - 2013 (U.S.)</Text>
        </View>
        <View style={styles.container}>
      <TextInput style={styles.bar}
                 onChangeText={(text) => {FilterData(text)}}
                 placeholder="Search by album name,artist or genre"
      />
    </View>
      <FlatList style={styles.data} data={mydata} renderItem={renderItem} />
    </View>

  );
}

export default App;
