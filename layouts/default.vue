<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      setting:null,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-folder',
          title: 'Blog Group',
          to: '/dashboard/BlogGroup'
        },
        {
          icon: 'mdi-file-word',
          title: 'Article List',
          to: '/dashboard/Blog'
        },
        {
          icon: 'mdi-bookmark-plus',
          title: 'New Article',
          to: '/dashboard/Blog/Edit'
        },
        {
          icon: 'mdi-folder-image',
          title: 'Gallery',
          to: '/dashboard/Gallery'
        },
        
          {
          icon: 'mdi-folder-image',
          title: 'Request',
          to: '/dashboard/Request'
        },
       
      
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/dashboard/Logout'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Admin Tiss Express 1.0'
    }
  },

  mounted() {

  }
}
</script>
