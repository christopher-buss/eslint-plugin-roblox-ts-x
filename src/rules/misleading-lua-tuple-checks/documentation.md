# Disallow the use of LuaTuple in conditional expressions

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->
<!-- Do not manually modify this header. Run: `npm run eslint-docs` -->

## Rule details

In Luau, functions can return multiple values, represented in roblox-ts by the
`LuaTuple<T>` type. When a `LuaTuple` is used directly in a conditional
expression (like `if`, `while`, ternary operators, logical operators), it always
evaluates to `true` regardless of the values it contains. This is because tables
(which `LuaTuple` transpiles to) are always truthy in Luau.

This rule prevents this potentially misleading behavior by requiring you to
explicitly access the first element of the tuple (e.g., `myTuple[0]`) when using
it in a conditional context. This ensures the condition evaluates based on the
actual boolean value intended.

This rule also enforces the use of destructuring for `LuaTuple` types, as it
provides a clearer and more explicit way to access the values contained within
the tuple. Destructuring allows you to assign the values of the tuple to
individual variables, making your code more readable and maintainable.

This rule is autofixable.

## Examples

### Incorrect

```js
declare const myTuple: LuaTuple<[boolean, number]>;

if (myTuple) { // ❌ Always true in Luau, regardless of the boolean value
  // ...
}

const result = myTuple ? "Truthy" : "Falsy"; // ❌ Ternary condition is always true

while (!myTuple) { // ❌ Condition is always false
  // ...
}

if (someCondition && myTuple) { // ❌ Second part of the condition is always true
  // ...
}

const player = game.GetService("Players").PlayerAdded.Wait(); // ❌ This is not a player
```

### Correct

```js
declare const [bool, num]: LuaTuple<[boolean, number]>;

if (myTuple[0]) { // ✅ Evaluates the boolean value correctly
  // ...
}

const result = myTuple[0] ? "Truthy" : "Falsy"; // ✅ Correctly uses the first element

while (!myTuple[0]) { // ✅ Correctly negates the first element
  // ...
}

if (someCondition && myTuple[0]) { // ✅ Correctly uses the first element in the logical expression
  // ...
}

const [isValid, value] = myTuple; // ✅ Destructuring is fine
```

## Further Reading

- [roblox-ts: LuaTuple](https://roblox-ts.com/docs/guides/lua-tuple)
