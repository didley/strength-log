import { SafeAreaView, StyleSheet } from "react-native";

import { ScrollView, Text, View } from "../../../components/Themed";
import { exerciseSelectors } from "../../../features/exercises/exercise.slice";
import { WorkoutExercise as WorkoutExerciseType } from "../../../features/workoutExercises/workoutExercise.slice";
import { useAppSelector } from "../../../store";

type Props = { exercise: WorkoutExerciseType };

export const WorkoutExercise = ({ exercise }: Props) => {
  const exerciseDetails = useAppSelector((state) =>
    exerciseSelectors.selectById(state, exercise.exerciseId)
  );
  return (
    <View style={styles.exercise}>
      <Text>{exerciseDetails?.name}</Text>
      <Text>{exerciseDetails?.primaryMuscle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  exercise: {
    backgroundColor: "white",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
});
