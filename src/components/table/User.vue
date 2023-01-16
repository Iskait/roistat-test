<script setup lang="ts">
import type { Utilizer } from "@/types/table/Utilizer";

defineProps<Utilizer>();
</script>

<template>
  <table class="flex flex-col">
    <tr class="flex items-center">
      <td class="flex-[0_0_35%] text-center p-2">
        {{ name }}
      </td>
      <td class="flex-[0_0_65%] text-center p-2">
        {{ phone }}
      </td>
    </tr>

    <div class="translate-x-1">
      <User
        v-for="user in subordinates"
        :key="user.id"
        :name="user.name"
        :phone="user.phone"
        :chief="user.chief"
        :id="user.id"
        :subordinates="user.subordinates"
      />
    </div>
  </table>
</template>
