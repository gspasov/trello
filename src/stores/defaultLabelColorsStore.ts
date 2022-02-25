import { readable } from "svelte/store";
import { defaultLabels } from "../models/label";

export const DefaultLabelColorsStore = readable(defaultLabels());
