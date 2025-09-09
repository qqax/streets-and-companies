Ext.define('Streets.view.main.Main', {
    extend: 'Ext.tab.Panel', xtype: 'app-main',
    requires: ['Ext.MessageBox', 'Ext.layout.Fit'],

    controller: 'main', viewModel: 'main',

    items: [{
        xtype: 'citiesgrid'
    }, {
        xtype: 'mainlist'
    },
    ]
});
