# conjure

HTML-first, low-friction library to add interactivity to a web page.

![Kapture 2023-12-25 at 23 14 32](https://github.com/adamghill/conjure/assets/317045/eb8e3474-e5a0-47f4-99bd-002353ac18ca)

## Installation

No build step needed. Just download `conjure.min.js` from the `dist` folder above and reference it in your HTML.

```html
<script src="conjure.min.js"></script>
```

## Size

- 1.78 kB
- 856 B minified
- 758 B brotli compressed

## Features

### Actions

#### Click

Sets a variable to a specific value when the element is clicked.

```html
<!-- When this span is clicked a value of `1` is stored in `example` -->
<span :click="example = 1">Click</span>
```

By default, the assignment can be any type that can be understood by `JSON.parse`, i.e. ints, strings, arrays, etc.

It can also refer to a variable stored by `conjure`.

```html
<!-- When this span is clicked a value of `1` is stored in `example` -->
<span :click="example = 1">Click</span>

<!-- When this span is clicked after the above is clicked, a value of `1` is stored in `newExample` -->
<span :click="newExample = example">Click</span>
```

If strict CSP is not required, the `CONJURE_USE_EVAL` setting can be set to `true` and the right-hand side can be simple JavaScript statements, e.g. `example = 1 + 2` would be evaluated to `3` and then stored in the `example` variable.

### Value

Binds the value of the element to the specified variable.

```html
<!-- When `example` is updated the value in this input will change -->
<input type="text" :value="example"></input>
```

### Class

Sets the element's class based on a variable.

```html
<!-- When `example` is equal to `1` "red" will be added to the classes, otherwise "blue" will be added to the classes -->
<span :class="example == 1 ? 'red' : 'blue'">Example</span>
```

## Variable access

Variables are stored in `window.conjure` if you need access to them.

## Settings

### CONJURE_USE_EVAL

By default, `conjure` is usable with strict CSP, however that does prevent using JavaScript in certain places, e.g. the right-hand side of an action. Setting `CONJURE_USE_EVAL` to `true` allows more flexibility.

```html
<script src="conjure.min.js"></script>
<script>
    CONJURE_USE_EVAL = true;
</script>
```

This would allow something like this to be done.

```html
<!-- When this span is clicked a value of `3` is stored in `example` -->
<span :click="example = 1 + 2">Click</span>
```

## Developing

### See examples

1. `python3 -m http.server 8000`
2. Go to http://localhost:8000/example.html in a browser

### Run tests

TBD

### Build

`npm run b`

## Additional reading

The code is well documented and hopefully relatively clear. Most of the magic is achieved with [proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [XPath queries](https://denizaksimsek.com/2023/xpath/). [Indirect eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#using_indirect_eval) is used when `CONJURE_USE_EVAL=true`.

## Colophon

- [Rollup](https://rollupjs.org)

## Inspiration

[Original Twitter post](https://x.com/tonyennis/status/1687390226962935809) and my [initial reaction](https://indieweb.social/@adamghill/111636307364680836).
