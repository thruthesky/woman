import { NgModule } from '@angular/core';
import { HomePage } from './pages/home/home';
import { WomanRoutingModule } from './woman.routing.module';
import { HeaderComponent } from './components/header/header';
import { ArticleListComponent } from './components/article-list/article-list';
@NgModule({
    declarations: [
        HomePage,
        HeaderComponent,
        ArticleListComponent
    ],
    imports: [
        WomanRoutingModule
    ]
})
export class WomanModule {}
