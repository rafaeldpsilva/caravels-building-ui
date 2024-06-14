<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <iots-table />
      </div>
    </div>
  </div>
</template>

<script>
import IotsTable from "./components/Iot/IotsTable.vue";

export default {
  name: "iots",
  components: {
    IotsTable
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
      },
    };
  },
};
</script>
