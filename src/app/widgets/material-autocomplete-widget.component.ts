import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService, isArray } from 'angular6-json-schema-form';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'mat-autocomplete-widget',
    template: `<mat-form-field [appearance]="options?.appearance || matFormFieldDefaultOptions?.appearance || 'standard'"
    [class]="options?.htmlClass || ''"
    [floatLabel]="options?.floatLabel || matLabelGlobalOptions?.float || (options?.notitle ? 'never' : 'auto')"
    [hideRequiredMarker]="options?.hideRequired ? 'true' : 'false'"
    [style.width]="'100%'">
    <input 
    [name]="controlName" 
    [style.width]="'100%'"
    [type]="layoutNode?.type"
    [formControl]="formControl"
    [matAutocomplete]="auto" matInput 
    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
    [attr.pattern]="options?.pattern"
    [attr.placeholder]="options?.placeholder"
    [attr.required]="options?.required"
    [class]="options?.fieldHtmlClass || ''"
    [id]="'control' + layoutNode?._id"
    >
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let selectItem of filteredOptions | async"
        [attr.selected]="selectItem?.value === controlValue"
        [value]="selectItem?.value">
        <span [innerHTML]="selectItem?.value"></span>
      </mat-option>
  </mat-autocomplete>
  <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
    [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
  <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
    align="end" [innerHTML]="options?.description"></mat-hint>
</mat-form-field>
<mat-error *ngIf="options?.showErrors && options?.errorMessage"
  [innerHTML]="options?.errorMessage"></mat-error>`
})
export class MaterialAutoCompleteWidgetComponent implements OnInit {
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled = false;
    boundControl = false;
    options: any;
    selectList: any[] = [];
    isArray = isArray;
    @Input() layoutNode: any;
    @Input() layoutIndex: number[];
    @Input() dataIndex: number[];

    inputOptions: ListItem[] = [];
    filteredOptions: Observable<ListItem[]>;

    constructor(
        private jsf: JsonSchemaFormService
    ) { }

    ngOnInit() {
        this.fillInItems();
        this.fillInOptions();
        console.log(this.selectList);
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }

        this.filteredOptions = this.formControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): ListItem[] {
        const filterValue = value.toLowerCase();

        return this.inputOptions.filter(option => option.value.toLowerCase().includes(filterValue));
    }

    fillInItems() {
        this.selectList.push({ "name": "20", "value": "20" });
        this.selectList.push({ "name": "21", "value": "21" });
        this.selectList.push({ "name": "22", "value": "22" });
        this.selectList.push({ "name": "23", "value": "23" });
    }

    fillInOptions() {
        this.inputOptions.push({ key: "USA", value: "United States" });
        this.inputOptions.push({ key: "CAN", value: "Canada" });
        this.inputOptions.push({ key: "GBR", value: "Great Britan" });
    }

    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }

}

export interface ListItem {
    key: string;
    value: string;
}