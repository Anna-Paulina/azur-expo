import React, { useRef } from "react";
import { BackHandler, StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { AZUR_HTML } from "./assets/azurContent";

// Azur is fully offline: the entire app (HTML/CSS/JS) is bundled inline
// below and loaded via source={{ html }} — no network access, no
// separate asset files to resolve, no INTERNET permission needed.
export default function App() {
  const webviewRef = useRef(null);

  React.useEffect(() => {
    const onBackPress = () => {
      if (webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#060A14" />
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: AZUR_HTML }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#060A14" },
  webview: { flex: 1, backgroundColor: "#060A14" },
});
