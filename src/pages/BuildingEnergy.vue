<template>
  <card>
  <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-default">
            
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <h1 class="display-2 text-white">Building Energy</h1>
                </div>
                <div>
                  <textarea v-model="token" class="form-control" id="exampleFormControlTextareaToken" rows="5" placeholder="Token"></textarea>
                </div>
                <p></p>
                <div class="btn-wrapper row justify-content-center align-items-center">
                    <base-button tag="a"
                                    class="mb-3 mb-sm-0 text-white"
                                    type="default"
                                    @click="onSubmit">
                        Get Consumption
                    </base-button>
                </div>
                <p></p>
                <div>
                  <textarea v-model="consumption" class="form-control" id="exampleFormControlTextareaToken" rows="10" placeholder="Consumption" disabled></textarea>
                </div>
            </div>
        </div>
    </section>
    </card>
</template>
<script>
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';

export default {
  components: {
  },
  data() {
    return { 
      token: '',
      consumption: ''
    };
  },
  methods: {
    getConsumption() {
      const path = `http://192.168.2.171:5000/building/energy?token=${this.token}`
      axios.get(path)
        .then((res) => {
          this.consumption = JSON.stringify(res.data.consumption, null, 2);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onSubmit(e) {
      e.preventDefault();
      this.getConsumption();
    }
  }
};
</script>
