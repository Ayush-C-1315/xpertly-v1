import { View } from "react-native";
import { Text, TextInput, Menu, Button } from "react-native-paper";
import { useState } from "react";
import React from "react";

const Login = ({ onSendOtp }) => {
  const [user, setUser] = useState({ role: "select", phoneNumber: "" });
  const [visible, setVisible] = useState(false);
  const [loginValidatior, setLoginValidator] = useState({
    role: false,
    phoneNumber: false,
  });
  const [allValid, setAllValid] = useState(false);
  const changeHandler = ({ type, value }) => {
    setUser((prev) => ({ ...prev, [type]: value }));

    setLoginValidator((prev) => {
      const updatedValidator = {
        ...prev,
        role: type === "role" ? value !== "select" : prev.role,
        phoneNumber:
          type === "phoneNumber" ? value.length === 10 : prev.phoneNumber,
      };

      const valid = Object.values(updatedValidator).every(Boolean);
      setAllValid(valid);

      return updatedValidator;
    });
  };

  const submitHandler = () => {
    if (allValid) {
      onSendOtp(user);
    }
  };
  return (
    <View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
          }}
          variant="headlineLarge"
        >
          Welcome!
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
            to
          </Text>
          <Text style={{ color: "#8258F6", fontSize: 30, fontWeight: "bold" }}>
            Xpertly
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
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
          }}
          theme={{
            colors: {
              primary: "black",
              onSurfaceVariant: "black",
              background: "white",
              text: "black",
            },
          }}
          selectionColor="green"
          textColor="black"
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            borderWidth: 1,
            alignItems: "center",
            gap: 20,
            marginTop: 10,
            borderColor: "transparent",
          }}
        >
          <Text style={{ color: "black" }}>Login as</Text>
          <Menu
            visible={visible}
            style={{ backgroundColor: "#F2F2F2" }}
            contentStyle={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
            onDismiss={() => setVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setVisible(true)}
                style={{
                  backgroundColor: "#f8f9fa",
                  width: "auto",
                  minWidth: 120,
                  borderColor: "black",
                  borderRadius: 10,
                }}
                labelStyle={{ color: "black" }}
              >
                {user.role}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                changeHandler({ type: "role", value: "Customer" });
                setVisible(false);
              }}
              title="Customer"
              titleStyle={{ color: "black" }}
              style={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
            />
            <Menu.Item
              onPress={() => {
                changeHandler({ type: "role", value: "Expert" });
                setVisible(false);
              }}
              title="Expert"
              titleStyle={{ color: "black" }}
              style={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
            />
          </Menu>
        </View>
        <Button
          mode="contained-tonal"
          style={{
            width: "60%",
            borderColor: "black",
            borderRadius: 30,
            paddingHorizontal: 20,
            marginTop: 10,
            backgroundColor: allValid ? "#FF8C00" : "grey",
          }}
          labelStyle={{ color: "white" }}
          onPress={submitHandler}
          disabled={!allValid}
        >
          Send OTP
        </Button>
      </View>
    </View>
  );
};

export default Login;
