import axios from 'axios';

const url = ""
const DemandResponseService = {
  get_unanswered_invitations : "invitation/unanswered",
  get_answered_invitations : "invitation/answered",
  answer_invitation : "invitation/answer",
  answer_auto : "invitation/auto",
  
  async getUnansweredInvitations() {
    const path = url+this.get_unanswered_invitations
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async getAnsweredInvitations() {
    const path = url+this.get_answered_invitations
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
    const path = url+this.answer_invitation
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getAutoAccept() {
    const path = url+this.answer_auto
    try{
      const response = await axios.get(path);      
      return response.data['auto_answer']      
    }catch(error) {
      console.error(error);
    };
  },
  async postAutoAccept(auto_answer) {
    let payload = {
        "auto_answer": auto_answer,
    }
    const path = url+this.answer_auto
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
};

export default DemandResponseService;
