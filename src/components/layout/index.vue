<template>
  <div class="layout">
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}">
      <div class="logo-wrapper">logo</div>
      <el-menu
        background-color="#424f63"
        text-color="#fff"
        active-text-color="#65cea7"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path"
      >
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item
              class="menu-item"
              v-for="(sub_item, sub_index) in item.children"
              :index="sub_item.path"
              :key="sub_index"
            >
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i
          class="el-icon-s-fold"
          :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)', fontSize: '20px'}"
        ></i>
      </div>
      <div class="title float-left">物流管理1701 后台管理系统</div>
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            style="padding: 0 15px;"
          >
            <div class="dropdown-content el-dropdown-link">
              <i class="el-icon-user-solid icon"></i>
              <span class="text">{{user.name || user.username}}</span>
            </div>
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{user.username}}</el-dropdown-item>
              <el-dropdown-item command="b">{{user.name}}</el-dropdown-item>
              <el-dropdown-item command="b">{{user.type.name}}</el-dropdown-item>
            </el-dropdown-menu> -->
          </el-dropdown>
        </li>
        <li class="menu-item">
          <i class="el-icon-question icon"></i>
        </li>
        <li class="menu-item" @click="exit">
          <i class="el-icon-switch-button icon" style="font-weight: 900;"></i>
        </li>
      </ul>
    </div>
    <div
      class="content-wrapper"
      ref="content-wrapper"
      :style="{left: this.isCollapsed?'64px':'200px'}"
    >
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <footer class="footer">
      copyright@2019.10.14
    </footer>
  </div>
</template>
<script>
import { sessionStorage } from "../../assets/js/storage/index";

export default {
  created() {
    this.checkAuth();
  },
  data() {
    return {
      sider_menu_data: [
        {
          path: "/home",
          title: "首页",
          icon: "el-icon-s-home"
        },
        {
          path: "/tables",
          title: "表格管理",
          icon: "el-icon-s-operation",
          children: [
            { path: "/tables/basic", title: "基本表格" },
            { path: "/tables/sort", title: "排序表格" },
            { path: "/tables/filter", title: "筛选表格" }
          ]
        },
        {
          path: "/charts",
          title: "图表管理",
          icon: "el-icon-s-data",
          children: [
            { path: "/charts/bar", title: "柱状图" },
            { path: "/charts/line", title: "折线图" },
            { path: "/charts/pie", title: "饼图" }
          ]
        },
        {
          path: "/photo",
          title: "相册管理",
          icon: "el-icon-tickets",
          children: [
            { path: "/photo/index", title: "相册管理" },
            { path: "/photo/add", title: "添加相册" }
          ]
        },
        {
          path: "/announcement",
          title: "公告管理",
          icon: "el-icon-tickets",
          children: [
            { path: "/announcement/addAnnouncement", title: "添加公告" },
            { path: "/announcement/announcementList", title: "公告列表" }
          ]
        },
        {
          path: "/system/index",
          title: "系统管理",
          icon: "el-icon-s-tools"
        },
        {
          path: "/user/index",
          title: "用户管理",
          icon: "el-icon-s-custom"
        },
        {
          path: "/authorization/index",
          title: "权限管理",
          icon: "el-icon-info"
        },
        {
          path: "/log/index",
          title: "操作日志",
          icon: "el-icon-s-opportunity"
        },
        {
          path: "/test/index",
          title: "测试",
          icon: "el-icon-c-scale-to-original"
        }
      ],
      isCollapsed: false,
      adminMenuShow: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    checkAuth() {
      let token = this.$store.state.token || sessionStorage.getItem("token");
      if (!token) {
        this.$router.replace("/login");
      } else {
        this.getUser();
      }
    },
    getUser() {
      let User = {
        id: sessionStorage.getItem('token'),
        username: JSON.parse(window.localStorage.getItem('userInfo')).name,
        name: JSON.parse(window.localStorage.getItem('userInfo')).name
        // type: {
        //   code: 0,
        //   name: "超级管理员"
        // }
      };

      this.$store.commit("SET_USER", User);
    },
    handleCommand(command) {
      console.log(command);
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
    exit() {
      this.$confirm("即将退出系统登陆，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("SET_TOKEN", "");
          this.$store.commit("SET_USER", null);
          this.$router.replace({ path: "/login" });
        })
        .catch(() => {
          return false;
        });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/styles/variable";

.siderbar-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $siderbarWidth;
  z-index: 11;
  background-color: $siderbarBackgroundColor;
  transition: all 0.3s ease-in-out;

  .logo-wrapper {
    height: 40px;
    line-height: 40px;
    padding: 16px 0;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    color: #65cea7;
  }

  .menu-wrapper {
    position: absolute;
    top: 72px;
    bottom: 0;
    width: 100%;
    border-right: none;
    transition: all 0.3s ease-in-out;

    &:not(.el-menu--collapse) {
      overflow-y: auto;
      overflow-x: hidden;
    }

    i {
      color: #ffffff;
    }

    .menu-item {
      &.is-active,
      &:hover {
        background-color: #353f4f !important;
        color: #65cea7 !important;

        i {
          color: #65cea7 !important;
        }
      }
    }

    .el-submenu__title:hover {
      color: #65cea7 !important;

      i {
        color: #65cea7 !important;
      }
    }

    .el-submenu,
    .el-menu-item {
      width: 100%;
    }
  }
}

.topbar-wrapper {
  position: fixed;
  left: $siderbarWidth;
  right: 0;
  top: 0;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  height: $topbarHeight;
  line-height: $topbarHeight;
  padding: 0 24px 0 0;
  background-color: $topbarBackgroundColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-in-out;
  z-index: 12;

  .menu-collapse-wrapper {
    height: 100%;
    width: 48px;
    text-align: center;
    cursor: pointer;

    i {
      transition: all 0.3s ease-in-out;
    }
  }
  .float-right {
    position: absolute;
    right: 20px;
    top: 0;
    /* padding: 0; */
    margin: 0;
  }
  .title {
    height: 100%;
    font-weight: bold;
  }

  .menu-list {
    .menu-item {
      position: relative;
      float: left;
      padding: 0 15px;
      min-width: 45px;
      height: 48px;
      text-align: center;
      font-size: 0px;

      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }

      .icon {
        vertical-align: middle;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        margin-left: 4px;
        font-size: 16px;
      }
    }
  }
}

.content-wrapper {
  position: fixed;
  left: $siderbarWidth;
  right: 0;
  top: $topbarHeight;
  bottom: 40px;
  padding: 16px;
  overflow: auto;
  transition: all 0.3s ease-in-out;

  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.footer{
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  // left: 200px;
  left: 0;
  right: 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  // background-color: rgb(66, 79, 99);
  // color: #fff;
}
</style>
