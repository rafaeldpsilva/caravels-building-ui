<template>
    <div class="card h-100 mb-4">
      <div class="card-header pb-0 px-3">
        <div class="row">
          <div class="col-md-6">
            <h6 class="mb-0">Your Demand Response Event Invitations</h6>
          </div>
          <div class="col-md-6 d-flex justify-content-end align-items-center">
            <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
            <small>23 - 30 May 2023</small>
          </div>
        </div>
      </div>
      <div class="card-body pt-4 p-3">
        <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3" v-if="this.pendingInvitationsList.length != 0">Pending</h6>
        <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3" v-else>No Pending Invitations</h6>
        <ul class="list-group">
          <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
            v-for="invite in pendingInvitationsList" :key="invite.event_time">
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">{{invite.iots}}</h6>
                <span class="text-xs">{{invite.event_time}}</span>
              </div>
            </div>
            <div class="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">{{invite.load_kwh}} kwh | {{invite.load_percentage}} %</div>
            <div class="d-flex align-items-center justify-content-center">
              <argon-button
                @click="acceptInvite(index, invite.event_time)"
                color="success"
                variant="outline"
                size="sm"
                class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
                <i class="fas fa-check" aria-hidden="true"></i>
              </argon-button>
              <argon-button
                @click="declineInvite(index, invite.event_time)"
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
          <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
            v-for="invite in answeredInvitationsList" :key="invite.event_time">
            <div class="d-flex align-items-center">
              <div class="mb-0 me-3 d-flex align-items-center text-gradient text-sm font-weight-bold" :class="invite.response == 'YES' ? 'text-success' : 'text-danger'">
                <i class="fas " :class="invite.response == 'YES' ? 'fa-check' : 'fa-times'" aria-hidden="true"></i>
              </div>
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark text-sm">{{invite.iots}}</h6>
                <span class="text-xs">{{invite.event_time}}</span>
              </div>
            </div>
            <div class="d-flex align-items-center text-gradient text-sm font-weight-bold" :class="invite.response == 'YES' ? 'text-success' : 'text-danger'">{{invite.load_kwh}} kwh | {{invite.load_percentage}} %</div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import ArgonButton from "@/components/ArgonButton.vue";
  import DemandResponseService from "../../services/DemandResponseService.js"

  export default {
    name: "demand-response-events-card",
    async created() {
      await this.loadPendingInvitations();
      await this.loadAnsweredInvitations();
    },
    data() {
      return {
        pendingInvitationsList: [],
        answeredInvitationsList:[]
      }
    },
    methods: {
      async acceptInvite(index, event_time) {
        console.log(event_time)
        let invite = this.pendingInvitationsList.at(index)
        this.answeredInvitationsList.unshift({ "icon": "fa-check", "color": "text-success", "iots": invite.iots, "event_time": invite.event_time, "load_kwh": invite.load_kwh, "load_percentage": invite.load_percentage},)
        await DemandResponseService.postAnsweredInvitation(event_time, "YES");
        this.pendingInvitationsList.splice(index, 1)
      },
      async declineInvite(index, event_time) {
        console.log(event_time)
        let invite = this.pendingInvitationsList.at(index)
        this.answeredInvitationsList.unshift({ "icon": "fa-times", "color": "text-danger", "iots": invite.iots, "event_time": invite.event_time, "load_kwh": invite.load_kwh, "load_percentage": invite.load_percentage},)
        await DemandResponseService.postAnsweredInvitation(event_time, "NO");
        this.pendingInvitationsList.splice(index, 1)
      },
      async loadPendingInvitations (){
        this.pendingInvitationsList = await DemandResponseService.getUnansweredInvitations()
      },
      async loadAnsweredInvitations (){
        //TODO COLOR E ICON
        this.answeredInvitationsList = await DemandResponseService.getAnsweredInvitations()
      }
    },
    components: {
      ArgonButton,
    },
  };
  </script>
  