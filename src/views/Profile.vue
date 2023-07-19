<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-4">
          <profile-card />
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Profile</p>
                <argon-button color="success" size="sm" class="ms-auto">Settings</argon-button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Username</label>
                  <input class="form-control"  type="text" value="" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Email address</label>
                  <input class="form-control"  type="email" value="" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">First name</label>
                  <input class="form-control" type="text" value="" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Last name</label>
                  <input class="form-control"  type="text" value="" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Address</label>
                  <input class="form-control"  type="text" value=""/>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">City</label>
                  <input class="form-control"  type="text" value="" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Country</label>
                  <input class="form-control"  type="text" value="" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Postal code</label>
                  <input class="form-control"  type="text" value="" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">About me</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">About me</label>
                  <input class="form-control"  type="text" value=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false
    };
  },
  components: { ProfileCard, ArgonButton },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  }
};
</script>
