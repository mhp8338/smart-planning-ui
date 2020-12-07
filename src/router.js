import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "./utils/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    //  登录页和注册页的路由
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        },
        {
          path: "/user/register-result",
          name: "register.result",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/RegisterResult")
        }
      ]
    },
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // dashboard 需要登录页可以redirect /user/login
        {
          path: "/",
          redirect: "/network-data-query-system/query163"
        },
        {
          path: "/network-data-query-system",
          name: "networkDataQuerySystem",
          meta: { icon: "chrome", title: "网络数据查询系统" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/network-data-query-system/query163",
              name: "query163",
              meta: { icon: "book", title: "163查询" },
              component: () =>
                  import(/* webpackChunkName: "163" */ "./views/QuerySystem/NetworkStates163")
            },
            {
              path: "/network-data-query-system/queryCN2",
              name: "queryCN2",
              meta: { icon: "book", title: "CN2查询" },
              component: () =>
                  import(/* webpackChunkName: "CN2" */ "./views/QuerySystem/NetworkStatesCN2")
            }
          ]
        },
        // 流量预测
        {
          path: "/trafficforecast",
          name: "form",
          component: { render: h => h("router-view") },
          meta: { icon: "form", title: "流量预测", authority: ["admin"] },
          children: [
            {
              path: "/trafficforecast/setting",
              name: "setting",
              meta: { icon: "pie-chart", title: "结果展示" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/TrafficForecast/BasicForm")
            }
            //  分部表单 目前用不上占坑
            // {
            //   path: "/trafficforecast/step-form",
            //   name: "stepform",
            //   hideChildrenInMenu: true,
            //   meta: { title: "分布表单" },
            //   component: () =>
            //     import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm"),
            //   children: [
            //     {
            //       path: "/form/step-form",
            //       redirect: "/form/step-form/info"
            //     },
            //     {
            //       path: "/form/step-form/info",
            //       name: "info",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step1")
            //     },
            //     {
            //       path: "/form/step-form/confirm",
            //       name: "confirm",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step2")
            //     },
            //     {
            //       path: "/form/step-form/result",
            //       name: "result",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step3")
            //     }
            //   ]
            // }
          ]
        },

        // 详情页 目前用不上 目前用不上占坑
        // {
        //   path: "/profile",
        //   name: "profile",
        //   component: { render: h => h("router-view") },
        //   redirect: "/profile/basic",
        //   meta: { title: "详情页", icon: "profile", authority: ["admin"] },
        //   children: [
        //     {
        //       path: "/profile/basic",
        //       name: "basic",
        //       component: () =>
        //         import(/* webpackChunkName: "profile" */ "@/views/Profile/BasicProfile"),
        //       meta: { title: "基础详情页" }
        //     },
        //     {
        //       path: "/profile/advanced",
        //       name: "advanced",
        //       component: () =>
        //         import(/* webpackChunkName: "profile" */ "@/views/Profile/AdvancedProfile"),
        //       meta: { title: "高级详情页" }
        //     }
        //   ]
        // }
        //数字大屏展示
        {
          path: "/visual",
          name: "visual",
          meta: { icon: "slack-square", title: "大屏展示" },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/Visual/DigitalLargeScreen")
        },
        //  图表
        {
          path: "/chart-poo",
          name: "dashboard",
          meta: { icon: "dashboard", title: "图表展示" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/chart-poo/dashboard",
              name: "dashboard-chart",
              meta: { icon: "sliders", title: "盒须图" },
              component: () =>
                  import(/* webpackChunkName: "form" */ "./views/Dashboard/BoxPlot")
            }
            //  分部表单 目前用不上占坑
            // {
            //   path: "/trafficforecast/step-form",
            //   name: "stepform",
            //   hideChildrenInMenu: true,
            //   meta: { title: "分布表单" },
            //   component: () =>
            //     import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm"),
            //   children: [
            //     {
            //       path: "/form/step-form",
            //       redirect: "/form/step-form/info"
            //     },
            //     {
            //       path: "/form/step-form/info",
            //       name: "info",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step1")
            //     },
            //     {
            //       path: "/form/step-form/confirm",
            //       name: "confirm",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step2")
            //     },
            //     {
            //       path: "/form/step-form/result",
            //       name: "result",
            //       component: () =>
            //         import(/* webpackChunkName: "form" */ "./views/TrafficForecast/StepForm/Step3")
            //     }
            //   ]
            // }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/403")
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/404")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
