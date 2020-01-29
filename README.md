# TQ Contact List

Angular web application for contact management.

*Libraries & Languages: Angular, Karma, Protractor, SCSS, TypeScript*

*Environment: Node 10.16.2, Angular CLI 8.3.23, Angular 8.2.14*

1. Usage
2. Architecture

## Usage

This application has mock data, which is defined in the `src/assets/mock-data.json` file. During the usage, data is stored in the *localStorage*. To reset to initial state, run `localStorage.clear()` in browser console and refresh the page.

### Development Usage

```
# Make sure that tq-contact-list is the active directory
cd tq-contact-list

# If required, install NPM dependencies
npm install

# Run application on default port (4200)
ng serve

# Run application on different port
ng serve --port 4300

# Navigate to http://localhost:4200 in browser to use the application
```

### Production Usage

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Architecture

The goal of this application is to implement architecture with unidirectional data flow.

* Components
    * Listen to observables from *StoreService*, and trigger actions via *ActionService*.
    * Components are organized into views and shared components.
* *ActionService*
    * Handle actions, call *StoreService* and other services.
* *StoreService*
    * Store and expose application data via observable properties.

---

*This project is licensed under the terms of the MIT license.*
