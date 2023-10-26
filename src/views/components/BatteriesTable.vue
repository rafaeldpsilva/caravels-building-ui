<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Projects table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Capacity</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Charge
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="battery in batteryList"  :key="battery.name">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img
                      src="../../assets/img/icons/refrigerator.png"
                      class="avatar avatar-sm rounded-circle me-2"
                      alt="{{battery.name}}"
                    />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{battery.name}}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{battery.capacity}} kWh</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{battery.status}}</span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">{{battery.charge}}%</span>
                  <div>
                    <div class="progress">
                      <div v-if="battery.status=='charging'" class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="{{battery.charge}}" aria-valuemin="0"
                        aria-valuemax="100" :style="'width: '+battery.charge+'%;'"></div>
                      <div v-else-if="battery.status=='discharging'" class="progress-bar bg-gradient-danger" role="progressbar" aria-valuenow="{{battery.charge}}" aria-valuemin="0"
                        aria-valuemax="100" :style="'width: '+battery.charge+'%;'"></div>
                      <div v-else class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="{{battery.charge}}" aria-valuemin="0"
                        aria-valuemax="100" :style="'width: '+battery.charge+'%;'"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                <button class="btn btn-link text-secondary mb-0">
                  <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</div></template>

<script>
import BatteryService from '../../services/BatteryService.js';

export default {
  name: "batteries-table",
  data(){
    return {
      batteryList: [ 
        {
          logo:"../../assets/img/small-logos/logo-spotify.svg",
          name: "spotify",
          capacity: 2500,
          status: "charging",
          charge: 60
        },
        {
          logo:"../../assets/img/small-logos/logo-invision.svg",
          name: "Invision",
          capacity: 5000,
          status: "full",
          charge: "100"
        },
        {
          logo:"../../assets/img/small-logos/logo-jira.svg",
          name: "Jira",
          capacity: 3400,
          status: "discharging",
          charge: "30"
        },
        {
          logo:"../../assets/img/small-logos/logo-slack.svg",
          name: "Slack",
          capacity: 1000,
          status: "full",
          charge: "100"
        },
        {
          logo:"https://demos.creative-tim.com/argon-dashboard/assets/img/small-logos/logo-webdev.svg",
          name: "Webdev",
          capacity: 14000,
          status: "charging",
          charge: "80"
        },
        {
          logo:"../../assets/img/small-logos/logo-xd.svg",
          name: "Adobe",
          capacity: 2300,
          status: "full",
          charge: "100"
        }
      ]
    }
  },
  methods: {
    async loadBatteryList (){
      this.batteryList = await BatteryService.getBatteries(localStorage.getItem("uri"),localStorage.getItem("token"))
      localStorage.setItem("batteries", JSON.stringify(this.batteryList))
    },
  }
}
</script>
