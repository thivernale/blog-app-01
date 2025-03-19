import { useReducer } from 'react';

export function NameListReducer() {
  const [state, dispatch] = useReducer(
    (
      prevState: { names: string[]; name: string },
      action: { type: string; payload?: string },
    ) => {
      console.log(action);
      switch (action.type) {
        case 'SET_NAME':
          return { ...prevState, name: action.payload as string };
        case 'ADD_NAME':
          return {
            ...prevState,
            names: [...prevState.names, prevState.name],
            name: '',
          };
        default:
          return prevState;
      }
    },
    {
      name: '',
      names: [],
    },
  );
  return (
    <div>
      <ul>
        {state.names.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
      <input
        type="text"
        value={state.name}
        onChange={(event) => {
          dispatch({
            type: 'SET_NAME',
            payload: event.target.value,
          });
        }}
      />
      <button
        onClick={() => {
          if (!state.name) return;
          dispatch({
            type: 'ADD_NAME',
          });
        }}
      >
        Add name to list
      </button>
    </div>
  );
}
