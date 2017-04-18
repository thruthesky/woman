# Woman



# 해야 할 일

* 방문자 유치를 위한 SEO 작업.


# Bugs

* 회원 가입을 해야지만, 찜하기 기능이 올바로 동작한다.

이 것을 그냥 localStorage 에 저장하면 로그인을 하지 않아도 되는데....

아무래도 로그인을 하지 않고 찜 할 수 있도록 변경 해야 할 것 같다.

그래서 현재, 이 부분은 작업 중지 상태.


# Known Bugs

These bugs will not be fixed. It's no harm and does not have any bad affect at all.

* When a new post posted, title becomes long. This is only for admin.





# Installation

* font-awesome

    src/assets/font-awesome

* bootstrap

    src/assets/bootstrap-4

    * Do not install ng-bootstrap

* enhancer

    * $ git submodule add https://github.com/thruthesky/enhancer src/app/enhancer

    * Add "@import './app/enhancer/scss/enhancer';" to style.scss

* angular-backend

    * $ git submodule add https://github.com/thruthesky/angular-backend src/app/angular-backend
    * $ npm install @ng-bootstrap --save






