import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  container: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  itemDetails: {
    display: "flex",
    marginLeft: 5
  },
  title: {
    fontSize: 18,
    marginBottom: 20
  },
  subSection: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  sub: {
    display: "flex",
    flexDirection: "row",
  },
  sub_text: {
    fontSize: 15,
    marginRight: 10
  },
});

export default function PdfDocument(props) {
  const data = props.data;
  return (
    <Document>
      <Page style={styles.page}>
        {props.data
          ? (
              <View key={Math.random()} style={styles.container}>
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>Delhi Metro Ridership Report</Text>
                  <View style={styles.subSection}>
                    <View style={styles.sub}>
                      <Text style={styles.sub_text}>Ridership(In Millions) :    </Text>
                      <Text style={styles.sub_text}>{data.ridershipInMillions}</Text>
                    </View>
                  </View>
                  <View style={styles.subSection}>
                    <View style={styles.sub}>
                      <Text style={styles.sub_text}>Avg Daily Ridership(In M) :    </Text>
                      <Text style={styles.sub_text}>{data.avgDailyRidershipInMillions}</Text>
                    </View>
                  </View>
                  <View style={styles.subSection}>
                    <View style={styles.sub}>
                      <Text style={styles.sub_text}>Network Length :    </Text>
                      <Text style={styles.sub_text}>{data.networkLength}</Text>
                    </View>
                  </View>
                  <View style={styles.subSection}>
                    <View style={styles.sub}>
                      <Text style={styles.sub_text}>Year :    </Text>
                      <Text style={styles.sub_text}>{data.year}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          : ""}
      </Page>
    </Document>
  );
}
