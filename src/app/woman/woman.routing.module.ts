import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ForumPage } from './pages/forum/forum';
const WomanRoutes: Routes = [
    { path: 'forum/:post_config_id', component: ForumPage },
    { path: '', component: HomePage, pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
];
@NgModule({
    imports: [
        RouterModule.forChild( WomanRoutes )
    ],
    exports: [ RouterModule ]
})
export class WomanRoutingModule {}
