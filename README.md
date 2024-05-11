# TodoFrameworkApp

## Usage

Run the app with node:  
```bash
node server.js`
```
OR<br>
Open with VSCode's Live Server Extension or HTML Preview.

## Features

Our Framework is a super lightweight JavaScript framework designed to simplify DOM manipulation, event handling, state management, and routing in web applications. <br>
Here are the main features of the Framework:

1.  DOM Manipulation: Easily create, append, remove, and replace DOM elements using simple functions.
2.  Event Handling: Streamline event handling with functions to handle key presses and clicks.
3.  State Management: Manage application state effortlessly with functions to set and load state from localStorage.
4.  Routing Management: Implement basic routing for single-page applications using hash-based URLs.

## Usage Examples
### Creating an Element

To create a new element, use the createElement function. Pass the tag name of the element as the first argument, and optionally provide attributes and children.

```js
const div = createElement('div', { class: 'container' }, [
  createElement('p', {}, ['Hello, World!'])
]);
```

### Creating an Event

To handle events like key presses or clicks, use the provided event handling functions.

```js
const button = document.getElementById('myButton');
onClick(button, () => {
  console.log('Button clicked!');
});
```

### Nesting Elements

Nest elements by passing them as children to the createElement function.

```js
const container = createElement('div', { class: 'container' }, [
  createElement('h1', {}, ['Welcome']),
  createElement('p', {}, ['This is a paragraph'])
]);
```

### Adding Attributes to an Element

Add attributes to elements by passing them as an object to the createElement function.

```js
const input = createElement('input', { type: 'text', placeholder: 'Enter your name' });
```

## How It Works

The Framework simplifies web development by abstracting common tasks into easy-to-use functions and classes. It leverages the power of vanilla JavaScript to provide a lightweight solution for creating interactive web applications.

DOM manipulation functions like createElement, appendChild, and replaceChild provide a straightforward way to interact with the DOM, while event handling functions like onEnterKeyPress and onClick make it easy to respond to user actions.

State management with setState and loadState enables persistent storage of application state, enhancing user experience. The routing functionality provided by the Router class simplifies navigation in single-page applications, improving overall usability.

By encapsulating these functionalities into a simple framework and providing clear documentation, the Framework empowers developers to build web applications with minimal effort and maximum efficiency.

## Authors
[4stroPhysik3r](https://github.com/4stroPhysik3r)<br>
Freyby<br>
KristjanM