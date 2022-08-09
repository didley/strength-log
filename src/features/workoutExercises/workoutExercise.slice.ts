import {
  createEntityAdapter,
  createSlice,
  EntityId,
  nanoid,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";

export type Set = {
  weightKg: number;
  repetitions: number;
  status: "pending" | "success" | "fail";
};

export type WorkoutExercise = {
  id: string;
  exerciseId: string;
  workoutId: string;
  sets: Set[];
  notes?: string;
};

const initialState: { [id: string]: WorkoutExercise } = {
  did93jd9sh39dh3hr: {
    id: "did93jd9sh39dh3hr",
    exerciseId: "y5goh3h362hf0",
    workoutId: "dj49849j32",
    sets: [
      { weightKg: 30, repetitions: 5, status: "pending" },
      { weightKg: 30, repetitions: 5, status: "pending" },
      { weightKg: 30, repetitions: 5, status: "pending" },
    ],
  },
  t93fj5do6s4i6sph3hr: {
    id: "t93fj5do6s4i6sph3hr",
    exerciseId: "y5goh3h362hf0",
    workoutId: "dj49849j32",
    sets: [
      { weightKg: 30, repetitions: 5, status: "pending" },
      { weightKg: 30, repetitions: 5, status: "pending" },
      { weightKg: 30, repetitions: 5, status: "pending" },
    ],
  },
};

const workoutExerciseAdaptor = createEntityAdapter<WorkoutExercise>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = workoutExerciseAdaptor.getInitialState();
const initialisedState = workoutExerciseAdaptor.upsertMany(
  preInitialisedState,
  initialState
);

export const workoutExerciseSlice = createSlice({
  name: "workoutExercises",
  initialState: initialisedState,
  reducers: {
    create: {
      prepare: (payload: Omit<WorkoutExercise, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: workoutExerciseAdaptor.addOne,
    },
    update: workoutExerciseAdaptor.updateOne,
    delete: workoutExerciseAdaptor.removeOne,
  },
});
type WorkoutExerciseSlice = {
  [workoutExerciseSlice.name]: ReturnType<
    typeof workoutExerciseSlice["reducer"]
  >;
};

export const workoutExerciseActions = workoutExerciseSlice.actions;

const adaptorSelectors =
  workoutExerciseAdaptor.getSelectors<WorkoutExerciseSlice>(
    (state) => state[workoutExerciseSlice.name]
  );
const selectByIds = (state: RootState, ids: EntityId[]) =>
  ids.map((id) => adaptorSelectors.selectById(state, id));
export const workoutExerciseSelectors = { ...adaptorSelectors, selectByIds };
