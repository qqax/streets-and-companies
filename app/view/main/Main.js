Ext.define('Streets.view.main.Main', {
    extend: 'Ext.Container', xtype: 'app-main',
    requires: ['Ext.MessageBox', 'Ext.layout.Fit'],

    controller: 'main', viewModel: 'main',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'citiesgrid',
        width: '25%',
        margin: 0,
        style: {
            'border-right': '2px solid #ddd',
        }
    }, {
        xtype: 'streetstable',
        flex: 1
    }]
});
