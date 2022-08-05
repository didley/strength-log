import { SafeAreaView, StyleSheet } from "react-native";

import { ScrollView, TextInput, View } from "../../../components/Themed";
import { workoutExerciseSelectors } from "../../../features/workoutExercises/workoutExercise.slice";
import {
  workoutActions,
  workoutSelectors,
} from "../../../features/workouts/workout.slice";
import { WorkoutsScreenProps } from "../../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../../store";
import { WorkoutExercise } from "./WorkoutExercise";

export const WorkoutScreen = ({
  navigation,
  route,
}: WorkoutsScreenProps<"WorkoutScreen">) => {
  const { params } = route;
  const dispatch = useAppDispatch();
  const workout = useAppSelector((state) =>
    workoutSelectors.selectById(state, params.id)
  );
  const exercises = useAppSelector(workoutExerciseSelectors.selectAll);
  if (!workout) return null;

  const handleNameChange = (text: string) => {
    dispatch(
      workoutActions.update({ id: workout.id, changes: { name: text } })
    );
  };

  return workout ? (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="Workout Name"
            onChangeText={handleNameChange}
            style={styles.title}
          >
            {workout.name}
          </TextInput>
          {exercises.length &&
            exercises.map((exercise) => (
              <WorkoutExercise key={exercise.id} workoutExercise={exercise} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
