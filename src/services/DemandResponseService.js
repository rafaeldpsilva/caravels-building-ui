import axios from 'axios';

const DemandResponseService = {
  communityOperatorURL : 'http://192.168.2.171:5000',
  get_unanswered_invitations : "/invitation/unanswered",
  get_answered_invitations : "/invitation/answered",
  answer_invitation : "/invitation/answer",
  
  async getUnansweredInvitations(url, token) {
    const path = url+this.get_unanswered_invitations+'?token='+token
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async getAnsweredInvitations(url, token) {
    const path = url+this.get_answered_invitations+'?token='+token
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async postAnsweredInvitation(url, token, event_time, response) {
    let payload = {
        "event_time": event_time,
        "response": response
    }
    const path = url+this.answer_invitation+'?token='+token
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
};

export default DemandResponseService;
