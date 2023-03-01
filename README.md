# Project SpendWise

## Table of Contents

- [Project SpendWise](#project-spendwise)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Overview](#overview)
  - [Development Progression Outline](#development-progression-outline)
    - [Alpha Version](#alpha-version)
    - [Beta Version](#beta-version)
    - [Final Version](#final-version)
  - [Complexity](#complexity)
    - [Complexity Point Breakdown](#complexity-point-list-10)
    - [Challenge factor](#challenge-factor)
  - [Contributions](#contributions)
    - [Chongmin Bai](#chongmin-bai)
    - [Matthew Melchior](#matthew-melchior)
    - [Sean Lau Kuang Qi](#sean-lau-kuang-qi)

## Project Description

- Spendwise is a free to use budgeting web application that allows you to connect all your financial accounts into one digital space. Spendwise will provide interactive Dashboard that helps you to keep track of your spending and suggests budgeting goals based on your spendings and more.

## Overview

```yml
- Frontend:
    - React
- Backend:
    - Express
    - Node
- DB: Postgresql
- Error Tracking: Sentry
```

## Features

- [ ] Spending Visualisation
  - Visualise spending based on time & category
  - Graphs, charts and big sections that contain total spends/income this month etc.
  - Done Using [Unovis](https://unovis.dev/gallery)
- [ ] Link your bank account to [Plaid API](https://plaid.com/) for automatic entry
  - Once you link your account, we will fetch all the transactions for this month
  - automatic update daily using [Celery](https://github.com/celery/celery)
- [ ] Grid of All Transaction (frontend)
  - List of all transactions will be displayed in a grid
  - sort in time
  - Pagination
  - With multiple buttons
- [ ] Create, Read, Update, Delete, of Spend/Income record (Backend)
  - Enter amount, title, date, category, etc and
  - See each spend record
  - Update each record
  - Delete by clicking on a record. (sends API request to the backend etc)
- [ ] Login/Register
  - Password Reset
  - Personal Information Page
  - Authentication using [Auth0](https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/mfa-api)

## Development Progression Outline

#### Alpha Version

- **Front-End:** The alpha version of Project SpendWise will include a minimally interactive skeleton of the web application. Users of the website will at this point be able to navigate from the homepage through to all the pages that will be available by the final version. The general layout and basic design elements of each page should be apparent by this point. Users will be able to sign up and login.

- **Back-End:** The alpha version of Project SpendWise will include all the backend logic of the manual CRUD transactions and Sentry setup. No [Plaid API](https://plaid.com/) and [Celery](https://github.com/celery/celery) at this point. The general layout and basic design of the backend should be apparent by this point. Backend logic for sign up and login. Auth0 API should be setup.

#### Beta Version

- **Front-End:** The Beta version of Project SpendWise will seek intergrate server-side generated elements into the Frontend. By the Beta Version, users will be able to both view data originating from the backend (i.e., transaction data) as well as inputting user generated data from the front-end (i.e., profile data). Data visualization tools will also be implemented to some extent by the Beta version, allowing users to have their transaction data visualized in a limited manner. All authentication and authorization should be done.

- **Back-End:** The Beta version of Project SpendWise will contain the implementation of linking your finical accounts via [Plaid API](https://plaid.com/) and daily transaction entry via [Celery](https://github.com/celery/celery). Email service using SendGrid should be done.

#### Final Version

- **Front-End:** The Final version of Project SpendWise will ensure that users can interact with all implemented features in a fast and intuitive manner. Design elements will be fully polished in the final version, giving SpendWise a clean and professional feel. Robust transaction visualization and the ability to display all transactions by a user's desired categories will also be available by this time.

- **Back-End:** The final version of Project SpendWise will wrap up everything that was previously delayed and ensures everything works as designed and have it deployed on a Cloud VM.

## Complexity

### Complexity Point List 10

- Automatic entries from the bank. (Plaid API) (2 Points)
  - https://plaid.com/
- (Send Grid) (2 points)
  - Email upon register & account recovery
  - https://sendgrid.com/
- Data Visualization API (Unovis) (1 point)
  - https://unovis.dev/gallery
- Authentication Auth0 Api (1 point)
  - https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/mfa-api
- Celery worker for Async job (3 points)
  - Daily Scheduled worker that will fetch user account transactions
  - https://github.com/celery/celery
- Sentry Error logging (1 point)
  - https://sentry.io/welcome/

### Challenge Factor

- OpenAI for categorization and tips box (1 point)
  - No personal identifiable information
  - https://openai.com/api/

## Contributions

### Chongmin-Bai:

Student Number: 1004986599. Responsible for general backend-end development, including backend logic for manual entry of transactions, automatic entry of transaction of Plaid API, Setting up Celery worker for async jobs and Setting up Sentry for Error Logging.

### Matthew Melchior

Student Number: 1005085541. Responsible for general front-end development, including spending visualization, displaying transactions, etc.

### Sean Lau Kuang Qi

Student Number: 1005463464. Responsible for full-stack development of register, email service setup, and authentication/authorization using Auth0 API.
