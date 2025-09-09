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

    plugins: [{
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
            renderer: function (value) {
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

    applyAllFilters: function () {
        const grid = this;
        const store = grid.getStore();

        const streetValue = grid.down('textfield[label="Street"]').getValue();
        const companyValue = grid.down('selectfield[label="Company"]').getValue();
        const numberOfHouses = grid.down('numberfield[label="Number of houses =="]').getValue();
        const popFromValue = grid.down('numberfield[label="Population From"]').getValue();
        const popToValue = grid.down('numberfield[label="Population To"]').getValue();

        store.clearFilter();

        store.filterBy(function (record) {
            const matchStreet = !streetValue || record.get('name').toLowerCase().includes(streetValue.toLowerCase());
            const matchHouseQuantity = !numberOfHouses || record.get('houses') === numberOfHouses;

            let matchCompany = true;
            if (companyValue) {
                const companyId = record.get('companyId');
                if (typeof companyValue === 'number') {
                    matchCompany = companyId === companyValue;
                } else {
                    const companyStore = Ext.getStore('Companies');
                    const company = companyStore.findRecord('name', companyValue, 0, false, true, true);
                    matchCompany = company ? companyId === company.get('id') : false;
                }
            }

            let matchPopulation = true;
            if (popFromValue || popToValue) {
                const population = record.get('population') || 0;
                if (popFromValue && popToValue) {
                    matchPopulation = population >= popFromValue && population <= popToValue;
                } else if (popFromValue) {
                    matchPopulation = population >= popFromValue;
                } else if (popToValue) {
                    matchPopulation = population <= popToValue;
                }
            }

            return matchStreet && matchCompany && matchHouseQuantity & matchPopulation;
        });

        store.totalCount = store.getData().getCount();
        store.loadPage(1);
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'textfield',
            label: 'Street',
            width: 200,
            clearable: true,
            listeners: {
                change: {
                    buffer: 300,
                    fn: function (field, value) {
                        const grid = field.up('grid');
                        grid.applyAllFilters();
                    }
                }
            }

        },  {
            xtype: 'selectfield',
            label: 'Company',
            width: 200,
            clearable: true,
            store: {
                type: 'companies'
            },
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: false,
            triggers: {
                clear: {
                    type: 'clear',
                    handler: function(field) {
                        field.setValue(null);
                    }
                }
            },
            listeners: {
                change: function(field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        },{
            xtype: 'numberfield',
            label: 'Number of houses ==',
            width: 200,
            minValue: 0,
            clearable: true,
            listeners: {
                change: function (field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        }, {
            xtype: 'numberfield',
            label: 'Population From',
            width: 150,
            clearable: true,
            triggers: {
                clear: {
                    type: 'clear',
                    handler: function (field) {
                        field.setValue('');
                    }
                }
            },
            listeners: {
                change: function (field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        }, {
            xtype: 'numberfield',
            label: 'Population To',
            width: 150,
            clearable: true,
            triggers: {
                clear: {
                    type: 'clear',
                    handler: function (field) {
                        field.setValue('');
                    }
                }
            },
            listeners: {
                change: function (field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        }, {
            xtype: 'button',
            text: 'Clear All Filters',
            handler: function () {
                const grid = this.up('grid');

                grid.down('textfield[label="Street"]').setValue('');
                grid.down('selectfield[label="Company"]').setValue(null);
                grid.down('numberfield[label="Number of houses =="]').setValue('');
                grid.down('numberfield[label="Population From"]').setValue('');
                grid.down('numberfield[label="Population To"]').setValue('');

                grid.getStore().clearFilter();
                grid.applyAllFilters();
            }
        }],
    }],
});