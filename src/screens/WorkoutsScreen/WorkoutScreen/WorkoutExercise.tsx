import { Text, View } from "../../../components/Themed";
import { exerciseSelectors } from "../../../features/exercises/exercise.slice";
import { WorkoutExercise as WorkoutExerciseType } from "../../../features/workoutExercises/workoutExercise.slice";
import { useAppSelector } from "../../../store";

type Props = { exercise: WorkoutExerciseType };

export const WorkoutExercise = ({ exercise }: Props) => {
  const exerciseDetails = useAppSelector((state) =>
    exerciseSelectors.selectById(state, exercise.exerciseId)
  );
  return (
    <View>
      <Text>{exerciseDetails?.name}</Text>
      <Text>{exerciseDetails?.primaryMuscle}</Text>
    </View>
  );
};
