import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialAutoCompleteWidgetComponent } from './widgets/material-autocomplete-widget.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    jsonSchemaObject: any;
    widgets: any;
    constructor(private http: HttpClient) {
    }
    ngOnInit(): void {
        this.loadJsonSchema();
        this.setWidgets();
    }

    loadJsonSchema = () => {
        const schemaUrl = `assets/Sample_Registration_Form.json`;
        this.http
            .get(schemaUrl)
            .subscribe(schema => {
                // let controls = this.transformSchemaObject(schema);
                this.jsonSchemaObject = this.transformSchemaObject(schema);;
            });
    }

    transformSchemaObject = (schemaObject) => {
        debugger;
        let controls: any = new Array();
        let formName = schemaObject.name;
        let controlsList = schemaObject.propertyTreeList;
        if (controlsList !== undefined && controlsList !== null && controlsList.length > 0) {
            controlsList.forEach(element => {
                controls.push(this.extractControl(element));
            });
            console.log(controls, {});
            return this.generateAngular6SchemaForm(controls);
        }
    }

    generateAngular6SchemaForm = (controls) => {
        console.log('COntrols details ->', JSON.stringify(controls));
        let schemaForm = <any>{};
        let schema = <any>{};
        schema.type = "object";
        schema.properties = {};
        var controlSchemas = new Array();
        controls.forEach(element => {
            // let type = {};
            // type["type"] = "string";
            // schema.properties[element.id] = type;
            schema.properties[element.id] = this.generateControlType(element);
        });
        schemaForm["schema"] = schema;
        console.log(JSON.stringify(schemaForm));
        return schemaForm;
    }

    generateControlType = (element) => {
        if (element.elementType === 6) {
            return this.generateInput();
        }
        else if (element.elementType === 1) {
            return this.generateRadio(element.name, element.values);
        }
        else {
            return this.generateDropDown(element.values);
        }
    }

    generateInput() {
        let type = {};
        type["type"] = "string";
        //type["widget"] = "mat-autocomplete-widget";
        return type;
    }

    generateRadio(title, values) {
        let type = {};
        type["type"] = "string";
        type["title"] = title;
        var elements = new Array();
        values.forEach(element => {
            elements.push(element.value);
        });
        type["enum"] = elements;
        return type;
    }

    onSubmitClick($event: any, isValid) {
        console.log($event, {});
    }

    generateDropDown(values) {
        let type = {};
        type["type"] = "string";

        var elements = new Array();
        values.forEach(element => {
            elements.push(element.value);
        });
        //type["enum"] = elements;
        type["widget"] = "mat-autocomplete-widget";
        return type;
    }

    extractControl = (element) => {
        let control = <any>{};
        control.name = element.name;
        control.id = element.name.replace(" ", "");
        if (element.hasMutuallyExclusiveChildren !== true) {
            control.dataType = element.propertyTreeDataSource.dataSourceType;
            control.ruleType = element.propertyTreeDataSource.ruleType;
            control.elementType = element.propertyTreeDataSource.uiElementType;
            if (element.propertyTreeDataSource.isMutuallyExclusive === true) {
                control.values = this.extractValues(element.propertyTreeDataSource.keyValueList);
            }
            //console.log(control);
        }
        else {
            control.childControls = [];
            element.propertyTreeList.forEach(child => {
                control.childControls.push(this.extractControl(child));
            });

        }
        return control;
    }

    extractValues = (elements) => {
        let values = [];
        if (elements !== undefined && elements !== null && elements.length > 0) {
            elements.forEach(element => {
                let value = <any>{};
                value.sourceType = element.keyDataSource.fieldSourceType;
                value.value = element.keyDataSource.stringValue || element.keyDataSource.integerValue;
                values.push(value);
            });
        }
        return values;
    }

    setWidgets = () => {
        this.widgets = {
            'mat-autocomplete-widget': MaterialAutoCompleteWidgetComponent
        }
    }
}