import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PostData,
  _LIST,
  _POST_LIST_RESPONSE,
  _POST
} from './../../../angular-backend/angular-backend';
import {
    NO_OF_ITEMS_PER_PAGE
} from './../../../angular-backend/config';
import { PageScroll } from './../../services/page-scroll';
@Component({
    selector: 'article-list-component',
    templateUrl: './article-list.html'
})
export class ArticleListComponent {
  
  
  post_config_id: string = null;
  
  lists: Array<_POST_LIST_RESPONSE> = [];

  postListResponse: _POST_LIST_RESPONSE = null;
    showPostForm: boolean = false;
    inLoading = false;
    noMorePosts = false;
    page = 0;
    watch;

  constructor(
      private domSanitizer: DomSanitizer,
        private activated: ActivatedRoute,
        private pageScroll: PageScroll,
        public postData: PostData,
        private router: Router )
  {

  }

  ngOnInit() {

    this.activated.params.subscribe( params => {
        console.log('param subs:', params);
        this.reset();
        if ( params['post_config_id'] !== void 0 ) { /// 게시판인가? 메인 페이지 인가 구별.
            this.post_config_id = params['post_config_id'];
        }
        this.load();
    });

    this.watch = this.pageScroll.watch( 'body', 350 ).subscribe( e => this.load() );

  }

    ngOnDestroy() {
      this.watch.unsubscribe();
    }

    reset() {
        this.lists = [];
        this.page = 0;
        this.inLoading = false;
        this.noMorePosts = false;
    }
  onLoaded( res:_POST_LIST_RESPONSE ) {
    this.postListResponse = res;
    console.log('res:', res);
  }

    load() {
        console.log("load() is called");
        if ( this.inLoading ) {
            console.log("but it's still loading previous page. so, just don't do anything");
            return;
        }
        if ( this.noMorePosts ) {
            console.log("but no more posts. so don't do anything");
            return;
        }
      this.inLoading = true;
      this.page++;
      console.log("loading page: ", this.page);

        let req: _LIST = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            page: this.page,
            limit: 16,
            extra: {
                post_config_id: this.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };

        this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
            console.log('post list: ', res);
            this.inLoading = false;


            /// pre process

            res.data.posts.map( (post: _POST) => {
                post.title = post.title.substr(0, 5);
            });

            // eo

            this.lists.push( res );


            if ( res.data.posts.length == 0 ) this.noMorePosts = true;
            else {
            }
        }, err => {
            if ( err['code']  == -40232 ) {
                this.router.navigateByUrl('/');
                alert('forum not exist');
            }
            else this.reset();
        });
    }


    public sanitize( obj ) : string {
        if ( obj === void 0 || obj['content'] === void 0 || ! obj['content'] ) return '';
        let c = obj['content'].replace(/\n/g, "<br>");
        return this.domSanitizer.bypassSecurityTrustHtml( c ) as string;
        
    }

}
