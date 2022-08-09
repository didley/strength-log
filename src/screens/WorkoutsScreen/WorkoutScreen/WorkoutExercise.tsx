import { StyleSheet } from "react-native";

import { Text, View } from "../../../components/Themed";
import { exerciseSelectors } from "../../../features/exercises/exercise.slice";
import { WorkoutExercise as WorkoutExerciseType } from "../../../features/workoutExercises/workoutExercise.slice";
import { useAppSelector } from "../../../store";

type Props = { workoutExercise: WorkoutExerciseType };

export const WorkoutExercise = ({ workoutExercise }: Props) => {
  const exerciseDetails = useAppSelector((state) =>
    exerciseSelectors.selectById(state, workoutExercise.exerciseId)
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        {exerciseDetails?.name}
      </Text>
      <Text style={{ color: "gray" }}>
        {exerciseDetails?.primaryMuscle}
        {exerciseDetails?.secondaryMuscles.map((el) => ", " + el)}
      </Text>
      <View style={styles.setsContainer} themeColor="off">
        <View style={styles.set}>
          <View />
          <Text themeColor="tint" style={styles.setHeader}>
            kg
          </Text>
          <Text themeColor="tint" style={styles.setHeader}>
            Reps
          </Text>
        </View>
        {workoutExercise.sets.map((set, i) => (
          <View key={i} style={styles.set} themeColor="off">
            <Text> {i + 1} </Text>
            <Text>{set.weightKg} </Text>
            <Text> {set.repetitions} </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  setsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  set: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  setHeader: {
    fontWeight: "bold",
  },
});
