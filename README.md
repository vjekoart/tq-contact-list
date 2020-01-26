# TQ Contact List

Angular web application for contact management.

*Libraries & Languages: Angular, Karma, Protractor, TypeScript, SCSS*

*Environment: Node 10.16.2, Angular CLI 8.3.23, Angular 8.2.14*

*This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.*

## Usage

During usage mock data is used, which is defined in the `src/assets/mock-data.json` file. Keep in mind that data is saved in localStorage. To reset state to initial mock data status, run `localStorage.clear()` in browser console and refresh the page.

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

## Functionality

### Form Validations

* Field for full name must not be empty.
* Field for email can be empty, and if not it should look like an email address (regex).
* Field for phone number may only contain numbers and character `+`.
* Field for phone name must not be empty.

## Roadmap

1. Details page
    * ContactFormComponent
        * TextFieldComponent
        * NumberFieldComponent
        * Reuse existing ContactImage
        * FormButtonComponent
          * FieldLabelComponent
          * InputFieldComponent (resue in home/favorites search)
2. Create page with form validation
3. Edit page with form validation
4. Delete functionality (DeleteDialogComponent, DeleteDialogService)

---

*This project is licensed under the terms of the MIT license.*
