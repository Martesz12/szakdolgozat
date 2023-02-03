import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        MatButtonModule,
        MatGridListModule,
        MatTreeModule,
        MatDividerModule,
        HttpClientModule,
        MatCardModule,
        MatPaginatorModule,
        MatInputModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ClipboardModule,
    ],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        MatButtonModule,
        MatGridListModule,
        MatTreeModule,
        MatDividerModule,
        HttpClientModule,
        MatCardModule,
        MatPaginatorModule,
        MatInputModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
    ],
})
export class SharedModule {}