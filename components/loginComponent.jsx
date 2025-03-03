import { View } from "react-native";
import { Text, TextInput, Menu, Button } from "react-native-paper";
import { useMemo, useState } from "react";
import React from "react";
import withCssInterop from "@/utilities/withCssInterOp";
import { cssInterop } from "nativewind";
import countryPhoneCodes from "../constants/phones";
const Login = ({ onSendOtp }) => {
  const [user, setUser] = useState({
    role: "select",
    phoneNumber: "",
    // countyPrefix: "",
  });
  const [visible, setVisible] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [loginValidatior, setLoginValidator] = useState({
    role: false,
    phoneNumber: false,
    // countyPrefix: false,
  });
  const [allValid, setAllValid] = useState(false);
  const changeHandler = ({ type, value }) => {
    setUser((prev) => {
      const updatedUser = { ...prev, [type]: value };
      setLoginValidator((prevValidator) => {
        const updatedValidator = {
          ...prevValidator,
          [type]: type === "role" ? value !== "select" : value.length === 10,
        };

        setAllValid(Object.values(updatedValidator).every(Boolean));

        return updatedValidator;
      });

      return updatedUser;
    });
  };

  const submitHandler = () => {
    if (allValid) {
      onSendOtp(user);
    }
  };
  const TextComponent = cssInterop(Text, { className: "style" });
  const TextInputComponent = useMemo(() => withCssInterop(TextInput), []);
  const ButtonComponent = withCssInterop(Button);
  const MenuItem = withCssInterop(Menu.Item);

  return (
    <View>
      <View className="items-center mb-5">
        <TextComponent
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            color: "#F8FAFC",
          }}
          variant="headlineLarge"
        >
          Welcome!
        </TextComponent>
        <View className="flex flex-row gap-2 items-center">
          <TextComponent
            style={{
              color: "black",
              fontSize: 30,
              fontWeight: "bold",
              color: "#F8FAFC",
            }}
          >
            to
          </TextComponent>
          <TextComponent
            // style={{ color: "#8258F6", fontSize: 30, fontWeight: "bold" }}
            className="text-[#4F46E5] text-4xl font-bold !important"
          >
            Xpertly
          </TextComponent>
        </View>
      </View>
      <View className="items-center">
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
          // disabled={true}
          // style={{
          //   width: "90%",
          //   backgroundColor: "transparent",
          // }}
          className="w-[90%] bg-[#F2F2F2] text-black border-red-500 placeholder-gray-500"
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
              loginValidatior.phoneNumber && user.phoneNumber.length > 0
                ? "#10B981"
                : !loginValidatior.phoneNumber && user.phoneNumber.length === 0
                ? "#6B7280"
                : "#EF4444",
            borderWidth: 2,
          }}
          style={{ backgroundColor: "#2E2E48" }}
          contentStyle={{ color: "#F8FAFC" }}
        ></TextInput>
        <View
          // style={{
          //   flexDirection: "row",
          //   width: "90%",
          //   borderWidth: 1,
          //   alignItems: "center",
          //   gap: 20,
          //   marginTop: 10,
          //   borderColor: "transparent",
          // }}
          className="flex-row w-[90%] border border-transparent items-center gap-5 mt-2.5"
        >
          <TextComponent
            // style={{ color: "black" }}
            className="text-[#FFFFFF]"
          >
            Login as
          </TextComponent>
          <Menu
            visible={visible}
            // style={{ backgroundColor: "#F2F2F2" }}
            // className="bg-[#F2F2F2]"
            contentStyle={{ backgroundColor: "#2A2A3B", borderRadius: 5 }}
            onDismiss={() => setVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setVisible(true)}
                // style={{
                //   backgroundColor: "#f8f9fa",
                //   width: "auto",
                //   minWidth: 120,
                //   borderColor: "black",
                //   borderRadius: 10,
                // }}
                className="bg-[#2A2A3B] w-auto min-w-[120px] border border-[#4F46E5] rounded-[10px]"
                labelStyle={{ color: "#F8FAFC" }}
              >
                {user.role}
              </Button>
            }
          >
            <MenuItem
              onPress={() => {
                changeHandler({ type: "role", value: "Customer" });
                setVisible(false);
              }}
              title="Customer"
              titleStyle={{ color: "#F8FAFC" }}
              style={{ backgroundColor: "#2A2A3B", borderRadius: 5 }}
            />
            <MenuItem
              onPress={() => {
                changeHandler({ type: "role", value: "Expert" });
                setVisible(false);
              }}
              title="Expert"
              titleStyle={{ color: "#F8FAFC" }}
              style={{ backgroundColor: "#2A2A3B", borderRadius: 5 }}
            />
          </Menu>
          {/* <Menu
            visible={numbers}
            style={{ backgroundColor: "#F2F2F2" }}
            className="bg-[#F2F2F2]"
            contentStyle={{ backgroundColor: "#F2F2F2", borderRadius: 0 }}
            onDismiss={() => setNumbers(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setNumbers(true)}
                style={{
                  backgroundColor: "#f8f9fa",
                  width: "auto",
                  borderRadius,
                  minWidth: 120,
                  borderColor: "transparent",
                  borderRightColor: "black",
                  borderRadius: 5,
                }}
                className="bg-[#f8f9fa] w-auto min-w-[120px] border border-black rounded-[10px]"
                labelStyle={{ color: "black" }}
              >
                {user.countyPrefix} ▾
              </Button>
            }
          >
            {countryPhoneCodes.map(({ code, country }) => (
              <MenuItem
                onPress={() => {
                  changeHandler({ type: "countyPrefix", value: code });
                  setNumbers(false);
                }}
                titleStyle={{ color: "black" }}
                title={code}
                style={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
                key={country}
              />
            ))}
          </Menu> */}
        </View>
        <ButtonComponent
          mode="contained-tonal"
          style={{
            width: "40%",
            // borderColor: "black",
            borderRadius: 5,
            // paddingHorizontal: 20,
            marginTop: 10,
            backgroundColor: allValid ? "#4F46E5" : "grey",
          }}
          // className={`w-[60%] border px-5 mt-2 ${
          //   allValid ? "bg-[#FF8C00]" : "bg-gray-500"
          // }`}
          labelStyle={{ color: "#F8FAFC" }}
          onPress={submitHandler}
          disabled={!allValid}
        >
          Send OTP
        </ButtonComponent>
      </View>
    </View>
  );
};

export default Login;
