import { SafeAreaView, StyleSheet } from "react-native";

import { ScrollView, Text, View } from "../../components/Themed";
import { exerciseSelectors } from "../../features/exercises/exercise.slice";
import { RootTabScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";

export const ExercisesScreen = ({
  navigation,
}: RootTabScreenProps<"Exercises">) => {
  const exercises = useAppSelector(exerciseSelectors.selectAll);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {exercises.map((exercise) => (
            <View
              key={exercise.id}
              style={styles.itemContainer}
              themeColor="off"
            >
              <Text style={styles.itemTitle}>
                {exercise.name}
                {" • "}
                {exercise.equipment}
              </Text>
              <Text style={{ color: "gray" }}>
                {exercise.primaryMuscle}
                {exercise.secondaryMuscles.map((el) => ", " + el)}
              </Text>
            </View>
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
  itemContainer: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  itemTitle: {
    fontWeight: "bold",
  },
});
