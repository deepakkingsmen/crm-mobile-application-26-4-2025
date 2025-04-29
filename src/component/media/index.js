import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const iconMap = {
  email: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
  whatsapp: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
  meeting: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
};

const filters = ['all', 'email', 'whatsapp', 'meeting'];

const App = () => {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const dummyEmail = [
          { name: 'John Doe', details: 'Sent product info', timestamp: new Date(), type: 'email' },
          { name: 'Alice Smith', details: 'Followed up on proposal', timestamp: new Date(), type: 'email' },
        ];
        const dummyWhatsapp = [
          { name: 'Bob Marley', details: 'Asked for pricing', timestamp: new Date(), type: 'whatsapp' },
        ];
        const dummyMeeting = [
          { name: 'Charlie Brown', details: 'Scheduled a Zoom meeting', timestamp: new Date(), type: 'meeting' },
          { name: 'Jane Doe', details: 'Discussed roadmap', timestamp: new Date(), type: 'meeting' },
          { name: 'Mark Evans', details: 'Intro meeting', timestamp: new Date(), type: 'meeting' },
          { name: 'Lily Singh', details: 'Demo scheduled', timestamp: new Date(), type: 'meeting' },
          { name: 'James Bond', details: 'Strategy meeting', timestamp: new Date(), type: 'meeting' },
        ];

        const allData = [...dummyEmail, ...dummyWhatsapp, ...dummyMeeting];
        setData(allData);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filtered = data.filter(
    (item) =>
      (filter === 'all' || item.type === filter) &&
      (item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.details?.toLowerCase().includes(query.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reset to first page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterBar}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f ? styles.activeFilter : styles.inactiveFilter]}
            onPress={() => setFilter(f)}
          >
            {f === 'all' ? (
              <Text style={styles.filterText}>All</Text>
            ) : (
              <Image source={{ uri: iconMap[f] }} style={styles.tabIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
      />

      <View style={[styles.headerRow, { marginLeft: 10 }]}>
        <Text style={{ ...styles.headerText, flex: 2 }}>ACTIVITY</Text>
        <Text style={{ ...styles.headerText, flex: 4 }}>SENDER</Text>
        <Text style={{ ...styles.headerText, flex: 4 }}>DETAILS</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2ecc71" style={{ marginTop: 60 }} />
      ) : currentData.length > 0 ? (
        <FlatList
          data={currentData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cell}>
                <Image source={{ uri: iconMap[item.type] }} style={styles.icon} />
              </View>
              <Text style={styles.sender}>{item.name}</Text>
              <View style={[styles.detailsCell, { marginLeft: 5 }]}>
                <Text style={styles.details}>{item.details}</Text>
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
          style={{ maxHeight: Dimensions.get('window').height * 0.55 }}
        />
      ) : (
        <Text style={styles.noData}>No data found</Text>
      )}

           {/* Pagination Controls at the bottom */}
           {filtered.length > 0 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentPage === 1}
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          >
            <Text style={styles.pageText}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.pageLabel}>
            Page {currentPage} of {totalPages}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage === totalPages}
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          >
            <Text style={styles.pageText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    Flex:1,
    padding: 16,
    backgroundColor: '#F9F6F1',
    
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: 10,
  },
  filterButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 42,
  },
  activeFilter: {
    backgroundColor: '#d4f8d4',
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  inactiveFilter: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  filterText: {
    fontWeight: '600',
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  searchInput: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    marginTop: 32,
  },
 headerRow: {
  flexDirection: 'row',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  backgroundColor: 'lightyellow', // debug color
  height:40,

},

headerText: {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize:12,
  flex: 1, 

},

  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  sender: {
    flex: 2,
    textAlign: 'center',
    fontWeight: '500',
  },
  detailsCell: {
    flex: 0.5,
    gap:15
    
     },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default App;


// -----------------    ----------------      -----------------   Local host data fetching ------------     ----------------          -------------------------------




// const fetchAllData = async () => {
//   try {
//     setLoading(true);

//     const [emailRes, whatsappRes, meetingRes] = await Promise.all([
//       axios.get('http://192.168.92.160:5001/api/email'),
//       axios.get('http://192.168.92.160:5001/api/whatsapp'),
//       axios.get('http://192.168.92.160:5001/api/meeting'),
//     ]);

//     const allData = [
//       ...emailRes.data.map((d) => ({ ...d, type: 'email' })),
//       ...whatsappRes.data.map((d) => ({ ...d, type: 'whatsapp' })),
//       ...meetingRes.data.map((d) => ({ ...d, type: 'meeting' })),
//     ];

//     setData(allData);
//   } catch (err) {
//     console.error('Error fetching data:', err.message);
//   } finally {
//     setLoading(false);
//   }
// };


// useEffect(() => {
//   fetchAllData();
// }, []);


