import { View } from "react-native";
import { Text, TextInput, Menu, Button } from "react-native-paper";
import { useMemo, useState } from "react";
import React from "react";
import withCssInterop from "@/utilities/withCssInterOp";
import { cssInterop } from "nativewind";
const Login = ({ onSendOtp }) => {
  const [user, setUser] = useState({ role: "select", phoneNumber: "" });
  const [visible, setVisible] = useState(false);
  const [loginValidatior, setLoginValidator] = useState({
    role: false,
    phoneNumber: false,
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
          // style={{
          //   color: "black",
          //   fontSize: 30,
          //   fontWeight: "bold",
          // }}
          className="text-black text-4xl font-bold"
          variant="headlineLarge"
        >
          Welcome!
        </TextComponent>
        <View className="flex flex-row gap-2 items-center">
          <TextComponent
            // style={{ color: "black", fontSize: 30, fontWeight: "bold" }}
            className="text-black text-4xl font-bold"
          >
            to
          </TextComponent>
          <TextComponent
            // style={{ color: "#8258F6", fontSize: 30, fontWeight: "bold" }}
            className="text-[#8258F6] text-4xl font-bold !important"
          >
            Xpertly
          </TextComponent>
        </View>
      </View>
      <View className="items-center">
        <TextInputComponent
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
          className="w-[90%] bg-[#F2F2F2] text-black border-black placeholder-gray-500"
          theme={{
            colors: {
              primary: "black",
              onSurfaceVariant: "black",
              background: "#F2F2F2",
              placeholder: "gray",
              surfaceDisabled: "#F2F2F2",
              onSurfaceDisabled: "black",
              outline: "black",
            },
          }}
          selectionColor="green"
          textColor="black"
          borderColor="transparent"
        ></TextInputComponent>
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
            className="text-black"
          >
            Login as
          </TextComponent>
          <Menu
            visible={visible}
            // style={{ backgroundColor: "#F2F2F2" }}
            // className="bg-[#F2F2F2]"
            contentStyle={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
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
                className="bg-[#f8f9fa] w-auto min-w-[120px] border border-black rounded-[10px]"
                labelStyle={{ color: "black" }}
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
              titleStyle={{ color: "black" }}
              // style={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
              className="bg-[#F2F2F2] rounded-md"
            />
            <MenuItem
              onPress={() => {
                changeHandler({ type: "role", value: "Expert" });
                setVisible(false);
              }}
              title="Expert"
              titleStyle={{ color: "black" }}
              // style={{ backgroundColor: "#F2F2F2", borderRadius: 5 }}
              className="bg-[#F2F2F2] rounded-md"
            />
          </Menu>
        </View>
        <ButtonComponent
          mode="contained-tonal"
          // style={{
          //   width: "60%",
          //   borderColor: "black",
          //   borderRadius: 30,
          //   paddingHorizontal: 20,
          //   marginTop: 10,
          //   backgroundColor: allValid ? "#FF8C00" : "grey",
          // }}
          className={`w-[60%] border rounded-[30px] px-5 mt-2 ${
            allValid ? "bg-[#FF8C00]" : "bg-gray-500"
          }`}
          labelStyle={{ color: "white" }}
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
