import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { workoutSelectors } from "../../features/workouts/workout.slice";
import { RootTabScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";

export const WorkoutsTab = ({
  navigation,
}: RootTabScreenProps<"WorkoutsTab">) => {
  const workouts = useAppSelector(workoutSelectors.selectAll);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      {workouts.map((workout) => (
        <View key={workout.id}>
          <Text>{workout.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
