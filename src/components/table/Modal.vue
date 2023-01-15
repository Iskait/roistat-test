<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import { IMaskDirective as vIMaskDirective } from "vue-imask";
import { Utilizer } from "@/types/table/Utilizer";
import { v4 as uuidv4 } from "uuid";

/** Маска для ввода телефона */
const mask = { mask: "{+7} 000 000-00-00" };

const form = ref<Utilizer>({
  name: "",
  phone: "",
  id: uuidv4(),
  chief: null,
  subordinates: [],
});

const users = inject<Ref<Utilizer[]>>("users");

function flatten(users: Utilizer[] | undefined): Utilizer[] {
  return (
    users?.reduce(
      (acc, val) =>
        acc.concat(
          val.subordinates.length
            ? // ? [val.name, ...flatten(val.subordinates)]
              // : val.name
              [val, ...flatten(val.subordinates)]
            : val
        ),
      [] as Utilizer[]
    ) || []
  );
}

const allUsers = flatten(users?.value);

const showModal = inject<Ref<boolean>>("showModal");

const emit = defineEmits<{
  (event: "save-user", form: Utilizer): void;
}>();

function addUser(form: Utilizer) {
  console.log(form);
  if (form.chief === null) {
    users?.value.push(form);
  } else {
    const selectedChief = allUsers.find((user) => user.id === form.chief);
    selectedChief?.subordinates.push(form);
  }
  localStorage.setItem("users", JSON.stringify(users?.value));
}

function handleForm() {
  addUser(form.value);
  if (showModal) {
    showModal.value = false;
  }
}
</script>

<template>
  <form
    class="flex flex-col p-4 gap-y-6 w-96 border border-black"
    @submit.prevent="handleForm"
  >
    <div class="flex justify-between">
      <h1>Добавление пользователя</h1>
      <button type="button" @click="showModal = false">X</button>
    </div>

    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between gap-x-3">
        <label for="name">Имя</label>
        <input required id="name" type="text" v-model="form.name" />
      </div>
      <div class="flex justify-between gap-x-3">
        <label for="phone">Телефон</label>
        <input
          v-i-mask-directive="mask"
          placeholder="+7 999 123-45-67"
          id="phone"
          required
          type="text"
          v-model="form.phone"
          maxlength="16"
        />
      </div>
      <div v-if="allUsers?.length" class="flex justify-between gap-x-3">
        <label for="chief">Начальник</label>
        <select
          name="chief"
          id="chief"
          class="w-52"
          @change="form.chief = ($event.target as HTMLOptionElement).value"
        >
          <option value="#"></option>
          <option v-for="user in allUsers" :value="user.id" :key="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>
    <button
      type="submit"
      class="border border-black rounded-full px-3 py-1 self-start"
    >
      Сохранить
    </button>
  </form>
</template>
