import { SafeAreaView, StyleSheet } from "react-native";

import {
  Button,
  Pressable,
  ScrollView,
  Text,
  View,
} from "../../components/Themed";
import {
  workoutActions,
  workoutSelectors,
} from "../../features/workouts/workout.slice";
import { WorkoutsScreenProps } from "../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../store";

export const WorkoutsScreen = ({
  navigation,
}: WorkoutsScreenProps<"WorkoutsScreen">) => {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(workoutSelectors.selectAll);

  const handleCreateWorkout = () => {
    const { payload } = dispatch(
      workoutActions.create({ name: "", workoutExerciseIds: [] })
    );
    navigation.navigate("WorkoutScreen", { id: payload.id });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Button text="Create" onPress={handleCreateWorkout} />

          {workouts.map((workout) => (
            <Pressable
              key={workout.id}
              style={styles.workout}
              onPress={() =>
                navigation.navigate("WorkoutScreen", { id: workout.id })
              }
            >
              <Text>{workout.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  workout: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
});
