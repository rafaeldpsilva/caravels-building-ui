<template>
  <div class="card card-profile">
    <img src="../../assets/img/isep.jpg" alt="Image placeholder" class="card-img-top" />
    <div class="row justify-content-center">
      <div class="col-4 col-lg-4 order-lg-2">
        <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
          <a href="javascript:;">
            <img
              src="../../assets/img/gecad-profile.jpg"
              class="rounded-circle img-fluid border border-2 border-white"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
      <div class="d-flex justify-content-between">
        <a href="javascript:;" class="btn btn-sm btn-info mb-0 d-none d-lg-block">Connect</a>
        <a href="javascript:;" class="btn btn-sm btn-info mb-0 d-block d-lg-none">
          <i class="ni ni-collection"></i>
        </a>
        <a
          href="javascript:;"
          class="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block"
        >Message</a>
        <a href="javascript:;" class="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none">
          <i class="ni ni-email-83"></i>
        </a>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="text-center mt-4">
        <h5>
          {{ profile.name }}
        </h5>
        <div class="h6 font-weight-300">
          <i class="ni location_pin mr-2"></i>Porto, Portugal
        </div>
        <div class="h6 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>GECAD
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>Polytechnic Institute of Porto
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-card",
  data() {
    return {
      profile: {
        name:"Building1"
      }
    }
  },
  mounted() {
    this.profile.name = localStorage.getItem("name");
  },
};
</script>