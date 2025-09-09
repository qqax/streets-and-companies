# Streets App

**Streets** — это веб-приложение на Ext JS v7.9.0.35 (Modern Toolkit) для просмотра и редактирования данных по улицам, городам, регионам компаниям.

При работе над проектом использовались [chat.deepseek.com/](https://chat.deepseek.com/) и [chatgpt.com/?model=auto](https://chatgpt.com/?model=auto) при генерации данных, а также как замена поисковикам в случаях, когда официальной документации было недостаточно, или когда требовались комментарии по ошибкам приложения.

---

## Требования

- [Node.js](https://nodejs.org/)
- [Sencha Cmd](https://www.sencha.com/products/sencha-cmd/)
- Совместимая версия Ext JS (Modern Toolkit)

### Установка Ext JS
```bash
npm i @sencha/cmd
```
## Запуск проекта в режиме разработки

```bash
sencha app watch
```
Перейдите в браузере по адресу:
http://localhost:1841

## Структура проекта
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

## Архитектура проекта
Данный проект соответствует архитектуре **MVVM (Model-View-ViewModel)**.

### Компоненты MVVM:
**1. Model (Модель)**
- _app/model/City.js_ - Модель данных городов
- _app/model/Street.js_ - Модель данных улиц

_Отвечают за структуру данных и бизнес-логику_

**2. View (Представление)**
- _app/view/main/CitiesTable.js_ - Представление таблицы городов
- _app/view/main/StreetsTable.js_ - Представление таблицы улиц
- _app/view/main/Main.js_ - Главное представление

Отвечают за отображение данных и пользовательский интерфейс

**3. ViewModel (Модель представления)**
- _app/view/main/MainModel.js_ - Модель главного представления

Связывает Model и View, управляет состоянием представления

**4. Controller (Контроллер)**
- _app/view/main/MainController.js_ - Контроллер главного вида

Обрабатывает пользовательские события и бизнес-логику

**5. Store (Хранилище)**
- _app/store/Cities.js_ - Хранилище данных городов
- _app/store/Streets.js_ - Хранилище данных улиц
- _app/store/Companies.js_ - Хранилище компаний
- _app/store/Regions.js_ - Хранилище регионов

Управляют данными, кэшированием и фильтрацией

