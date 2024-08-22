import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the Android WebView to improve user experience
    void WebBrowser.warmUpAsync();

    return () => {
      // Clean up by cooling down the WebView on component unmount
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
