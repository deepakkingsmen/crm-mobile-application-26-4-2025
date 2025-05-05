import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

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
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [newCall, setNewCall] = useState({
    recipient: '',
    senderName: '',
    relatedTo: '',
    timestamp: '',
    created: '',
  });

  const filteredCalls = calls.filter(
    call =>
      call.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      call.senderName?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);

  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {index + 1 + (currentPage - 1) * itemsPerPage}
      </Text>
      <Text style={styles.cell}>{item.recipient}</Text>
      <Text style={styles.cell}>{item.senderName}</Text>
      <Text style={styles.cell}>{item.relatedTo}</Text>
      <Text style={styles.cell}>{item.timestamp}</Text>
      <Text style={styles.cell}>{item.created}</Text>
    </View>
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleSave = () => {
    setCalls([{...newCall}, ...calls]);
    setIsModalVisible(false);
    setNewCall({
      recipient: '',
      senderName: '',
      relatedTo: '',
      timestamp: '',
      created: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Calls ({calls.length})</Text>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={text => {
            setSearch(text);
            setCurrentPage(1);
          }}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>#</Text>
            <Text style={styles.cell}>Recipient</Text>
            <Text style={styles.cell}>Sender Name</Text>
            <Text style={styles.cell}>Related To</Text>
            <Text style={styles.cell}>Timestamp</Text>
            <Text style={styles.cell}>Created</Text>
          </View>

          {paginatedCalls.length > 0 ? (
            <FlatList
              data={paginatedCalls}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>-- No Data Found --</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Pagination Controls */}
      {filteredCalls.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentPage === 1}
            style={styles.pageButton}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage === totalPages}
            style={styles.pageButton}>
            <Text>{'>'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal */}
      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Call</Text>

            <TextInput
              placeholder="Recipient Number"
              value={newCall.recipient}
              onChangeText={text => setNewCall({...newCall, recipient: text})}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Receipent Name"
              value={newCall.senderName}
              onChangeText={text => setNewCall({...newCall, senderName: text})}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Related To"
              value={newCall.relatedTo}
              onChangeText={text => setNewCall({...newCall, relatedTo: text})}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Call Duration"
              value={newCall.timestamp}
              onChangeText={text => setNewCall({...newCall, timestamp: text})}
              style={styles.modalInput}
            />
           <TouchableOpacity
  onPress={() => {
    if (Platform.OS === 'android') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(true); // iOS can still use single datetime if needed
    }
  }}
  style={[styles.modalInput, { justifyContent: 'center' }]}
>
  <Text>{newCall.created || 'Date-Time'}</Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={newCall.created ? new Date(newCall.created) : new Date()}
    mode="date"
    display="default"
    onChange={(event, date) => {
      setShowDatePicker(false);
      if (date) {
        const updatedDate = new Date(date);
        setNewCall((prev) => ({
          ...prev,
          created: updatedDate.toISOString().slice(0, 10),
        }));
        setShowTimePicker(true);
      }
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={newCall.created ? new Date(newCall.created) : new Date()}
    mode="time"
    display="default"
    onChange={(event, time) => {
      setShowTimePicker(false);
      if (time) {
        const selected = new Date(time);
        const combinedDateTime = new Date(newCall.created);
        combinedDateTime.setHours(selected.getHours(), selected.getMinutes());
        setNewCall((prev) => ({
          ...prev,
          created: combinedDateTime.toISOString().slice(0, 16).replace('T', ' '),
        }));
      }
    }}
  />
)}

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={{color: '#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {marginTop: 75},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  title: {fontSize: 22, fontWeight: 'bold', flex: 1},
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    flex: 1,
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
    marginBottom: 15,
  },
  addButtonText: {color: '#fff', fontWeight: '600', marginLeft: 6},
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
  cell: {flex: 1, paddingHorizontal: 4, fontSize: 14},
  noData: {marginTop: 20, alignItems: 'center'},
  noDataText: {fontSize: 16, color: '#999'},
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageButton: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  pageInfo: {fontSize: 14, marginHorizontal: 10},
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
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
});

// 9999999999999999999999999999999------------------------------------0000000000000000000000000000000000000----------------------------

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

// const CallsScreen = () => {
//   const [search, setSearch] = useState('');
//   const [calls, setCalls] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   // Fetch call data from the API
//   useEffect(() => {
//     const fetchCalls = async () => {
//       try {
//         const response = await axios.get('https://crm-backend-25-4-2025-new.onrender.com/api/call');
//         console.log('API Response:', response.data);
//         setCalls(response.data);
//       } catch (error) {
//         console.error('Error fetching calls:', error.message);
//         setTimeout(fetchCalls, 5000); // Retry after 5 seconds
//       }
//     };

//     fetchCalls();
//   }, []);

//   const filteredCalls = calls.filter(
//     (call) =>
//       call.recipient?.toLowerCase().includes(search.toLowerCase()) ||
//       call.senderName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);

//   const paginatedCalls = filteredCalls.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const renderItem = ({ item, index }) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{index + 1 + (currentPage - 1) * itemsPerPage}</Text>
//       <Text style={styles.cell}>{item.recipient}</Text>
//       <Text style={styles.cell}>{item.senderName}</Text>
//       <Text style={styles.cell}>{item.relatedTo}</Text>
//       <Text style={styles.cell}>{item.timestamp}</Text>
//       <Text style={styles.cell}>{item.created}</Text>
//     </View>
//   );

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Search and Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Calls ({calls.length})</Text>
//         <TextInput
//           placeholder="Search..."
//           value={search}
//           onChangeText={(text) => {
//             setSearch(text);
//             setCurrentPage(1); // reset to page 1 on search
//           }}
//           style={styles.searchInput}
//         />
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add" size={20} color="#fff" />
//           <Text style={styles.addButtonText}>+ Add New</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Table */}
//       <ScrollView horizontal>
//         <View>
//           <View style={styles.tableHeader}>
//             <Text style={styles.cell}>#</Text>
//             <Text style={styles.cell}>Recipient</Text>
//             <Text style={styles.cell}>Sender Name</Text>
//             <Text style={styles.cell}>Related To</Text>
//             <Text style={styles.cell}>Timestamp</Text>
//             <Text style={styles.cell}>Created</Text>
//           </View>

//           {paginatedCalls.length > 0 ? (
//             <FlatList
//               data={paginatedCalls}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => index.toString()}
//             />
//           ) : (
//             <View style={styles.noData}>
//               <Text style={styles.noDataText}>-- No Data Found --</Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>

//       {/* Pagination Controls */}
//       {filteredCalls.length > 0 && (
//         <View style={styles.paginationContainer}>
//           <TouchableOpacity onPress={handlePrevious} disabled={currentPage === 1} style={styles.pageButton}>
//             <Text>{'<'}</Text>
//           </TouchableOpacity>

//           <Text style={styles.pageInfo}>
//             Page {currentPage} of {totalPages}
//           </Text>

//           <TouchableOpacity onPress={handleNext} disabled={currentPage === totalPages} style={styles.pageButton}>
//             <Text>{'>'}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default CallsScreen;

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
