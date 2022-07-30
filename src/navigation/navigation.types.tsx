/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Workouts: undefined;
  Exercises: undefined;
  Settings: undefined;
};
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type WorkoutsParamList = {
  WorkoutsScreen: undefined;
  WorkoutScreen: { id: string };
};
export type WorkoutsScreenProps<Screen extends keyof WorkoutsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<WorkoutsParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type ExercisesParamList = {
  ExercisesScreen: undefined;
};
export type ExercisesScreenProps<Screen extends keyof ExercisesParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ExercisesParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type SettingsParamList = {
  SettingsScreen: undefined;
};
export type SettingsScreenProps<Screen extends keyof SettingsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SettingsParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
