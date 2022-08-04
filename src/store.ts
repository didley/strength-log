import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { exerciseSlice } from "./features/exercises/exercise.slice";
import { workoutExerciseSlice } from "./features/workoutExercises/workoutExercise.slice";
import { workoutSlice } from "./features/workouts/workout.slice";

export const store = configureStore({
  reducer: {
    [workoutSlice.name]: workoutSlice.reducer,
    [workoutExerciseSlice.name]: workoutExerciseSlice.reducer,
    [exerciseSlice.name]: exerciseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
