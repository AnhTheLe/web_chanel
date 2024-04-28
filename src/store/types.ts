import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useDispatchUntyped, useSelector as useSelectorUntyped } from 'react-redux';
import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk as createAsyncThunkUntyped
} from '@reduxjs/toolkit';

import { AppDispatch, AppState } from './store';

type DefaultThunkApiConfig = { dispatch: AppDispatch; state: AppState };
export const createAsyncThunk = <
  Returned,
  ThunkArg = void,
  ThunkApiConfig extends { [key: string]: any } = DefaultThunkApiConfig
>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> =>
  createAsyncThunkUntyped<Returned, ThunkArg, ThunkApiConfig>(typePrefix, payloadCreator, options);

export const useDispatch: () => AppDispatch = useDispatchUntyped;
export const useSelector: TypedUseSelectorHook<AppState> = useSelectorUntyped;
