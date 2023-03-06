<script setup>
const items = [
  {
    name: 'Главная',
    icon: 'home',
    link: '/dashboard'
  },
  {
    name: 'Пользователи',
    icon: 'users',
    link: '/users'
  },
  {
    name: 'Категории',
    icon: 'category',
    link: '/category'
  },
  {
    name: 'Книги',
    icon: 'book',
    link: '/books'
  }
]

function logout() {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <div class="aside">
    <ul class="aside-list">
      <li class="aside__item"
          v-for="item in items">
        <router-link :to="item.link" class="flex">
          <span :class="'icon-' + item.icon " class="icon"></span>
          {{ item.name }}
        </router-link>
      </li>
      <li class="aside__item" @click="logout">
        <a>
          <span class="icon icon-logout"></span>
          Выйти
        </a>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.aside {
  padding: 20px 0;
  background: $gray-300;
  border-right: 1px solid $gray-400;
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


    &:has(.router-link-active) {
      background: $green;

      .icon {
        background: $white;
      }
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      color: $black;
      text-decoration: none;
      cursor: pointer;

      &.router-link-active {
        color: $white;
      }
    }
  }
}
</style>
