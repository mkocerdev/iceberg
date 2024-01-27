<template>
  <div class="sidebar">
    <div class="sidebar__logo w-full">
      <img
        src="https://assets-global.website-files.com/644a6ceae40c04757d3fddbf/645e277376ae297d29a9d340_Iceberg-Digital.svg"
        width="150"
      />
    </div>

    <div class="sidebar__nav">
      <nav class="sidebar-nav">
        <ul class="sidebar-nav__list">
          <li class="sidebar-nav__item">
            <NuxtLink class="sidebar-nav__link" to="/"> Ana Sayfa </NuxtLink>
          </li>
          <li class="sidebar-nav__item">
            <NuxtLink class="sidebar-nav__link" to="/appointments">
              Randevular
            </NuxtLink>
          </li>
          <li class="sidebar-nav__item">
            <NuxtLink class="sidebar-nav__link" to="/appointments/create">
              Randevu Oluştur
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 2rem 1rem;
  &__logo {
    text-align: left;
  }
  &__nav {
    margin-top: 4rem;
  }
}
.sidebar-nav {
  display: flex;
  flex-flow: column wrap;
  &__list {
    padding: 0;
    list-style: none;
  }
  &__item {
    text-align: left;
    margin-bottom: 1rem;
  }
  &__link {
    display: inline-block;
    text-decoration: none;
    color: #cdcdcd;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid transparent;
    &.nuxt-link-exact-active.nuxt-link-active {
      color: #ededed;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
