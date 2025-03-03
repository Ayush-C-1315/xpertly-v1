import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { cssInterop } from "nativewind";

import withCssInterop from "@/utilities/withCssInterOp";

import countryPhoneCodes from "../constants/phones";

const Login = ({ onSendOtp }) => {
  const [user, setUser] = useState({
    role: "Customer",
    phoneNumber: "",
  });

  const [numbers, setNumbers] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const changeHandler = ({ type, value }) => {
    if (type === "phoneNumber") {
      setUser((prevUser) => ({ ...prevUser, [type]: value }));
      if (value.length === 10) {
        setValidPhoneNumber(true);
      } else {
        setValidPhoneNumber(false);
      }
    } else {
      onSendOtp({ ...user, [type]: value });
    }
  };
  const TextComponent = cssInterop(Text, { className: "style" });
  const ButtonComponent = withCssInterop(Button);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <View></View>
      <View className="items-center">
        <View
          className="items-center mb-5"
          style={{ justifySelf: "center", marginBottom: 30 }}
        >
          <TextComponent
            variant="headlineLarge"
            style={{
              color: "black",
              fontSize: 30,
              fontFamily: "Poppins_500Medium",
              fontFamily: "Merriweather_700Bold",
              color: "#F8FAFC",
            }}
          >
            Welcome!
          </TextComponent>
          <View className="flex flex-row gap-2 items-center">
            <TextComponent
              variant="headlineLarge"
              style={{
                color: "black",
                fontSize: 30,
                color: "#F8FAFC",
                fontFamily: "Poppins_500Medium",
              }}
            >
              to
            </TextComponent>
            <TextComponent
              variant="headlineLarge"
              style={{
                fontFamily: "Poppins_500Medium",
                color: "#4F46E5",
                fontSize: 30,
              }}
            >
              Xpertly
            </TextComponent>
          </View>
        </View>
        <TextInput
          label={"Phone"}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
          value={user.phoneNumber}
          onChangeText={(input) => {
            const value = input.replace(/[^0-9]/g, "").slice(0, 10);
            changeHandler({ type: "phoneNumber", value });
          }}
          style={{
            width: "90%",
            backgroundColor: "transparent",
            backgroundColor: "#2E2E48",
          }}
          theme={{
            colors: {
              primary: "#4F46E5",
              onSurfaceVariant: "#E0E7FF",
              background: "#F2F2F2",
              placeholder: "red",
              surfaceDisabled: "#F2F2F2",
              onSurfaceDisabled: "#E0E7FF",
            },
          }}
          selectionColor="green"
          borderColor="#7C3AED"
          outlineStyle={{
            borderColor:
              validPhoneNumber && user.phoneNumber.length > 0
                ? "#10B981"
                : !validPhoneNumber && user.phoneNumber.length === 0
                ? "#6B7280"
                : "#EF4444",
            borderWidth: 2,
          }}
          contentStyle={{
            color: "#F8FAFC",
            fontFamily: "Manrope_300Light",
          }}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            borderWidth: 1,
            alignItems: "center",
            marginTop: 10,
            borderColor: "transparent",
            paddingLeft: 10,
            paddingVertical: 5,
          }}
        >
          <TextComponent
            variant="labelMedium"
            className="text-[#A6A6B2]"
            style={{ fontFamily: "Manrope_300Light" }}
          >
            Logging in as Customer
          </TextComponent>
        </View>
        <ButtonComponent
          mode="contained-tonal"
          style={{
            width: "90%",
            borderRadius: 5,
            paddingVertical: 5,
            marginTop: 10,
            backgroundColor: validPhoneNumber ? "#4F46E5" : "grey",
          }}
          labelStyle={{ color: "#F8FAFC", fontFamily: "Manrope_700Bold" }}
          onPress={() => changeHandler({ type: "role", value: "Customer" })}
          disabled={!validPhoneNumber}
        >
          Sign In
        </ButtonComponent>
      </View>
      <View style={{ alignItems: "center", justifySelf: "flex-end" }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#A6A6B2",
            width: "90%",
            position: "relative",
            backgroundColor: "#A6A6B2",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              position: "absolute",
              top: -2,
              backgroundColor: "#1E1E2E",
              paddingHorizontal: 5,
              zIndex: 5,
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "Manrope_700Bold",
              color: "#A6A6B2",
            }}
          >
            or
          </Text>
        </View>
        <ButtonComponent
          mode="contained-tonal"
          style={{
            width: "90%",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 10,
            backgroundColor: validPhoneNumber ? "#4F46E5" : "grey",
          }}
          labelStyle={{ color: "#F8FAFC", fontFamily: "Manrope_700Bold" }}
          onPress={() => changeHandler({ type: "role", value: "Expert" })}
          disabled={!validPhoneNumber}
        >
          Continue as Expert
        </ButtonComponent>
      </View>
    </View>
  );
};

export default Login;
