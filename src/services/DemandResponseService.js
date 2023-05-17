import axios from 'axios';

const DemandResponseService = {
  communityOperatorURL : 'http://192.168.2.171:5000',
  baseURL : 'http://192.168.2.171:5006',
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8',
  get_unanswered_invitations : "/invitation/unanswered",
  get_answered_invitations : "/invitation/answered",
  answer_invitation : "/invitation/answer",
  
  async getUnansweredInvitations() {
    const path = this.baseURL+this.get_unanswered_invitations+'?token='+this.token
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async getAnsweredInvitations() {
    const path = this.baseURL+this.get_answered_invitations+'?token='+this.token
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async postAnsweredInvitation(event_time, response) {
    let payload = {
        "event_time": event_time,
        "response": response
    }
    const path = this.baseURL+this.answer_invitation+'?token='+this.token
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
};

export default DemandResponseService;
