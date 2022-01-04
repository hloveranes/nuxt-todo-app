<template>
  <v-card class="pa-3">
    <v-card-title>Todo App</v-card-title>

    <v-row dense no-gutters>
      <v-btn
        class="mr-3"
        :class="{'transparent black--text': status}"
        rounded
        @click="changeStatus"
        dark>
        Pending
      </v-btn>
      <v-btn
        rounded
        :class="{'transparent black--text': !status}"
        @click="changeStatus"
        dark>
        completed
      </v-btn>
    </v-row>

    <v-container class="px-0" fluid :key="key">
      <v-checkbox 
        class="ma-0 pa-0"
        v-for="todo in filterByStatus()"
        :key="todo.id"
        v-model="todo.is_done"
        @change="updateTask(todo.id, todo.is_done)"
        :label="`${todo.name}`"
      ></v-checkbox>
    </v-container>

    <v-col align="center" justify="center">
      <v-row>
        <v-text-field 
          class="mr-3"
          label="Add an item here" 
          solo
          v-model="newItem"></v-text-field>
        <v-btn rounded color="primary" @click="addItem">
          Add Item
        </v-btn>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'TodoCard',
  data () {
    return {
      todoList: [],
      newItem: '',
      status: false,
      key: 0,
    }
  },
  computed: {
    todos() {
       this.todoList = this.$store.getters['getAllTodos'];
      return this.todoList;
    }
  },
  methods: {
    updateTask(id, lastVal) {
      let tmpTodo = this.todoList.find(item => item.id === id);
      tmpTodo.is_done = lastVal;
      this.$store.dispatch('updateTodos', tmpTodo);
    },
    addItem() {
      if(this.newItem.length){
        let taskLen = this.todoList.length + 1;

        let task = {
          id: taskLen,
          name: this.newItem,
          is_done: false,
        }
        this.todoList.push(task)
        this.$store.commit('commitResetTodo', this.todoList);
        this.$store.dispatch('updateTodos', this.todoList);
      }
      this.newItem = '';
    },
    changeStatus() {
      this.status = !this.status;
    },
    filterByStatus() {
      return this.todoList.filter(item => item.is_done == this.status);
    },
  },
  watch: {
    todoList() {
      this.key += 1;
    }
  }
}
</script>


<style>
.v-messages {
  min-height: 0;
}
</style>