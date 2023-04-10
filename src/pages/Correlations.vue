<template>
    <div class="row">
      <div class="col-12">
        <card>
          <div>
            <img src= "https://i.imgur.com/ogNySka.png"/>
          </div>
          <!-- <p></p>
          <div class="btn-wrapper row justify-content-center align-items-center">
              <base-button tag="a"
                              class="mb-3 mb-sm-0 text-white"
                              type="default"
                              @click="onSubmit">
                  Get Correlations
              </base-button>
          </div> -->
          <p></p>
        </card>
      </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
  components: {
  },
  data() {
    return {
      img: "",
      flag: false
    };
  },
  methods: {
    getImage() {
      const path = `http://192.168.2.171:5000/getcorrelations`
      axios.get(path)
        .then((res) => {
          this.img = res.data;
          console.log(res.data)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSubmit(e) {
      e.preventDefault();
      this.flag = true;
    }
  }
};
</script>
<style>
</style>
