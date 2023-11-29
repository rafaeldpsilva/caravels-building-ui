<template>
    <div class="card bg-gradient-dark">
      <div class="card-body">
        <button class="btn btn-sm btn-white mb-0 w-100" @click="showCreateDivisionModal()">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <create-division-modal :show="isModalVisible" @addNewDivision="addNewDivision" @close="isModalVisible = false"></create-division-modal>
    </Teleport>
  </template>
  
  <script>
  import CreateDivisionModal from './CreateDivisionModal.vue';

  export default {
    name: "create-division-card",
    components: {
      CreateDivisionModal
    },
    props: {
      newDivision: {
        required: true,
      },
    },
    data() {
      return {
        isModalVisible: false,
      }
    },
    methods: {
      addNewDivision(newDivision){
        this.$emit('add-division', newDivision)
      },
      showCreateDivisionModal() {
        this.isModalVisible = true;
      },
    }
  };
  </script>