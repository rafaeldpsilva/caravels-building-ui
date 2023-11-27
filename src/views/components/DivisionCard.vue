<template>
    <div class="mb-4 card card-background card-background-mask-primary move-on-hover align-items-start">
      <div
        class="full-background"
        style="
          background-image: url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80');
        "
      ></div>
      <div class="p-3 card-body">
        <div class="d-flex">
          <div :class="contentClass">
            <div class="numbers">
              <p class="mb-0 text-sm text-uppercase font-weight-bold" :class="titleColor">{{ title }}</p>
              <h5 class="font-weight-bolder" :class="valueColor">{{ value }}</h5>
              <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
              {{detail}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "division-card",
    data() {
      return {
        reverseDirection: "flex-row-reverse justify-content-between",
      };
    },
    props: {
      directionReverse: Boolean,
      title: {
        type: String,
        required: true,
      },
      detail: {
        type: String,
        required: true,
      },
      titleColor: {
        type: String,
      },
      value: {
        required: true,
      },
      valueColor: {
        type: String,
      },
      percentage: String,
      contentClass: {
        type: String,
      },
    },
  };
  </script>
  