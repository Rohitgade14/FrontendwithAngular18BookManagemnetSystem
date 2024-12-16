import { GetBookComponent } from './BookComponent/get-book/get-book.component';
import { CreateBookComponent } from './BookComponent/create-book/create-book.component';
import { BookListComponent } from './BookComponent/book-list/book-list.component';
import { UserComponent } from './BookComponent/user/user.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Make sure AuthGuard is imported correctly
import { UpdateBookComponent } from './BookComponent/update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { BookUsersComponent } from './BookComponent/book-users/book-users.component';
import { ExcelComponent } from './BookComponent/excel/excel.component';
import { UploadExcelComponent } from './BookComponent/upload-excel/upload-excel.component';
import { PdfComponent } from './BookComponent/pdf/pdf.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/krios', pathMatch: 'full'  },
  { path: 'krios', component: BookListComponent,canActivate: [AuthGuard] },
  { path: 'create-book', component: CreateBookComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'get-book/:id', component: GetBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
  { path: 'delete-book/:id', component: DeleteBookComponent },
  { path: 'book-users/:bookId', component: BookUsersComponent },
  { path: 'excel', component: ExcelComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'upload-excel', component: UploadExcelComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'pdf', component: PdfComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'logout', redirectTo: '/user', pathMatch: 'full' }
];
