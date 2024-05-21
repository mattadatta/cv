import { useCallback } from "react";
import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'
import { produce, enableMapSet } from 'immer'

import cvJson from './cv.json' assert { type: 'json' }
import { CvDocument } from "./schema/cv";
const cv = cvJson as CvDocument

enableMapSet()

export interface AppState {
  cv: CvDocument
}

export const useAppState = create<AppState>()((set, get) => ({
  cv
}))

export function useCv() {
  return useAppState().cv
}

export type ThemeType = 'dark' | 'light'

export interface ThemeState {
  getTheme: () => ThemeType
  toggleTheme: () => void
}

interface ThemeStateImpl extends ThemeState {
  desiredTheme: ThemeType | null
}

export const useTheme = create<ThemeState>()((set, get) => ({
  desiredTheme: null,
  getTheme: () => {
    return (get() as ThemeStateImpl).desiredTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  },
  toggleTheme: () => set(produce((state: ThemeStateImpl) => {
    state.desiredTheme = (state.getTheme() === 'dark') ? 'light' : 'dark'
  }))
}))

export interface CondensedState {
  isExpanded: boolean
  toggleExpanded: () => void
}

export const useExapnded = create<CondensedState>()((set, get) => ({
  isExpanded: false,
  toggleExpanded: () => set(produce((state: CondensedState) => {
    state.isExpanded = !state.isExpanded
  }))
}))
