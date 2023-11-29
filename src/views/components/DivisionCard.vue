<template>
  <div class="mb-4 card card-background card-background-mask-primary move-on-hover align-items-between
  ">
    <!--div class="full-background" style="
          background-image: url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80');
        "></div-->
    <div class="p-3 card-body w-100">

      <div class="d-flex justify-content-between">
        <div class="numbers">
          <p class="mb-0 text-sm text-uppercase font-weight-bold">{{ division.name }}</p>
          <h5 class="font-weight-bolder">{{ iotsList }}</h5>
        </div>
        <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true" aria-expanded="false"
          @click="removeDivision()">
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
  name: "division-card",
  data() {
    return {
      iotsList: ""
    };
  },
  mounted(){
    this.iotsToString()
  },
  beforeUpdate() {
    this.iotsToString()
  },
  props: {
    directionReverse: Boolean,
    division: {
      required: true,
    },
    index: {
      required: true,
    }
  },
  methods: {
    removeDivision() {
      this.$emit("remove-division", this.index);
    },
    iotsToString() {
      var string = "";
      for (var i = 0; i < this.division.iots.length && i < 3; i++) {
        string += this.division.iots[i] + ", "
      }
      if (this.division.iots.length >= 3) {
        this.iotsList = string + "..."
      } else {
        this.iotsList = string.slice(0, string.length - 2)
      }
    }
  },
};
</script>
<style>
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
  