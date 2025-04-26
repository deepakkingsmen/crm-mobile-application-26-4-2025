import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const CallsScreen = () => {
  const [search, setSearch] = useState('');
  const [calls, setCalls] = useState([
    {
      recipient: 'John Doe',
      senderName: 'Jane Smith',
      relatedTo: 'Lead',
      timestamp: '2025-04-25 10:30',
      created: '2025-04-24',
    },
    {
      recipient: 'Alice Johnson',
      senderName: 'Bob Lee',
      relatedTo: 'Contact',
      timestamp: '2025-04-24 15:45',
      created: '2025-04-24',
    },
    {
      recipient: 'David Brown',
      senderName: 'Charlie Moore',
      relatedTo: 'Lead',
      timestamp: '2025-04-23 09:00',
      created: '2025-04-23',
    },
  ]); // Dummy call data

  const [showAddCallModal, setShowAddCallModal] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [checkedItems, setCheckedItems] = useState({
    contact: false,
    lead: false,
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleCheckbox = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDateTime = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
  };

  const filteredCalls = calls.filter(
    (call) =>
      call.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      call.senderName?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.recipient}</Text>
      <Text style={styles.cell}>{item.senderName}</Text>
      <Text style={styles.cell}>{item.relatedTo}</Text>
      <Text style={styles.cell}>{item.timestamp}</Text>
      <Text style={styles.cell}>{item.created}</Text>
      <Text style={styles.cell}>•••</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calls ({calls.length})</Text>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <View>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddCallModal(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.cell}>#</Text>
        <Text style={styles.cell}>Recipient</Text>
        <Text style={styles.cell}>Sender Name</Text>
        <Text style={styles.cell}>Related To</Text>
        <Text style={styles.cell}>Timestamp</Text>
        <Text style={styles.cell}>Created</Text>
        <Text style={styles.cell}>Action</Text>
      </View>

      {filteredCalls.length > 0 ? (
        <FlatList
          data={filteredCalls}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>-- No Data Found --</Text>
        </View>
      )}

      {/* Add Call Modal */}
      <Modal
        visible={showAddCallModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddCallModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Call</Text>

            <View style={styles.radioGroup}>
              <Text style={styles.radioLabel}>Related</Text>
              <View style={styles.radioOptions}>
                <TouchableOpacity onPress={() => toggleCheckbox('contact')}>
                  <Text>{checkedItems.contact ? '●' : '○'} Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCheckbox('lead')}>
                  <Text>{checkedItems.lead ? '●' : '○'} Lead</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput placeholder="Recipient Name" style={styles.modalInput} />
            <TextInput placeholder="Recipient Number" style={styles.modalInput} />
            <View style={styles.modalRow}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  placeholder="dd-mm-yyyy --:--"
                  style={[styles.modalInput, { flex: 1 }]}
                  value={formatDateTime(date)}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const newDate = new Date(selectedDate);
                      newDate.setHours(date.getHours());
                      newDate.setMinutes(date.getMinutes());
                      setDate(newDate);
                      setShowTimePicker(true); // Then show time picker
                    }
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      const newDate = new Date(date);
                      newDate.setHours(selectedTime.getHours());
                      newDate.setMinutes(selectedTime.getMinutes());
                      setDate(newDate);
                    }
                  }}
                />
              )}
              <TextInput placeholder="Call Duration" style={[styles.modalInput, { flex: 1 }]} />
            </View>
            <TextInput
              placeholder="Enter Call Notes"
              multiline
              style={[styles.modalInput, { height: 80 }]}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAddCallModal(false)}>
                <Text style={{ color: 'red', padding: 10 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </SafeAreaView>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 800,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    minWidth: 800,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 14,
  },
  noData: {
    marginTop: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#8b6e63',
    padding: 12,
    borderRadius: 30,
    position: 'absolute',
    right: 16,
    bottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#8b6e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  radioGroup: {
    marginBottom: 10,
  },
  radioLabel: {
    fontWeight: '600',
    marginBottom: 5,
  },
  radioOptions: {
    flexDirection: 'row',
    gap: 15,
  },
});


// -----------------    ----------------      -----------------   Local host data fetching ------------     ----------------          -------------------------------

// import React, { useState, useEffect } from 'react'; // added useEffect
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Modal,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios'; // added axios

// const CallsScreen = () => {
//   const [search, setSearch] = useState('');
//   const [calls, setCalls] = useState([]);

//   useEffect(() => {
//     const fetchCalls = async () => {
//       try {
//         const response = await axios.get('http://192.168.92.160:5001/api/calls');
//         const formattedCalls = response.data.map((call) => ({
//           recipient: call.recipient || '',
//           senderName: call.senderName || '',
//           relatedTo: call.createByContact ? 'Contact' : 'Lead',
//           timestamp: new Date(call.timestamp).toLocaleString(),
//           created: new Date(call.startDate).toLocaleDateString(),
//         }));
//         setCalls(formattedCalls);
//       } catch (error) {
//         console.error('Error fetching calls:', error.message);
//       }
//     };

//     fetchCalls();
//   }, []);

//   const [showAddCallModal, setShowAddCallModal] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [checkedItems, setCheckedItems] = useState({
//     contact: false,
//     lead: false,
//   });
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const toggleCheckbox = (item) => {
//     setCheckedItems((prev) => ({
//       ...prev,
//       [item]: !prev[item],
//     }));
//   };

//   const onChangeDate = (event, selectedDate) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   const formatDateTime = (date) => {
//     const dd = String(date.getDate()).padStart(2, '0');
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const yyyy = date.getFullYear();
//     const hh = String(date.getHours()).padStart(2, '0');
//     const min = String(date.getMinutes()).padStart(2, '0');
//     return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
//   };

//   const filteredCalls = calls.filter(
//     (call) =>
//       call.recipient?.toLowerCase().includes(search.toLowerCase()) ||
//       call.senderName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderItem = ({ item, index }) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{index + 1}</Text>
//       <Text style={styles.cell}>{item.recipient}</Text>
//       <Text style={styles.cell}>{item.senderName}</Text>
//       <Text style={styles.cell}>{item.relatedTo}</Text>
//       <Text style={styles.cell}>{item.timestamp}</Text>
//       <Text style={styles.cell}>{item.created}</Text>
//       <Text style={styles.cell}>•••</Text>
//     </View>
//   );
// };






