/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Streets.view.main.Main', {
    extend: 'Ext.tab.Panel', xtype: 'app-main',

    requires: ['Ext.MessageBox', 'Ext.layout.Fit'],

    controller: 'main', viewModel: 'main',

    items: [{
        xtype: 'mainlist'
    },
    ]
});
