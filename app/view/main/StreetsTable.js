Ext.define('StreetsEditor.view.main.Table', {
    extend: 'Ext.grid.Grid',
    xtype: 'streetstable',

    requires: [
        'StreetsEditor.store.Streets',
        'StreetsEditor.store.Companies',
        'StreetsEditor.store.Cities',
        'Ext.grid.column.Column',
        'Ext.grid.cell.*',
        'Ext.field.*',
        'Ext.grid.plugin.CellEditing',
        'Ext.Dialog'
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

                if (typeof companyValue === 'number') {
                    const companyId = record.get('companyId');
                    matchCompany = companyId === companyValue;
                } else if (typeof companyValue === 'string') {
                    const companyName = record.get('companyName');
                    if (companyName) {
                        matchCompany = companyName.toLowerCase().includes(companyValue.toLowerCase());
                    } else {
                        const companyStore = Ext.getStore('Companies');
                        const company = companyStore.findRecord('name', companyValue, 0, false, true, true);
                        matchCompany = company ? record.get('companyId') === company.get('id') : false;
                    }
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
        layout: {
            type: 'hbox',
        },
        items: [{
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                wrap: true,
            },
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

            }, {
                xtype: 'combobox',
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
                anyMatch: true,
                typeAhead: true,
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
                width: 200,

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
        }, {
            xtype: 'container',
            layout: {
                type: 'box',
                align: 'middle',
                wrap: true,
            },
            items: [{
                xtype: 'button',
                text: 'Add Street',
                iconCls: 'x-fa fa-plus',
                margin: '0 10 0 0',
                handler: function () {
                    this.up('grid').showAddStreetDialog();
                },
            }],
        }],
    }],

    showAddStreetDialog: function () {
        const dialog = Ext.create('Ext.Dialog', {
            title: 'Add New Street',
            width: 500,
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                itemId: 'streetName',
                label: 'Street Name',
                placeholder: 'Minimum 5 characters',
                required: true,
                minLength: 5,
                enforceMaxLength: true,
                errorTarget: 'under',
                validators: [
                    {type: 'length', min: 5, message: 'Minimum 5 characters'}
                ],
                listeners: {
                    change: function(field) {
                        field.validate();
                        dialog.validateForm();
                    }
                }
            }, {
                xtype: 'selectfield',
                itemId: 'company',
                label: 'Company',
                required: true,
                store: {
                    type: 'companies',
                },
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                forceSelection: true,
                errorTarget: 'under',
                listeners: {
                    change: function(field, value) {
                        Ext.defer(function() {
                            dialog.validateForm();
                        }, 10);
                    }
                }
            }, {
                xtype: 'numberfield',
                itemId: 'houses',
                label: 'Number of Houses',
                required: true,
                minValue: 1,
                maxValue: 10000,
                allowDecimals: false,
                errorTarget: 'under',
                value: 1,
                listeners: {
                    change: function(field) {
                        dialog.validateForm();
                    }
                }
            }, {
                xtype: 'selectfield',
                itemId: 'city',
                label: 'City',
                required: true,
                store: Ext.create('StreetsEditor.store.Cities'),
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                forceSelection: true,
                errorTarget: 'under',
                listeners: {
                    change: function(field, value) {
                        Ext.defer(function() {
                            dialog.validateForm();
                        }, 10);
                    }
                }
            }],
            buttons: [{
                text: 'Create',
                itemId: 'createBtn',
                disabled: true,
                formBind: true,
                handler: function () {
                    const form = this.up('dialog');
                    const values = {
                        name: form.down('#streetName').getValue(),
                        companyId: form.down('#company').getValue(),
                        houses: form.down('#houses').getValue(),
                        cityId: form.down('#city').getValue()
                    };

                    const store = Ext.getStore('streets');
                    const newId = store.getCount() > 0 ?
                        Math.max(...store.getRange().map(r => r.get('id'))) + 1 : 1;

                    const newRecord = Ext.create('StreetsEditor.model.Street', {
                        id: newId,
                        name: values.name,
                        companyId: values.companyId,
                        houses: values.houses,
                        cityId: values.cityId
                    });

                    console.log(newRecord, store);

                    store.add(newRecord);
                    form.close();

                    Ext.toast('Street added successfully', 3000);
                }
            }, {
                text: 'Close',
                handler: function () {
                    this.up('dialog').close();
                }
            }]
        });

        dialog.validateForm = function () {
            const nameField = this.down('#streetName');
            const companyField = this.down('#company');
            const housesField = this.down('#houses');
            const cityField = this.down('#city');

            const nameValid = nameField.getValue().length >= 5;
            const companyValid = !!companyField.getValue();
            const housesValue = housesField.getValue();
            const housesValid = (typeof housesValue === 'number') && housesValue > 0;
            console.log(housesValue, housesValid)

            const cityValid = !!cityField.getValue();

            const isValid = nameValid && companyValid && housesValid && cityValid;
            this.down('#createBtn').setDisabled(!isValid);
        };

        dialog.show();
    },
});