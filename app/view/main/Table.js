Ext.define('StreetsEditor.view.main.Table', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'StreetsEditor.store.Streets',
        'Ext.grid.column.Column',
        'Ext.grid.cell.*',
        'Ext.field.*',
        'Ext.grid.plugin.Editable'
    ],

    title: 'Streets',
    height: '100%',

    store: {
        type: 'streets'
    },

    columns: [{
        text: 'Street Name',
        dataIndex: 'name',
        flex: 2,
        cell: {
            xtype: 'textcell',
            editable: true
        }
    }, {
        text: 'Company',
        dataIndex: 'companyName',
        flex: 2,
        cell: {
            xtype: 'gridcell',
            editable: {
                xtype: 'combo',
                store: 'Companies',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local'
            }
        }
    }, {
        text: 'Number of Houses',
        dataIndex: 'houses',
        flex: 1,
        cell: {
            xtype: 'numbercell',
            editable: true
        }
    }, {
        text: 'Approximate Population',
        dataIndex: 'population',
        flex: 1,
        cell: {
            renderer: function(value) {
                return '~' + Ext.util.Format.number(value, '0,000');
            }
        }
    },
        {
        width: 80,
        text: 'Delete',
        cell: {
            tools: {
                delete: {
                    iconCls: 'x-fa fa-trash',
                    handler: function(grid, info) {
                        var record = info.record;
                        Ext.Msg.confirm('Confirmation', 'Delete this street?', function(btn) {
                            if (btn === 'yes') {
                                grid.getStore().remove(record);
                            }
                        });
                    }
                }
            }
        }
    }
    ],

    // plugins: {
    //     grideditable: {
    //         triggerEvent: 'tap'
    //     }
    // }
});