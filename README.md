# Interview Scheduler

Single-page React application that allows students to book and and cancel tech interviews between student and mentor. Interview appointments are available between 12PM and 5PM, Monday to Friday and each appointment has one student and one interviewer. The front end app makes requests to an API for fetching appointment data from a database.

# Dependencies
- Node version v12.x.x (Vagrant & WSL) or v15.x.x (M1 Mac).
- Use Node Version Manager to switch to correct version before installing project depenedencies, I.e. `nvm use v15.14.0`

# Project Structure
.storybook - Storybook config
coverage - report of test coverage for the project
cypress - end to end tests
docs - screenshots of the project and supplemental documentation
public - static assets, images, rendered index.html that React will mount to
src - React compoenents
__tests__ Jest tests
__mocks__ Jest mock data for testing axios calls to API
stories - stroybook compoenents


## Setup

Clone the repo
```sh
git clone git@github.com:kgislason/scheduler.git
```

Install dependencies with: 
```sh
npm install
```
## Running Webpack Development Server

```sh
npm start
```
Use `Ctrl+C` to kill the process

## Scheduler API Backend
 This app is depenedent on Scheduler API. This project will need to be cloned un run separately.

Install schdeuler-api:

```sh
git@github.com:kgislason/scheduler-api.git
```

Follow the README.md instructions for that project to get your API server up and running.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

There are Cypress tests avilable in this project that require connecting to a test database for the API.

# Screenshots
## Desktop Display

!["Desktop"](https://github.com/kgislason/scheduler/blob/master/docs/scheduler-desktop.png?raw=true)

## Mobile Display
!["Mobile"](https://github.com/kgislason/scheduler/blob/master/docs/scheduler-mobile.png?raw=true)

## Editing an Appointment
!["Edit Appointment"](https://github.com/kgislason/scheduler/blob/master/docs/scheduler-edit.png?raw=true)

## Delete Confirmation Message
!["Delete Appointment Confirmation"](https://github.com/kgislason/scheduler/blob/master/docs/delete.png?raw=true)
