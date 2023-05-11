<template>
    <div class="card h-100 mb-4">
      <div class="card-header pb-0 px-3">
        <div class="row">
          <div class="col-md-6">
            <h6 class="mb-0">Your Demand Response Event Invites</h6>
          </div>
          <div class="col-md-6 d-flex justify-content-end align-items-center">
            <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
            <small>23 - 30 May 2023</small>
          </div>
        </div>
      </div>
      <div class="card-body pt-4 p-3">
        <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Pending</h6>
        <ul class="list-group">
          <li
            class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
          >
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">IoT_3, IoT_2</h6>
                <span class="text-xs">27 March 2020, at 12:30 PM</span>
              </div>
            </div>
            <div class="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">93 kwh | 7 %</div>
            <div class="d-flex align-items-center justify-content-center">
              <argon-button
                color="success"
                variant="outline"
                size="sm"
                class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
                <i class="fas fa-check" aria-hidden="true"></i>
              </argon-button>
              <argon-button
                color="danger"
                variant="outline"
                size="sm"
                class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
                <i class="fas fa-times" aria-hidden="true"></i>
              </argon-button>
            </div>
          </li>
          <li
            class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
          >
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">IoT_3</h6>
                <span class="text-xs">27 March 2020, at 04:30 AM</span>
              </div>
            </div>
            <div class="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">175 kwh | 12 %</div>
            <div class="d-flex align-items-center justify-content-center">
              <argon-button
                color="success"
                variant="outline"
                size="sm"
                class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
                <i class="fas fa-check" aria-hidden="true"></i>
              </argon-button>
              <argon-button
                color="danger"
                variant="outline"
                size="sm"
                class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
                <i class="fas fa-times" aria-hidden="true"></i>
              </argon-button>
            </div>
          </li>
        </ul>
        <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">Concluded</h6>
        <ul class="list-group">
          <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
            <div class="d-flex align-items-center">
              <div class="mb-0 me-3 d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                <i class="fas fa-times" aria-hidden="true"></i>
              </div>
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">IoT_1</h6>
                <span class="text-xs">26 March 2020, at 13:45 PM</span>
              </div>
            </div>
            <div
              class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold"
            >35 kwh | 3 %</div>
          </li>
          <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
            <div class="d-flex align-items-center">
              <div class="mb-0 me-3 d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                <i class="fas fa-check" aria-hidden="true"></i>
              </div>
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">IoT_3, IoT_1</h6>
                <span class="text-xs">26 March 2020, at 12:30 PM</span>
              </div>
            </div>
            <div
              class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold"
            >575 kwh | 30 %</div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import ArgonButton from "@/components/ArgonButton.vue";
  
  export default {
    name: "demand-response-events-card",
    components: {
      ArgonButton,
    },
  };
  </script>
  