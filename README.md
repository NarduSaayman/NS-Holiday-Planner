# NSHolidayPlanner

The goal of this project is to build an Angular Holiday Planner App, using and implementing best practices and learning content and items listed in the in Requirements & Checklist

# Requirements & Checklist

## Plan of action

- [x] Data Strucutres
- [x] Scribble some layouts
- [ ] Routes / Lazy Loading
- [x] API
- [x] State Management
- [x] Jank Components
- [x] Smart and dumb Components (refactor the jank)
- [ ] Fix Design
- [ ] Check Requirement Spec
- [ ] Then cool things

- [ ] Remember to clean up observables!!!!

## Brief

- I need a way to securely store my plans online so I can access them any time on any device.
- I need to be able to see the currency conversion of my choice [Currency API](https://api.currencyapi.com/v3/latest).
- I need to be able to add new, edit existing, and delete any of my itinerary items and to see a calendar of my entire trip.
- I need to be able to tag itinerary items as either travel or destination events.
- I'd like to be able to install this as an app, but it's not necessary as I plan to buy a SIM card when I get to my destination.

### Info I'll need per itinerary item:

- [x] Name
- [x] Tag
- [x] Start time
- [x] End time
- [x] Cost estimate (and it's conversion to ZAR)
- [x] (Optional) Start location (lat, lon)
- [x] (Optional) End location (lat, lon)
- [x] (Optional) Notes

## Backend

- [x] Firebase (or other similarly functional backend)
- [x] Sign up/Log in (Auth)
- [x] Tables/Documents (Full CRUD support):
  - [x] Users
  - [x] Trips
  - [x] Itinerary Item

## Angular

- [x] Container & Presentational components
- [ ] Pipe(s)
- [x] Evaluated attributes
- [x] Proper management of lists i.e. trackBy
- [x] Form handling
- [x] Only absolutely necessary and cleaned up observable$ subscriptions (if any)
- [x] Event handling
- [x] State management - NgRx Store
  - [x] Actions, Reducers, Selectors
  - [x] Effects
- [ ] Routing:
  - [ ] Clean routing
  - [ ] Route guards
  - [ ] **Routes:**
    - [x] Login
    - [x] MyTrips
    - [-] Trip/:id
    - [-] Trip/:id/event/:eventId
    - Only the login route can be unprotected, the rest can be modularised and lazy loaded
- [x] Network calls
  - [x] Full CRUD capabilities
  - [x] Proper use of the httpClient (rtfm)

### Component library options

- [ng-zorro Ant Design](https://ng.ant.design/docs/introduce/en) - Tons of really cool things
- [Angular Material](https://material.angular.io/) - Tons of things
- [Onsen UI](https://onsen.io/) - Solid mobile components
- [PrimeNG](https://www.primefaces.org/primeng/#/) - Really clean and good looking components
- [ng-lightning](https://ng-lightning.github.io/ng-lightning/#/) - Simple and clean components
- [AG Grid](https://www.ag-grid.com/) - Has all the table goodness
- [ngx-charts](https://swimlane.gitbook.io/ngx-charts/) - Chart goodness
- [Apex Charts](https://apexcharts.com/) - Charts that you would see in movies, super sexy
- [ngx-boostrap](https://valor-software.com/ngx-bootstrap/#/) - Bootstrap for angular
- [Semantic UI](https://semantic-ui.com/) - A corporate favourite
- [Kendo UI](https://www.telerik.com/kendo-ui) - Great stuff, but behind a paywall
- [MDBootstrap](https://mdbootstrap.com/docs/b5/angular/) - Angular Material and Bootstrap in one package

## Accessibility

- [ ] 100% on lighthouse

## UI Design

- [ ] Colour
- [ ] Contrast > 3.5 ratio
- [ ] Visual Hierarchy
- [ ] Whitespace
- [ ] Consistency
- [ ] Scale
- [ ] User Feedback
- [ ] Responsiveness - the expectation is fully responsive

## Bonuses **Only touch after everything else has been checked**

- [ ] PWA
- [x] Cool Selectors
- [x] Flexing your RxJS knowledge
- [ ] Extra mile stuff anywhere
- [ ] Animations
- [ ] Excellent design
- [ ] Full offline support
- [ ] Map/Timeline or using the map to add locations to itinerary items
- [ ] Lazy loading

## Some Inspiration

- [wonderlog](https://wanderlog.com/)

# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
