import {RootState} from "./mainRedux";

export const getFullySelectedTime = (state: RootState) => new Date(state.signReducer.fullySelectedTime)