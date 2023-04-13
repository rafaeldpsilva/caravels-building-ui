<template>
  <div class="card pb-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Generate Token</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="success" size="sm" variant="outline">Generate</argon-button>
        </div>
      </div>
    </div>
    <div class="card-body p-3 pb-0 mb-0">      
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Name</label>
          <input class="form-control" type="text" value="Name" />
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">List of Resources</label>
          <select v-model="resources_selected">
            <option v-for="option in resources" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Data Aggregation</label>
          <select v-model="data_selected">
            <option v-for="option in data_agg" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Time Aggregation</label>
          <select v-model="time_selected">
            <option v-for="option in time_agg" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Embargo Period</label>
            <input class="form-control" type="text" value="Embargo Period" />
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Expiration Date</label>                  
          <VueDatePicker v-model="date"></VueDatePicker>
        </div>
      </div>
      <hr class="horizontal dark" />
      <p class="text-uppercase text-sm">Token</p>
      <div class="row">
        <div class="col-md-12">
          <input class="form-control" type="text" value="Name" />
        </div>
      </div>          
    </div>
  </div>
</template>
<script>
import ArgonButton from "@/components/ArgonButton.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "generate-token-card",
  components: {
    VueDatePicker,
    ArgonButton,
  },
  data() {
    return {
      resources_selected: '5',
      resources: [
        { text: 'IoT_1', value: '1' },
        { text: 'IoT_2', value: '2' },
        { text: 'IoT_3', value: '3' }
      ],
      data_selected: '5',
      data_agg: [
        { text: '5 min', value: '5' },
        { text: '10 min', value: '10' },
        { text: '15 min', value: '15' }
      ],
      time_selected: '5',
      time_agg: [
        { text: '5 min', value: '5' },
        { text: '10 min', value: '10' },
        { text: '15 min', value: '15' }
      ],
    }
  }
};
</script>
