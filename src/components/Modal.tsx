import { ComponentProps } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "./Themed";

type Props = {
  modalProps: ComponentProps<typeof Modal>;
  onClose: () => void;
};

export const CreateWorkoutModal = ({ modalProps, onClose }: Props) => {
  return (
    <Modal onDismiss={onClose} onRequestClose={onClose} {...modalProps}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.modalView}>
          <Text>Create a workout</Text>
          <TextInput style={styles.input} autoFocus />
          <Button title="Close" onPress={onClose} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(50,50,50,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    alignSelf: "stretch",
    padding: 10,
    backgroundColor: "white",
  },
});
