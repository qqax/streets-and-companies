# Streets App

**Streets** is a web application built with **Ext JS v7.9.0.35 (Modern Toolkit)** for viewing and editing data related to **streets, cities, regions**, and **companies**.

During development, the tools [chat.deepseek.com](https://chat.deepseek.com/) and [chatgpt.com/?model=auto](https://chatgpt.com/?model=auto) were used for data generation, as well as to replace search engines in cases where the official documentation was insufficient or comments on application errors were needed.

---

## Requirements

- [Node.js](https://nodejs.org/)
- [Sencha Cmd](https://www.sencha.com/products/sencha-cmd/)
- A compatible version of Ext JS (Modern Toolkit)

### Installing Ext JS

```bash
npm i @sencha/cmd
```
## Running the Project in Development Mode

```bash
sencha app watch
```
Then open your browser and go to:
http://localhost:1841

## Project Structure
```js
├── app
│   ├── Application.js
│   ├── Application.scss
│   ├── model
│   │   ├── City.js
│   │   └── Street.js
│   ├── store
│   │   ├── Cities.js
│   │   ├── Companies.js
│   │   ├── Regions.js
│   │   └── Streets.js
│   └── view
│       └── main
│           ├── CitiesTable.js
│           ├── MainController.js
│           ├── Main.js
│           ├── MainModel.js
│           └── StreetsTable.js
├── app.js
├── app.json
├── build.xml
├── index.html
├── README.md
├── resources
└── workspace.json
```

## Project Architecture
This project follows the **MVVM (Model-View-ViewModel)** architecture.

### MVVM Components
**1. Model**
- _app/model/City.js_ – City data model
- _app/model/Street.js_ – Street data model

_Responsible for data structure and business logic._

**2. View**
- _app/view/main/CitiesTable.js_ – View for the cities table
- _app/view/main/StreetsTable.js_ – View for the streets table
- _app/view/main/Main.js_ – Main view

_Responsible for displaying data and the user interface._

**3. ViewModel**
- _app/view/main/MainModel.js_ – Main view model

_Binds the Model and View, manages the view state._

**4. Controller**
- _app/view/main/MainController.js_ – Main view controller

_Handles user events and business logic._

**5. Store**
- _app/store/Cities.js_ – Data store for cities
- _app/store/Streets.js_ – Data store for streets
- _app/store/Companies.js_ – Data store for companies
- _app/store/Regions.js_ – Data store for regions

_Manages data, caching, and filtering._

