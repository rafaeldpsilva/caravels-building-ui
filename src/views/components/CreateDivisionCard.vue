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
      <create-division-modal :show="isModalVisible" :iot="selectedIot" @close="isModalVisible = false"></create-division-modal>
    </Teleport>
  </template>
  
  <script>
  import CreateDivisionModal from './CreateDivisionModal.vue';

  export default {
    name: "create-division-card",
    components: {
      CreateDivisionModal
    },
    data() {
      return {
        isModalVisible: false,
      }
    },
    methods: {
      showChargeModal() {
        this.isModalVisible = true;
      },
    }
  };
  </script>