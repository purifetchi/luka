<script setup>

import Login from "@/components/Login.vue";
import { store } from "@/store/store.js";
import UserInformation from "@/components/UserInformation.vue";
import {FwbDropdown, FwbListGroup, FwbListGroupItem} from "flowbite-vue";

</script>

<template>
  <h1>Luka: The Toki Frontend</h1>
  <p>Something will be here, I promise.</p>
  <br>
  <fwb-dropdown text="Click me" placement="top">
    <fwb-list-group>
      <fwb-list-group-item>Item #1</fwb-list-group-item>
      <fwb-list-group-item>Item #2</fwb-list-group-item>
      <fwb-list-group-item>Item #3</fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
  <Login v-if="store.client_token === null"/>
  <UserInformation v-else />
</template>

<style scoped>

</style>