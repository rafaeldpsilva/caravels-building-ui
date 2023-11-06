<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12">
        <batteries-table />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <div class="card z-index-2 mb-4">
          <div class="card">
              <div class="pb-0 card-header mb-0">
                  <div class="row">
                    <h6 class="col-md-6">Batteries Overview</h6>
                    <!--div class="col-md-6 d-flex justify-content-end align-items-center">
                      <div class="form-check form-switch">
                        <input @click="intervalChange()" v-model="second" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault">{{ interval + unit }}</label>
                      </div>
                    </div-->
                </div>
              </div>
              <div class="p-3 card-body">
                <batteries-graph-hour />
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BatteriesTable from "./components/BatteriesTable.vue";
import BatteriesGraphHour from "./components/BatteriesGraphHour.vue";

export default {
  name: "tables",
  components: {
    BatteriesTable,
    BatteriesGraphHour
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
        trip: {
          title: "Today's Trip",
          desc: "145 KM",
          classIcon: "text-dark ni ni-money-coins",
        },
        health: {
          title: "Battery Health",
          desc: "99 %",
          classIcon: "text-dark ni ni-controller ",
        },
        speed: {
          title: "Average Speed",
          desc: "56 Km/h",
          classIcon: "text-dark ni ni-delivery-fast",
        },
        volume: {
          title: "Music Volume",
          desc: "15/100",
          classIcon: "text-dark ni ni-note-03",
        },
      },
    };
  },
};
</script>
