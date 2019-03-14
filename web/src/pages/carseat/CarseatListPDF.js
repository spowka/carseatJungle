import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

export function generatePDF(carseats) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    carseat: {
      width: '100%',
      height: 110,
      paddingVertical: 10,
      borderBottomWidth: 1,
      flexDirection: 'row',
    },
    image: {
      width: '15%',
      height: '100%',
      marginHorizontal: 7,
    },
    info: {
      flex: 1,
      paddingHorizontal: 7,
    },
    name: {
      fontSize: 14,
      fontStyle: 'bold',
    },
    table: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      flexDirection: 'row',
    },
    tableHalf: {
      flex: 1,
      padding: 10,
    },
    infoLine: {
      flex: 1,
      paddingTop: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lineBorder: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
    },
    infoLabel: {
      fontSize: 8,
      color: '#6c757d',
      width: 70,
    },
    infoValue: {
      fontSize: 8,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {carseats.map((carseat, idx) => {
          let direction = carseat.is_forward_facing ? 'Forward' : '';
          if (carseat.is_rear_facing && direction !== '') direction += '/';
          direction = direction + (carseat.is_rear_facing ? 'Rear' : '');
          if (carseat.is_sideways && direction !== '') direction += '/';
          direction = direction + (carseat.is_sideways ? 'Sideways' : '');
          let installation = carseat.has_isofix ? 'ISOFIX or belt' : 'Belt';
          return (
            <View key={idx} style={styles.carseat}>
              <Image
                src={carseat.image_url}
                cache={false}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.name}>
                  {carseat.model} by {carseat.brand_name}
                </Text>
                <View style={styles.table}>
                  <View style={styles.tableHalf}>
                    <View style={[styles.infoLine, styles.lineBorder]}>
                      <Text style={styles.infoLabel}>Type:</Text>
                      <Text style={styles.infoValue}>
                        {carseat.carseat_type_name}
                      </Text>
                    </View>
                    <View style={[styles.infoLine, styles.lineBorder]}>
                      <Text style={styles.infoLabel}>Direction:</Text>
                      <Text style={styles.infoValue}>{direction}</Text>
                    </View>
                    <View style={styles.infoLine}>
                      <Text style={styles.infoLabel}>Installation:</Text>
                      <Text style={styles.infoValue}>{installation}</Text>
                    </View>
                  </View>
                  <View style={styles.tableHalf}>
                    <View style={[styles.infoLine, styles.lineBorder]}>
                      <Text style={styles.infoLabel}>Group:</Text>
                      <Text style={styles.infoValue}>
                        {carseat.carseat_group_name}
                      </Text>
                    </View>
                    <View style={[styles.infoLine, styles.lineBorder]}>
                      <Text style={styles.infoLabel}>Child weight:</Text>
                      <Text style={styles.infoValue}>
                        {carseat.child_weight_group_name}
                      </Text>
                    </View>
                    <View style={styles.infoLine}>
                      <Text style={styles.infoLabel}>Child height:</Text>
                      <Text style={styles.infoValue}>
                        {carseat.child_height_group_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
