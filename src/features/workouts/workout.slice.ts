import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";

type Workout = {
  id: string;
  name: string;
  workoutExerciseIds: string[];
};

const initialState: { [id: string]: Workout } = {
  dj49849j32: {
    id: "dj49849j32",
    name: "PPL",
    workoutExerciseIds: ["did93jd9sh39dh3hr", "t93fj5do6s4i6sph3hr"],
  },
  dj498dg: { id: "dj4984dg", name: "Full Body", workoutExerciseIds: [] },
};

const workoutAdaptor = createEntityAdapter<Workout>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = workoutAdaptor.getInitialState();
const initialisedState = workoutAdaptor.upsertMany(
  preInitialisedState,
  initialState
);

export const workoutSlice = createSlice({
  name: "workout",
  initialState: initialisedState,
  reducers: {
    create: {
      prepare: (payload: Omit<Workout, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: workoutAdaptor.addOne,
    },
    update: workoutAdaptor.updateOne,
    delete: workoutAdaptor.removeOne,
  },
});
type WorkoutSlice = {
  [workoutSlice.name]: ReturnType<typeof workoutSlice["reducer"]>;
};

export const workoutActions = workoutSlice.actions;

export const workoutSelectors = workoutAdaptor.getSelectors<WorkoutSlice>(
  (state) => state[workoutSlice.name]
);
