# TQ Contact List

Angular web application for contact management.

*Libraries & Languages: Angular, Karma, Protractor, TypeScript, SCSS*

*Environment: Node 10.16.2, Angular CLI 8.3.23, Angular 8.2.14*

*This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.*

## Usage

When running for the first time, mock data will be saved to the browsers local storage. Mock data are defined in the `src/assets/mock-data.json` file.

For development purposes following functions are exposed in the browser console:

1. Function `tq.resetData()`; reset mock data to the initial state and reload the page.
2. Function `tq.setDelay(maxDelayMs?)`; add a random delay in ms no longer than `maxDelayMs` when performing API actions. Call this function without any parameters to disable delay.

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

### Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-end Tests (user simulation)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

User actions defined in the *User Actions* section will be performed.

### Production Usage

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Functionality

### Modifications

1. Snackbar: UI component which should notify the user when action is completed.
2. Transition of UI elements, e.g. in hover, active and similar states.
3. Clear button in search field: UI element visible when search input field has more than zero characters.
4. Loading indicator: UI element visible when an application is waiting for network response.

### Form Validations

* Field for full name must not be empty.
* Field for email can be empty, and if not it should look like an email address (regex).
* Field for phone number may only contain numbers and character `+`.
* Field for phone name must not be empty.

### User Actions

This section contains a list of actions performed during E2E tests. The idea is to cover application features by executing actions which simulate user behaviour.

Actions rely on mock data defined in the `src/assets/mock-data.json` file.

1. Open application in the browser and a list of all contacts (11 items) should display.
2. Click on the `My favorites` button and a list of favorite contacts (5 items) should display.
3. Click on the *add to favorites* button for `Oscar Arnold` and contact should disappear from the list and notification should display.
4. Click on the `All contacts` button and a list of all contacts (11 items) should display, where contact `Oscar Arnold` is not marked as a favorite.
5. Click on the *delete* button for `Oscar Arnold` and delete dialog should display. Click on `Cancel` button and dialog should disappear.
6. Click on the *delete* button for `Catherine Moore` and delete dialog should display. Click `Delete` button and dialog should disappear, contact list should not contain `Catherine Moore` and notification should display.
7. Click on the contact `Addie Hernandez` and details page should open, where name, email, numbers and button states should reflect status of the contact.
8. Click on the *add to favorites* button inside the details page and state of the button should change.
9. Click on the *back* button and a list of all contacts (10 items) should display, where `Addie Hernandez` is marked as a favorite contact.
10. Enter character `e` in the search field and list should not change.
11. Enter additional character `r` in the search field and list should contain search results for string `er` (6 items).
12. Hover over the contact `Ann Schneider` and click on the *edit* button. Edit page should open, where name, email and numbers should reflect status of the contact.
13. Change content of the name input field to `Ann Arnold` and click on the `Cancel` button. Page with search results (11.) should open and contact with name `Ann Schneider` should be present.
14. Click on the *clear* button in search input field and a list of all contacts (10 items) should display.
15. Click on the contact `Rose Bush` and details page should open, where name, email, numbers and button states should reflect status of the contact.
16. Click on the *edit* button and edit page should open, where name, email and numbers should reflect status of the contact.
17. Remove `Home` number by clicking on the *remove* button and the number should be removed from the `numbers` section.
18. Click on `Add number` and new, empty number should display (phone and name fields). Set new number to `+385 91 123 456` and name of the number to `New home`.
19. Remove all text from the `full name` field. Click on the `Save` button and notification with error message should display, and `full name` input field should get red border.
20. Enter `Rose Bush` to the `full name` field and click on the `Save` button. Notification should appear and previous (details) page should open.
21. Click on the *back* button and a list of all contacts (10 items) should display.
22. Click on the *Add new* button and create page should open, where all fields are present.
23. Fill `email` field with `john.doe@example.com` and add a number where phone is `+385 95 999 888` and name is `Home`. Click on the `Save` button and notification with error message should display, and `full name` input field should get red border.
24. Fill `full name` field with `John Doe` and click on the `Save` button. Notification should appear and previous (home) page should open with the list of all contacts (11 items), where card with name `John Doe` is present.

## Roadmap

1. Planning
  * Project structure
2. Setup of Angular application
  * Router & views: home (with option to display list of favorite contacts), create, edit and details page
  * Services: DataService, MockApiService
  * Base (index.html, root styles and fonts)
3. List of all and favorite contacts on home page
4. Search functionality on home page (by full name)
5. Loading indicator (LoadingIndicatorComponent)
6. Details page
7. Create page with form validation
8. Edit page with form validation
9. Favorite functionality (home and details page)
10. Delete functionality (DeleteDialogComponent, DeleteDialogService)
11. Snackbar notifications (SnackbarComponent, SnackbarService)
12. E2E tests (experimental)
  * Implement helper methods
  * Implement user actions

### Guidelines

* Components
  * Component selector should have prefix `tq-`
  * Component should have smoke and basic unit test
  * Component should be responsive
* Services
  * Each method should have unit tests
  * Each method should be documented

---

*This project is licensed under the terms of the MIT license.*
