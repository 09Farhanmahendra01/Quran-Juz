import {
  View,
  Text,
  ScrollView,
  Image,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/dist/AntDesign";
import InternetConnectionAlert from "react-native-internet-connection-alert";

const Kumpulan_juz = ({ route, navigation }) => {
  // Variable Lokal
  const width = Dimensions.get("screen").width;
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [ayat, setAyat] = useState([]);
  const [juz, setJuz] = useState("");
  // LifeCycle
  useEffect(() => {
    get_Juz();
    ToastAndroid.show(`Juz ${route.params.nomer_Juz}`, ToastAndroid.SHORT);
  }, []);

  // get_Juz
  const get_Juz = useCallback(() => {
    let request_Option = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://api.alquran.cloud/v1/juz/${route.params.nomer_Juz}/quran-uthmani -`,
      request_Option
    )
      .then((respon) => respon.json())
      .then((result) => {
        setAyat(result.data.ayahs);
        setJuz(result.data.ayahs[0].juz);
        setLoading(true);
        console.log(result);
      })
      .then((error) => console.log("Error", error));
  });

  return loading ? (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
      title="Tidak ada koneksi internet"
      message="Harap periksa koneksi internet anda..."
    >
      <View
        style={{ flex: 1, paddingVertical: 13, backgroundColor: "#091945" }}
      >
        {/* Header */}
        <View
          style={{
            paddingLeft: 15,
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 13,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.replace("Dashboard", {
                routeName: "juz",
              })
            }
          >
            <Icon name="arrowleft" size={25} color="grey" />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              width: "80%",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 17,
                color: "white",
              }}
            >
              Juz {route.params.nomer_Juz}
            </Text>
          </View>
        </View>
        {/* Mapping */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 40 }}
        >
          {ayat.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: 25,
                }}
              >
                {/* Sebenernya Logic nya hanya di sini, untuk memberikan Title pada pergantian Surah... */}
                {item.numberInSurah == 1 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 20,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={require("./../../assets/icon/Card.png")}
                      style={{
                        width: "95%",
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderWidth: 2,
                        borderColor: "white",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: "800" }}>
                          {item.surah.revelationType}
                        </Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "white",
                            fontFamily: "Poppins-Bold",
                          }}
                        >
                          {item.surah.englishName}
                        </Text>
                        <Text
                          style={{
                            color: "#444042",
                            fontWeight: "800",
                            letterSpacing: 0.3,
                            fontStyle: "italic",
                          }}
                        >
                          {item.surah.englishNameTranslation}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 13, fontWeight: "800" }}>
                          {item.surah.numberOfAyahs}
                        </Text>
                        <Text style={{ fontWeight: "800" }}>Ayat</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    marginTop: 18,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ position: "absolute", color: "white" }}>
                      {item.numberInSurah}
                    </Text>

                    <Image
                      source={require("../../assets/icon/bingkai.png")}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View
                    style={{
                      width: "85%",
                      paddingHorizontal: 10,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        color: colorScheme == "dark" ? "white" : "white",
                        fontSize: 20,
                        lineHeight: 35,
                        fontFamily: "LPMQ IsepMisbah",
                        letterSpacing: 5,

                        lineHeight: 50,
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          {/* Lanjut Juz */}
          {juz == 30 ? (
            <></>
          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.replace("lanjutjuz", {
                    lanjutJuz: juz + 1,
                  })
                }
                style={{
                  backgroundColor: "#B99D14",
                  paddingVertical: 10,
                  alignItems: "center",
                  width: "80%",
                  marginTop: 10,
                  borderRadius: 7,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    fontFamily: "Poppins-BoldItalic",
                    letterSpacing: 1,
                  }}
                >
                  Lanjut Juz Berikutnya...
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </InternetConnectionAlert>
  ) : (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        if (connectionState.isConnected == true) {
          get_Juz();
          console.log("get Surah");
        } else if (connectionState.isConnected == false) {
          console.log("false");
        }
      }}
      title="Tidak ada koneksi internet"
      message="Harap periksa koneksi internet anda..."
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#D5CFCF",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: width / 1.1,
            alignItems: "flex-start",
          }}
        >
          <AnimatedLottieView
            source={require("../../assets/lottie/loadingbacaquran.json")}
            loop={true}
            autoPlay={true}
            style={{
              width: 320,
              height: 320,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View
          style={{
            width: width / 1.1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              left: "2%",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Mohon Tunggu Sebentar...
          </Text>
        </View>
      </View>
    </InternetConnectionAlert>
  );
};

export default Kumpulan_juz;
