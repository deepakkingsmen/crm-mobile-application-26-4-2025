import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Circle, G, Text as SvgText } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';

const stats = [
  { label: 'Leads', value: 828, color: '#F56565' },
  { label: 'Contacts', value: 2064, color: '#4A4A4A' },
  { label: 'Properties', value: 0, color: '#E2E8F0' },
  { label: 'Tasks', value: 0, color: '#E2E8F0' },
  { label: 'Meetings', value: 1, color: '#805AD5' },
  { label: 'Emails', value: 0, color: '#E2E8F0' },
  { label: 'Calls', value: 1, color: '#38B2AC' },
];

const leadStats = {
  total: 829,
  hot: 22,
  warm: 516,
  cold: 35,
};

const LeadDashboard = () => {
  const chartData = [
    {
      key: 1,
      value: leadStats.hot,
      svg: { fill: '#38A169' },
      label: 'Hot',
    },
    {
      key: 2,
      value: leadStats.warm,
      svg: { fill: '#ECC94B' },
      label: 'Warm',
    },
    {
      key: 3,
      value: leadStats.cold,
      svg: { fill: '#F56565' },
      label: 'Cold',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Statistics</Text>
        {stats.map((item, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Lead Statistics</Text>
        <View style={styles.leadBoxes}>
          <View style={[styles.leadBox, { backgroundColor: '#EBF4FF' }]}>
            <Text style={styles.leadTitle}>Total Leads</Text>
            <Text style={styles.leadValue}>{leadStats.total}</Text>
          </View>
          <View style={[styles.leadBox, { backgroundColor: '#C6F6D5' }]}>
            <Text style={styles.leadTitle}>Hot Leads</Text>
            <Text style={styles.leadValue}>{leadStats.hot}</Text>
          </View>
          <View style={[styles.leadBox, { backgroundColor: '#FEFCBF' }]}>
            <Text style={styles.leadTitle}>Warm Leads</Text>
            <Text style={styles.leadValue}>{leadStats.warm}</Text>
          </View>
          <View style={[styles.leadBox, { backgroundColor: '#FED7D7' }]}>
            <Text style={styles.leadTitle}>Cold Leads</Text>
            <Text style={styles.leadValue}>{leadStats.cold}</Text>
          </View>
        </View>

        <PieChart
          style={{ height: 200 }}
          data={chartData}
          innerRadius={60}
          outerRadius={80}
          padAngle={0.02}
        >
          <G>
            <SvgText
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize="18"
              fill="#2D3748"
            >
              Total{'\n'}{leadStats.total}
            </SvgText>
          </G>
        </PieChart>
        <View style={styles.legend}>
          <Text style={{ color: '#38A169' }}>● Hot</Text>
          <Text style={{ color: '#ECC94B' }}>● Warm</Text>
          <Text style={{ color: '#F56565' }}>● Cold</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF7F2',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leadBoxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leadBox: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  leadTitle: {
    fontSize: 14,
    color: '#4A5568',
  },
  leadValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default LeadDashboard;
