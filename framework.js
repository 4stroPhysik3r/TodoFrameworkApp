// DOM manipulation
// Function to create a DOM element with optional attributes and children
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // Append children
  children.forEach(child => {
    element.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  });


  return element;
}

// Function to append a child element to a parent element
function appendChild(parent, child) {
  parent.appendChild(child);
}

// Function to remove a child element from its parent
function removeChild(parent, child) {
  parent.removeChild(child);
}

// Function to replace a child element with a new element
function replaceChild(parent, newChild, oldChild) {
  parent.replaceChild(newChild, oldChild);
}


// EVENT HANDLING
// Function to handle key press events
function onEnterKeyPress(element, callback) {
  element.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      callback();
    }
  });
}

// Function to handle click events
function onClick(element, callback) {
  element.addEventListener("click", callback);
}


// STATE MANAGEMENT
function setState(newState) {
  localStorage.setItem("state", newState);
}

function loadState() {
  return localStorage.getItem("state") || "all";
}

// ROUTING MANAGEMENT
class Router {
  constructor() {
    this.routes = {};
    this.init();
  }

  // Method to initialize the router
  init() {
    window.addEventListener("hashchange", () => this.handleHashChange());
    window.addEventListener("load", () => this.handleHashChange()); // Handle the route on page load as well
  }

  // Method to add new route
  addRoute(hash, action) {
    this.routes[hash] = action;
  }

  // Method to handle hash changes
  handleHashChange() {
    const hash = window.location.hash || "#";
    const action = this.routes[hash];

    if (action) {
      action();
    }
  }
}
