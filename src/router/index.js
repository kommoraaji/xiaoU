import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import("@/views/Login"),
      meta: { title: "登录" }
    },
    {
      path: '/welcome',
      component: () => import("@/views/welcome"),
      meta: { title: "欢迎" }
    },
    {
      path: '/',
      component: () => import("@/views/Layout"),
      meta: { title: "xx管理系统" },
      redirect: "/index",
      children: [
        {
          path: '/index',
          component: () => import("@/views/Index"),
          meta: { title: "后台首页" }
        },
        {
          path: '/menu',
          component: () => import("@/views/System/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path: '/role',
          component: () => import("@/views/System/Role"),
          meta: { title: "角色管理" }
        },
        {
          path: '/user',
          component: () => import("@/views/System/User"),
          meta: { title: "管理员管理" }
        },
        {
          path: '/goods',
          component: () => import("@/views/Shop/Goods"),
          meta: { title: "商品管理" }
        },
        {
          path: '/category',
          component: () => import("@/views/Shop/Category"),
          meta: { title: "商品分类管理" }
        },
        {
          path: '/specs',
          component: () => import("@/views/Shop/Specs"),
          meta: { title: "商品规格属性" }
        },
        {
          path: '/member',
          component: () => import("@/views/Shop/Member"),
          meta: { title: "会员管理" }
        },
        {
          path: '/banner',
          component: () => import("@/views/Shop/Banner"),
          meta: { title: "轮播图管理" }
        },
        {
          path: '/seckill',
          component: () => import("@/views/Shop/Seckill"),
          meta: { title: "秒杀管理" }
        },
        {
          path: '/articlelist',
          component: () => import("@/views/Article/ArticleList"),
          meta: { title: "文章列表" }
        },
        {
          path: '/articlesort',
          component: () => import("@/views/Article/ArticleSort"),
          meta: { title: "文章分类管理" }
        },
        {
          path: '/houselist',
          component: () => import("@/views/House/HouseList"),
          meta: { title: "店铺列表" }
        },
        {
          path: '/housereview',
          component: () => import("@/views/House/HouseReview"),
          meta: { title: "店铺审核" }
        },
        {
          path: '/newsfeedback',
          component: () => import("@/views/News/NewsFeedback"),
          meta: { title: "意见反馈" }
        },
        {
          path: '/newslist',
          component: () => import("@/views/News/NewsList"),
          meta: { title: "浏览列表" }
        },
        {
          path: '/paydeploy',
          component: () => import("@/views/Pay/PayDeploy"),
          meta: { title: "账户管理" }
        },
        {
          path: '/paymethods',
          component: () => import("@/views/Pay/PayMethods"),
          meta: { title: "支付方式" }
        },
        {
          path: '/paysetting',
          component: () => import("@/views/Pay/PaySetting"),
          meta: { title: "支付配置" }
        },
        {
          path: '/picturead',
          component: () => import("@/views/Picture/PictureAd"),
          meta: { title: "广告管理" }
        },
        {
          path: '/picturesort',
          component: () => import("@/views/Picture/PictureSort"),
          meta: { title: "图片分类" }
        },
        {
          path: '/transactioninfo',
          component: () => import("@/views/Transaction/TransactionInfo"),
          meta: { title: "交易信息" }
        },
        {
          path: '/amount',
          component: () => import("@/views/Transaction/Amount"),
          meta: { title: "交易金额" }
        },
        {
          path: '/management',
          component: () => import("@/views/Transaction/Management"),
          meta: { title: "订单管理" }
        },
        {
          path: '/order',
          component: () => import("@/views/Transaction/Order"),
          meta: { title: "交易订单" }
        },
        {
          path: '/orderprocessing',
          component: () => import("@/views/Transaction/OrderProcessing"),
          meta: { title: "订单处理" }
        },
        {
          path: '/refund',
          component: () => import("@/views/Transaction/Refund"),
          meta: { title: "退款管理" }
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

export default router;
