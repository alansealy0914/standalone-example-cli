import { Signal, computed } from '@angular/core';
import {
  SignalStoreFeature,
  signalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export type NamedCallState<Prop extends string> = {
  [K in Prop as `${K}CallState`]: CallState;
};

export type NamedCallStateComputed<Prop extends string> = {
  [K in Prop as `${K}Loading`]: Signal<boolean>;
} & {
    [K in Prop as `${K}Loaded`]: Signal<boolean>;
  } & {
    [K in Prop as `${K}Error`]: Signal<string | null>;
  };

function getCallStateKeys(config: { prop: string }) {
  return {
    callStateKey: `${config.prop}CallState`,
    loadingKey: `${config.prop}Loading`,
    loadedKey: `${config.prop}Loaded`,
    errorKey: `${config.prop}Error`,
  };
}

export function withCallState<Prop extends string>(config: {
  prop: Prop;
}): SignalStoreFeature<
  { state: {}, signals: {}, methods: {} },
  {
    state: NamedCallState<Prop>,
    signals: NamedCallStateComputed<Prop>,
    methods: {}
  }
>;
export function withCallState<Prop extends string>(config: {
  prop: Prop;
}): SignalStoreFeature {
  const { callStateKey, errorKey, loadedKey, loadingKey } =
    getCallStateKeys(config);

  return signalStoreFeature(
    withState({ [callStateKey]: 'init' }),
    withComputed((state: Record<string, Signal<unknown>>) => {

      const callState = state[callStateKey] as Signal<CallState>;

      return {
        [loadingKey]: computed(() => callState() === 'loading'),
        [loadedKey]: computed(() => callState() === 'loaded'),
        [errorKey]: computed(() => {
          const v = callState();
          return typeof v === 'object' ? v.error : null;
        })
      }
    })
  );
}

export function setLoading<Prop extends string>(
  prop: Prop
): NamedCallState<Prop> {
  return { [`${prop}CallState`]: 'loading' } as NamedCallState<Prop>;
}

export function setLoaded<Prop extends string>(
  prop: Prop
): NamedCallState<Prop> {
  return { [`${prop}CallState`]: 'loaded' } as NamedCallState<Prop>;
}

export function setError<Prop extends string>(
  prop: Prop,
  error: string
): NamedCallState<Prop> {
  return { [`${prop}CallState`]: { error } } as NamedCallState<Prop>;
}
