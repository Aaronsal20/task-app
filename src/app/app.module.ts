import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { taskListReducer } from './tasks/store/task-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    HeaderComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({taskList: taskListReducer}),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
