import { StateCreator } from "zustand";
import { MeasurementEntry, MeasurementType } from "@calai/shared";
import api from "../../api/axios-instance";

export interface MeasurementsSlice {
  measurements: MeasurementEntry[];
  measurementsLoading: boolean;
  measurementsError: string | null;
  fetchMeasurements: () => Promise<void>;
  addMeasurement: (input: {
    type: MeasurementType;
    value: number;
    unit?: string;
    timestamp?: string;
  }) => Promise<void>;
  deleteMeasurement: (id: string) => Promise<void>;
}

export const createMeasurementsSlice: StateCreator<MeasurementsSlice> = (
  set,
  get,
) => ({
  measurements: [],
  measurementsLoading: false,
  measurementsError: null,

  fetchMeasurements: async () => {
    set({ measurementsLoading: true, measurementsError: null });
    try {
      const response = await api.get("/measurements");
      set({ measurements: response.data || [] });
    } catch (error) {
      set({ measurementsError: "Failed to fetch measurements" });
    } finally {
      set({ measurementsLoading: false });
    }
  },

  addMeasurement: async (input) => {
    set({ measurementsLoading: true, measurementsError: null });
    try {
      const response = await api.post("/measurements", input);
      if (response.data) {
        set((state) => ({
          measurements: [response.data, ...state.measurements],
        }));
      }
    } catch (error) {
      set({ measurementsError: "Failed to add measurement" });
    } finally {
      set({ measurementsLoading: false });
    }
  },

  deleteMeasurement: async (id: string) => {
    set({ measurementsLoading: true, measurementsError: null });
    try {
      await api.delete(`/measurements/${id}`);
      set((state) => ({
        measurements: state.measurements.filter((entry) => entry.id !== id),
      }));
    } catch (error) {
      set({ measurementsError: "Failed to delete measurement" });
    } finally {
      set({ measurementsLoading: false });
    }
  },
});
