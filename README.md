# conjure

HTML-first, low-friction library to add interactivity to a web page.

## Installation

No build step needed. Just include the library in your HTML.

```html
<script src="js/conjure.min.js"></script>
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
<script src="js/conjure.min.js"></script>
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
