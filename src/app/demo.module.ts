import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';



// To include JsonSchemaFormModule after downloading from NPM, use this instead:
//
//   import { JsonSchemaFormModule, NoFrameworkModule } from 'angular6-json-schema-form';
//
// but replace "NoFrameworkModule" with the framework you want to use,
// then import both JsonSchemaFormModule and the framework module, like this:
//
//   imports: [ ... NoFrameworkModule, JsonSchemaFormModule.forRoot(NoFrameworkModule) ... ]

import { AceEditorDirective } from './ace-editor.directive';
import { DemoComponent } from './demo.component';
import { DemoRootComponent } from './demo-root.component';

import { routes } from './demo.routes';
import {
  MaterialDesignFrameworkModule, Bootstrap4FrameworkModule,
  Bootstrap3FrameworkModule, NoFrameworkModule
} from 'angular6-json-schema-form';
import { AppComponent } from './app.component';
import { MaterialAutoCompleteWidgetComponent } from './widgets/material-autocomplete-widget.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AceEditorDirective,
    DemoComponent,
    DemoRootComponent,
    AppComponent, MaterialAutoCompleteWidgetComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, FlexLayoutModule, FormsModule,
    HttpClientModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule, MatAutocompleteModule,
    RouterModule.forRoot(routes),
    MaterialDesignFrameworkModule,
    Bootstrap4FrameworkModule,
    Bootstrap3FrameworkModule,
    NoFrameworkModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  //bootstrap: [DemoRootComponent]
  bootstrap: [DemoRootComponent],
  entryComponents: [MaterialAutoCompleteWidgetComponent]
})

// Here, by loading 4 frameworks in JsonSchemaFormModule.forRoot(), the first,
// `NoFrameworkModule`, will be set active by default. But any of the 4 can
// be activated later by passing the framework's name to the <json-schema-form>
// tag's `framework` input. The names of these 4 frameworks are:
//   'no-framework'
//   'material-design-framework',
//   'bootstrap-3-framework'
//   'bootstrap-4-framework'

export class DemoModule { }
