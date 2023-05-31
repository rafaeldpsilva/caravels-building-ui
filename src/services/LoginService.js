import axios from 'axios';

const LoginService = {
  communityOperatorURL : 'http://192.168.2.171:5000',
  community : "community",
  
  async getCommunity() {
    const path = this.communityOperatorURL+this.community
    try{
      const response = await axios.get(path);
      return response.data.community
    }catch(error) {
      console.error(error);
    };
  },
};

export default LoginService;
