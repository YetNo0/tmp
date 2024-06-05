<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu
    class="bg-sky-500 p-5"
  >
    <NavigationMenuList
      class="space-x-5"
    >
        <NavigationMenuItem>
        <NavigationMenuTrigger
          class="bg-sky-600"
        >Практические работы</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div
            class="md:w-[400px] lg:w-[500px] h-32 flex flex-col m-3 space-y-5"
          >
            <RouterLink to="/pr_no_5">Практическая работа №5</RouterLink>
            <RouterLink to="/pr_no_6">Практическая работа №6</RouterLink>
            <RouterLink to="/pr_no_7">Практическая работа №7</RouterLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="bg-sky-600">Лабораторные работы</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="md:w-[1000px] lg:w-[800px] h-[500px] flex flex-col m-3 space-y-5">
            <RouterLink to="/lr_no_5">Лабораторная работа №5</RouterLink>
            <RouterLink to="/lr_no_6">Лабораторная работа №6</RouterLink>
            <RouterLink to="/lr_no_7">Лабораторная работа №7</RouterLink>
            <RouterLink to="/lr_no_8">Лабораторная работа №8</RouterLink>
            <RouterLink to="/lr_no_9">Лабораторная работа №9</RouterLink>
            <RouterLink to="/lr_no_10">Лабораторная работа №10</RouterLink>
            <RouterLink to="/lr_no_11">Лабораторная работа №11</RouterLink>
            <RouterLink to="/lr_no_12">Лабораторная работа №12</RouterLink>
            <RouterLink to="/lr_no_13">Лабораторная работа №13</RouterLink>
          </div>  
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>
          Коржов Елисей Иванович 22-К-КБ1 5 вар
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  <div class="bg-sky-100">
    <RouterView />
  </div>
</template>