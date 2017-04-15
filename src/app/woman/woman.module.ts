import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { HomePage } from './pages/home/home';
import { ForumPage } from './pages/forum/forum';
import { WomanRoutingModule } from './woman.routing.module';
import { HeaderComponent } from './components/header/header';
import { ArticleListComponent } from './components/article-list/article-list';
import { PageScroll } from './services/page-scroll';
import { AngularBackendComponentModule } from './../angular-backend/modules/angular-backend-components.module';
@NgModule({
    declarations: [
        HomePage,
        ForumPage,
        HeaderComponent,
        ArticleListComponent
    ],
    imports: [
        CommonModule,
        AngularBackendComponentModule,
        WomanRoutingModule
    ],
    providers: [ PageScroll ]
})
export class WomanModule {}
