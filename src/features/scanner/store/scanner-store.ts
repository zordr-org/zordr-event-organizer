export type ScannerState = {
  isScanning: boolean;
  lastCode: string | null;
  message: string | null;
};

const initialState: ScannerState = {
  isScanning: false,
  lastCode: null,
  message: null,
};

let state: ScannerState = { ...initialState };

const listeners = new Set<() => void>();

export const scannerStore = {
  getState(): ScannerState {
    return state;
  },

  setState(update: Partial<ScannerState>) {
    state = {
      ...state,
      ...update,
    };

    listeners.forEach((listener) => listener());
  },

  reset() {
    state = { ...initialState };
    listeners.forEach((listener) => listener());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};