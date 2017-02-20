import Vue from 'vue';
import Router from 'vue-router';
import Main from 'components/Main';
import AuthService from '../services/Auth';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
  }],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth && !AuthService.authenticated) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
