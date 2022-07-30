import { SafeAreaView, StyleSheet } from "react-native";

import { ScrollView, TextInput, View } from "../../../components/Themed";
import {
  workoutActions,
  workoutSelectors,
} from "../../../features/workouts/workout.slice";
import { WorkoutsScreenProps } from "../../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../../store";

export const WorkoutScreen = ({
  navigation,
  route,
}: WorkoutsScreenProps<"WorkoutScreen">) => {
  const { params } = route;
  const dispatch = useAppDispatch();
  const workout = useAppSelector((state) =>
    workoutSelectors.selectById(state, params.id)
  );
  if (!workout) return null;

  const handleNameChange = (text: string) => {
    dispatch(
      workoutActions.update({ id: workout.id, changes: { name: text } })
    );
  };

  return workout ? (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Workout Name"
            onChangeText={handleNameChange}
            style={styles.title}
          >
            {workout.name}
          </TextInput>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
