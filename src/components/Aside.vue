<script setup>
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const items = [
  {
    name: 'menu.main',
    icon: 'home',
    link: '/dashboard'
  },
  {
    name: 'menu.users',
    icon: 'users',
    link: '/users'
  },
  {
    name: 'menu.category',
    icon: 'category',
    link: '/category'
  },
  {
    name: 'menu.book',
    icon: 'book',
    link: '/books'
  },
  {
    name: 'menu.return',
    icon: 'return',
    link: '/returns'
  },
  {
    name: 'menu.borrow',
    icon: 'borrow',
    link: '/borrows'
  }
]

const route = useRoute()
const linkActive = ref(route.path)

watch(route, (value, oldValue, onCleanup) => {
  linkActive.value = value.path
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.reload()
}
</script>

<template>
  <div class="aside">
    <ul class="aside-list">
      <li class="aside__item"
          v-for="item in items">
        <router-link :to="item.link" class="flex" :class="linkActive.includes(item.link) ? 'active' : ''">
          <span :class="'icon-' + item.icon " class="icon"></span>
          {{ $t(item.name) }}
        </router-link>
      </li>
      <li class="aside__item" @click="logout">
        <a>
          <span class="icon icon-logout"></span>
          {{ $t('menu.logout') }}
        </a>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_form.scss";

.aside {
  padding: 20px 0;
  background: var(--gray-300);
  border-right: 1px solid var(--gray-400);
  background: var(--white);
  height: 100vh;
  width: 299px;
  position: fixed;
  top: 0;

  &-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0 15px;

  }

  &__item {
    padding: 10px 20px;
    border-radius: 8px;
    transition: .4s all;


    &:has(.active) {
      background: var(--primary);

      .icon {
        background: var(--white);
      }
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--black);
      text-decoration: none;
      cursor: pointer;

      &.active {
        color: white;
        .icon {
          background-color: white;
        }
      }

      .icon {
        background-color: var(--black);
      }
    }
  }
}
</style>
