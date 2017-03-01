import { Action } from '@ngrx/store';
/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}

/**
 * This function builds a state reducer to replace the typical switch/case pattern,
 * given an initial state and a list of classes with static type and reduce function.
 * @param initial The initial state for this reducer, called by store to initialize the state
 * @param actionClasses a list of classes (type names) implementing the required static reducer interface.
 */
export function buildReducer<T>(initial: T, ...actionClasses: { type: string, reduce: (state: T, action: Action) => T }[]) {
    let handlers: {
        [key: string]: (state: T, action: Action) => T
    } = {};
    actionClasses.forEach((ac) => {
        handlers[ac.type] = ac.reduce;
    });
    return (state: T = initial, action: Action) => handlers[action.type] ? handlers[action.type](state, action) : state;
}