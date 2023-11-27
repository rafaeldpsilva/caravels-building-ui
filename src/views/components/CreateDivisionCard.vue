<template>
    <div class="card bg-gradient-dark">
      <div class="card-body">
        <button class="btn btn-sm btn-white mb-0 w-100" @click="showChargeModal()">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <create-division-modal :show="isModalVisible" :newDivision="newDivision" @addDivision="addNewDivision" @close="isModalVisible = false"></create-division-modal>
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
        console.log(newDivision)
        this.$emit('add-division', newDivision)
      },
      showChargeModal() {
        this.isModalVisible = true;
      },
    }
  };
  </script>