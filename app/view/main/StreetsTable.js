Ext.define('StreetsEditor.view.main.Table', {
    extend: 'Ext.grid.Grid',
    xtype: 'streetstable',

    requires: [
        'StreetsEditor.store.Streets',
        'StreetsEditor.store.Companies',
        'Ext.grid.column.Column',
        'Ext.grid.cell.*',
        'Ext.field.*',
        'Ext.grid.plugin.CellEditing',
    ],

    title: 'Streets',
    width: '100%',
    store: {
        type: 'streets'
    },

    plugins: [ {
        type: 'cellediting',
        clicksToEdit: 1 // или 2 — как тебе удобно
    }, {
        type: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    }],

    columns: [{
        text: 'Street Name',
        dataIndex: 'name',
        flex: 2,
        editable: true,
        editor: {
            xtype: 'textfield',
            allowBlank: false,
            // validators: [
            //     {
            //         type: 'length',
            //         min: 4,
            //     }
            // ]
        },
        cell: {
            xtype: 'textcell',
        }
    }, {
        text: 'Company',
        dataIndex: 'companyId',
        flex: 2,
        editable: true,
        editor: {
            xtype: 'selectfield',
            store: {
                type: 'companies',
            },
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: true,
            required: true
        },
        cell: {
            xtype: 'gridcell',
            renderer: function (value) {
                const store = Ext.getStore('Companies');
                const rec = store && store.findRecord('id', value);
                return rec ? rec.get('name') : value;
            },
        }
    }, {
        text: 'Number of Houses',
        dataIndex: 'houses',
        flex: 1,
        editor: {
            xtype: 'numberfield',
            minValue: 1,
            maxValue: 10000,
            allowDecimals: false,
            allowBlank: false
        },
        cell: {
            xtype: 'numbercell',
            renderer: function(value) {
                return Ext.util.Format.number(value, '0');
            },
        },
    }, {
        text: 'Approximate Population',
        dataIndex: 'population',
        flex: 1,
        cell: {
            renderer: function (value) {
                return '~' + Ext.util.Format.number(value, '0,000');
            }
        }
    }, {
        width: 80,
        text: 'Delete',
        cell: {
            tools: {
                delete: {
                    iconCls: 'x-fa fa-trash',
                    handler: function (grid, info) {
                        var record = info.record;
                        Ext.Msg.confirm('Confirmation', 'Delete this street?', function (btn) {
                            if (btn === 'yes') {
                                grid.getStore().remove(record);
                            }
                        });
                    }
                }
            }
        }
    }],
});