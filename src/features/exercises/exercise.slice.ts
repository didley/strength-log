import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";

type Muscle =
  | "Abductors"
  | "Abs"
  | "Adductors"
  | "Biceps"
  | "Calves"
  | "Chest"
  | "Core"
  | "Forearms"
  | "Glutes"
  | "Hamstrings"
  | "Lats"
  | "Lower Back"
  | "Middle Back"
  | "Neck"
  | "Quads"
  | "Shoulder"
  | "Traps"
  | "Triceps";

type Equipment =
  | "Bag"
  | "Ball"
  | "Bands"
  | "Barbell"
  | "Body"
  | "Cable"
  | "Dumbbell"
  | "EZ Bar"
  | "Kettlebell"
  | "Landmine"
  | "Machine"
  | "Other"
  | "Rope"
  | "TRX";

type Exercise = {
  id: string;
  name: string;
  primaryMuscle: Muscle;
  secondaryMuscles: Muscle[];
  equipment: Equipment;
  details?: string;
};

const initialState: { [id: string]: Exercise } = {
  i2oh3h3i2gf0: {
    name: "Bench Press",
    id: "i2oh3h3i2gf0",
    primaryMuscle: "Chest",
    secondaryMuscles: [],
    equipment: "Barbell",
  },
  y5goh3h362hf0: {
    name: "Deadlift",
    id: "y5goh3h362hf0",
    primaryMuscle: "Hamstrings",
    secondaryMuscles: ["Calves", "Quads", "Traps"],
    equipment: "Barbell",
  },
};

const exerciseAdaptor = createEntityAdapter<Exercise>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = exerciseAdaptor.getInitialState();
const initialisedState = exerciseAdaptor.upsertMany(
  preInitialisedState,
  initialState
);

export const exerciseSlice = createSlice({
  name: "Exercise",
  initialState: initialisedState,
  reducers: {
    create: {
      prepare: (payload: Omit<Exercise, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: exerciseAdaptor.addOne,
    },
    update: exerciseAdaptor.updateOne,
    delete: exerciseAdaptor.removeOne,
  },
});
type ExerciseSlice = {
  [exerciseSlice.name]: ReturnType<typeof exerciseSlice["reducer"]>;
};

export const exerciseActions = exerciseSlice.actions;

export const exerciseSelectors = exerciseAdaptor.getSelectors<ExerciseSlice>(
  (state) => state[exerciseSlice.name]
);
