Ext.define('StreetsEditor.view.cities.CitiesGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'citiesgrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.plugin.PagingToolbar',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.field.Number'
    ],

    title: 'Cities',
    width: '25%',
    margin: 5,
    height: '100%',

    store: {
        type: 'cities'
    },

    columns: [{
        text: 'City Name',
        dataIndex: 'name',
        flex: 1
    }, {
        text: 'Region',
        dataIndex: 'region',
        flex: 1
    }, {
        text: 'Population',
        dataIndex: 'population',
        flex: 1,
        cell: {
            encodeHtml: false,
            renderer: function(value) {
                return '~' + Ext.util.Format.number(value, '0,000');
            }
        }
    }],

    // items: [{
    //     xtype: 'toolbar',
    //     docked: 'top',
    //     items: [{
    //         xtype: 'textfield',
    //         label: 'City',
    //         width: 200,
    //         triggers: {
    //             clear: {
    //                 type: 'clear',
    //                 handler: function(field) {
    //                     field.setValue('');
    //                 }
    //             }
    //         },
    //         listeners: {
    //             change: {
    //                 buffer: 300,
    //                 fn: function(field, value) {
    //                     var grid = field.up('grid');
    //                     var store = grid.getStore();
    //
    //                     store.clearFilter();
    //
    //                     if (value) {
    //                         store.filter('name', value, true, false);
    //                     }
    //                 }
    //             }
    //         }
    //     }]
    // }, {
    //     xtype: 'toolbar',
    //     docked: 'top',
    //     items: [{
    //         xtype: 'selectfield',
    //         label: 'Region',
    //         width: 200,
    //         store: {
    //             fields: ['name'],
    //             data: [
    //                 {name: 'Central'},
    //                 {name: 'North-West'},
    //                 {name: 'Southern'},
    //                 {name: 'North-Caucasian'},
    //                 {name: 'Volga'},
    //                 {name: 'Ural'},
    //                 {name: 'Siberian'},
    //                 {name: 'Far-Eastern'}
    //             ]
    //         },
    //         displayField: 'name',
    //         valueField: 'name',
    //         triggers: {
    //             clear: {
    //                 type: 'clear',
    //                 handler: function(field) {
    //                     field.setValue(null);
    //                 }
    //             }
    //         },
    //         listeners: {
    //             change: function(field, value) {
    //                 var grid = field.up('grid');
    //                 var store = grid.getStore();
    //
    //                 store.clearFilter();
    //
    //                 if (value) {
    //                     store.filter('region', value);
    //                 }
    //             }
    //         }
    //     }]
    // }, {
    //     xtype: 'toolbar',
    //     docked: 'top',
    //     items: [{
    //         xtype: 'numberfield',
    //         label: 'Population ≥',
    //         width: 200,
    //         minValue: 0,
    //         triggers: {
    //             clear: {
    //                 type: 'clear',
    //                 handler: function(field) {
    //                     field.setValue('');
    //                 }
    //             }
    //         },
    //         listeners: {
    //             change: function(field, value) {
    //                 var grid = field.up('grid');
    //                 var store = grid.getStore();
    //
    //                 store.clearFilter();
    //
    //                 if (value) {
    //                     store.filterBy(function(record) {
    //                         return record.get('population') >= value;
    //                     });
    //                 }
    //             }
    //         }
    //     }]
    // }],
    //
    // plugins: {
    //     type: 'pagingtoolbar',
    //     dock: 'bottom',
    //     displayInfo: true
    // },
    //
    // bbar: {
    //     xtype: 'toolbar',
    //     items: [{
    //         xtype: 'button',
    //         text: 'Clear All Filters',
    //         handler: function() {
    //             var grid = this.up('grid');
    //             var store = grid.getStore();
    //
    //             // Clear all filter fields
    //             grid.down('textfield[label="City"]').setValue('');
    //             grid.down('selectfield[label="Region"]').setValue(null);
    //             grid.down('numberfield[label="Population ≥"]').setValue('');
    //
    //             // Clear store filters
    //             store.clearFilter();
    //         }
    //     }]
    // }
});