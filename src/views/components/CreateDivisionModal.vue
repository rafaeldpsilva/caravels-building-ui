<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @keydown.esc="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h3 name="header">Create New Division</h3>
        </div>

        <div class="modal-body">
          <div>
            <div class="row">
              <div class="pb-3">
                <label for="example-text-input" class="form-control-label">Division Name</label>
                <input class="form-control" type="text" placeholder="Name" v-model="name" />
              </div>
              <label for="example-text-input" class="form-control-label">Which IoT's do you want to add?</label>
              <div>
                <VueMultiselect v-model="iots_selected" :options="iotsList" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Pick at least one" label="name"
                  track-by="name" :preselect-first="false" />
              </div>
            </div>

          </div>
        </div>

        <div class="text-center">
          <argon-button class="m-2" variant="gradient" color="primary" size="sm"
            @click="createDivision()">Create</argon-button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>

import ArgonButton from "@/components/ArgonButton.vue";
import VueMultiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.css";
import IotService from '../../services/IotService.js';
//import DivisionsService from '../../services/DivisionsService.js';

export default {
  name: "create-division-modal-dialog",
  props: {
    show: Boolean
  },
  components: {
    ArgonButton,
    VueMultiselect,
  },
  data() {
    return {
      newDivision: null,
      name: null,
      iots_selected: null,
      iotsList: [],
    }
  },
  async mounted() {
    this.iotsList = await IotService.getIots(localStorage.getItem("uri"), localStorage.getItem("token"))
  },
  methods: {
    async createDivision() {
      this.newDivision = {
          title: this.name,
          value: '0 W',
      }
      this.$emit("add-division", this.newDivision);
      //await DivisionsService.postCreateDivision(localStorage.getItem("uri"), localStorage.getItem("token"), this.name, this.iots_selected)
      this.$emit('close')
    },
  },
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 850px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px; /* Adjust the value to control the roundness of the corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}</style>