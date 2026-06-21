# PhotoGallery

An interactive, fully responsive Photo Gallery application featuring an infinite-scrolling photostream and a robust "Favorites" management system. Built upon modern Angular architecture, the project utilizes standalone reactive components, fine-grained state management via Angular Signals, and RxJS streams for handling asynchronous data flows.

## Features

- **Infinite Photostream**: Dynamically loads images with random IDs via an infinite scroll mechanism, fetching from the `https://picsum.photos` API with a realistic simulated network delay of 200–300ms.
- **Favorites Management**: Users can add photos to their favorites directly from the gallery page and remove them from photo page.
- **State Persistence**: The favorites photos is synchronized with localStorage, preventing data loss upon page refreshes.
- **Modern Angular Features**: Implements **Signals**, **Computed Signals** and **Signal Effects** for reactive state handling and highly optimized change detection.
- **RxJS Reactive Streams**: Leverages RxJs to construct lazy, asynchronous data pipelines that realistically simulate server latency.
- **Responsive Layout**: Clean multi-view interface containing a Photostream Grid, Favorites Dashboard and a Single Photo View.

## Architecture & Technical Stack

- **Framework**: Angular 16.1.8 (Standalone Components, Signals API)
- **State Management**: Reactive State using `signal()`, `computed()`, and `effect()`
- **Routing**: Angular Router for page navigation (`/`, `/favorites`, `/photos/:id`)
- **Styling**: SCSS with CSS Grid and Flexbox integrated with Angular Material components for robust responsiveness
- **Testing**: Automated Unit Testing with Karma, covering reactive component logic, signal state changes, and service methods.
- **Package Manager**: npm

## Getting Started

Follow these steps to run and explore the project locally.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
