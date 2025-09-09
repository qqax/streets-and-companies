/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Streets.Application',

    name: 'Streets',

    requires: [
        // This will automatically load all classes in the Streets namespace
        // so that application classes do not need to require each other.
        'Streets.*'
    ],

    // The name of the initial view to create.
    mainView: 'Streets.view.main.Main'
});
