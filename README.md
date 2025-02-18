<p align="center">
  <img src="https://raw.githubusercontent.com/ron-dadon/bonez/refs/heads/master/docs/logo.png" alt="Bonez Logo" height="200" />
</p>
<p align="center">
    The backbone of React state
</p>

----

### What is Bonez?

Bonez is a state library for React that takes the state out from React for easier state management.

Each unit of state is called `bone`, and all the `bone`s build the entire state skeleton of the application.

A unit of state can be as simple as a `boolean`, `number` or a `string`, but it can also be a complex data structure such as an `array`, `object` or a `function`.

### How Bonez differs from `useState`?

While `useState` is a React hook, a `bone` is a simple JS object with some methods and internal values.

A `bone` exposes 4 methods:

1. `getValue` - this method returns the current `bone` value.
2. `setValue` - this method sets a new value of the `bone`. If the value is the same as the current value (same value for `boolean`, `number`, `string`, same reference for `array`, `object` or `function`), by default, nothing changes. This can be controlled by passing `compare` function to decide when a value is the same as the previous value.
3. `watch` - this adds a watcher for the `bone` value, every time the `bone` value is changed via the `setValue` method, all watchers are triggered with the new value. For easy unwatch, every call to `watch` returns an `unwatch` value to remove the specific watcher that was just added. To keep things performant and clean, watchers callbacks are indexed by their function reference, so adding the same function again as a watcher will actually not add another watcher.
4. `unwatch` - this removes the provided watcher callback from the watchers list. Does nothing if the provided watcher function does not exist on the list.

### So how it works with React?

By the use of hooks.

When you pass a `bone` to `useBone` / `useBoneValue` / `useDerivedBoneValue` - you are making the `bone` and your React component "connected".  Every change to that `bone` will trigger a render for all the components that have one of those hooks.

The `useBoneSet` hook WILL NOT trigger a re-render of the component alone, unless the component also has one of the other `useBone*` hooks. This is good for performance, since if your component only need to trigger a change to a value, but it is not dependent on it, it will not rerender.

Note: Under the hood, all `useBone*` hooks are based on `useState` to trigger component renders.



