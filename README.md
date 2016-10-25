# pointer-css-variables

Use the current position of pointing devices as global CSS variables

## What?

Inspired by the [article by Jase Smith](http://codepen.io/jasesmith/post/css-variables-as-data-feedback-too), this module allows you to maintain a set of global CSS variables which always contain the current location of your pointer devices (mouse & touch).

Here's a [quick demo](http://requirebin.com/?gist=5551402d0fe09d951453174732af723c).

## How?

`npm install pointer-css-variables`

```js
require('pointer-css-variables')();
```

Now you'll have a bunch of variables on your root node whenever your pointer is active in the viewport.

When moving the mouse or a single finger, you'll get the abstracted variables:

```css
--pointer-client-x
--pointerclient-y
--pointer-page-x
--pointer-page-y
--pointer-screen-x
--pointer-screen-y
```

With the mouse you also get:

```css
--mouse-client-x
--mouse-client-y
--mouse-page-x
--mouse-page-y
--mouse-screen-x
--mouse-screen-y
```

With touch devices you also get (for the first touch):

```css
--touch-client-x
--touch-client-y
--touch-page-x
--touch-page-y
--touch-screen-x
--touch-screen-y
```

...as well as up to five specific touch points:

```css
--touches-0-client-x
--touches-1-client-x
--touches-2-client-x
--touches-3-client-x
--touches-4-client-x
... (etc.)
```

### Why?

Why not. Let your imagination run wild.
