<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @keydown.esc="close()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="d-flex justify-content-between w-100">
            <h3 name="header">{{ division.name }}</h3>
            <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true" aria-expanded="false"
              @click="close()">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div class="modal-body">
          <div class="config">
            <h6>AC Status Model</h6>
            <div class="row">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Outdoor Temperature:</label>
                <div>
                  <VueMultiselect v-model="outdoorTemperature" :options="iots_selected" :multiple="false"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick one"
                    label="name" track-by="name" :preselect-first="false" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Temperature:</label>
                <div>
                  <VueMultiselect v-model="temperature" :options="iots_selected" :multiple="false" :close-on-select="false"
                    :clear-on-select="false" :preserve-search="true" placeholder="Pick one" label="name" track-by="name"
                    :preselect-first="false" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Humidity:</label>
                <div>
                  <VueMultiselect v-model="humidity" :options="iots_selected" :multiple="false" :close-on-select="false"
                    :clear-on-select="false" :preserve-search="true" placeholder="Pick one" label="name" track-by="name"
                    :preselect-first="false" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Light:</label>
                <div>
                  <VueMultiselect v-model="light" :options="iots_selected" :multiple="false" :close-on-select="false"
                    :clear-on-select="false" :preserve-search="true" placeholder="Pick one" label="name" track-by="name"
                    :preselect-first="false" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h6>IoT's</h6>
            <div class="row">


              <label for="example-text-input" class="form-control-label">Room's IoT:</label>
              <div>
                <VueMultiselect v-model="iots_selected" :options="iotsList" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Pick at least one" label="name"
                  track-by="name" :preselect-first="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <argon-button :disabled="isUpdateButtonDisabled" class="m-2" variant="gradient" color="primary" size="sm"
            @click="updateDivision()">Update</argon-button>
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
import DivisionsService from '../../services/DivisionsService.js';

export default {
  name: "division-modal-dialog",
  props: {
    show: Boolean,
    division: {
      required: true,
    }
  },
  components: {
    ArgonButton,
    VueMultiselect,
  },
  data() {
    return {
      newDivision: null,
      iots_selected: [],
      iotsList: [],
      outdoorTemperature: "",
      temperature: "",
      humidity: "",
      light: "",
    }
  },
  async mounted() {
    this.iotsList = await IotService.getIots(localStorage.getItem("uri"), localStorage.getItem("token"))
    for (var i = 0; i < this.iotsList.length; i++) {
      for (var j = 0; j < this.division.iots.length; j++) {
        if (this.iotsList[i]['name'] == this.division.iots[j]) {
          this.iots_selected.push(this.iotsList[i])
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.clear()
    },
    async createDivision() {
      await DivisionsService.postSetConfigACStatus()
    },
  },
  computed: {
    isUpdateButtonDisabled: function () {
      return !this.name || !this.iots_selected || this.iots_selected.length === 0;
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
  border-radius: 10px;
  /* Adjust the value to control the roundness of the corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: block !important;
  padding-bottom: 0;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.config {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
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
}

/* Custom CSS for transparent button */
.btn-transparent {
  background-color: transparent;
  border: none;
  color: #000 !important;
  box-shadow: none !important;
  padding-left: 3.25rem !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
  /* Adjust the color as needed */
}

/* Style for three dots */
.three-dots {
  font-size: 1.5rem;
  /* Adjust the size as needed */
}

/* Hide the default dropdown button arrow */
.btn-transparent::after {
  content: none;
}
</style>
  