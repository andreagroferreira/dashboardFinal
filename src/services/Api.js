import axios from "axios";
import {getToken} from '@/utils'
const apiClient = axios.create({
  baseURL: 'https://foxendigital.pt/api/',
  withCredentials: false,
});

export default {
  Login(userName,password){
    return apiClient.post('auth/login',{
      email: userName,
      password: password
    })
  },
  Me(token)
  {
    return apiClient.get('dashboard/me',{
      headers: {
        Authorization: getToken()
      }
    })
  },
  Logout(userId){
    return apiClient.post('auth/logout',{
      user_id: userId
    },{
      headers: {
        Authorization: getToken()
      }
    })
  },
  ResumeResultDash(userId) {
    return apiClient.get(`/dashboard/resumeResults/${userId}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  GetListLeads(offset,limit,perPage,sort,service_id) {
    return apiClient.get(`/dashboard/leads/${offset}/${limit}/${perPage}/${sort}/${service_id}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  SearchList(offset,limit,perPage,service_id,term)
  {
    return apiClient.get(`/dashboard/searchLead/${offset}/${limit}/${perPage}/${service_id}/${term}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  CreateLead(leadData){
    return apiClient.post('/dashboard/createLead',{...leadData},{
      headers: {
        Authorization: getToken()
      }
    })
  },
  GetPlatforms(){
    return apiClient.get('/dashboard/platforms',{
      headers: {
        Authorization: getToken()
      }
    })
  },
  GetLead(id)
  {
    return apiClient.get(`/dashboard/lead/${id}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  UpdateLead(id,payload){

    return apiClient.patch(`/dashboard/updateLead/${id}`,{...payload},{
      headers: {
        Authorization: getToken()
      }
    })

  },
  DestroyLead(leads)
  {
    return apiClient.post('/dashboard/destroy',{
        id: leads
    },{
      headers: {
        Authorization: getToken()
      }
    })
  },
  ValidateIBAN(iban)
  {
   return  axios.get(`https://openiban.com/validate/${iban}`)
  },
  GetPlans()
  {
    return apiClient.get('/dashboard/plans',{
      headers: {
        Authorization: getToken()
      }
    })
  },
  ConvertLead(payload){
    return apiClient.post('/dashboard/convertLead',{
      ...payload
    },{
      headers: {
        Authorization: getToken()
      }
    })
  },
  GetListClients(offset,limit,perPage,sort,service_id) {
    return apiClient.get(`/dashboard/clients/${offset}/${limit}/${perPage}/${sort}/${service_id}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  SearchListClients(offset,limit,perPage,service_id,term)
  {
    return apiClient.get(`/dashboard/searchClient/${offset}/${limit}/${perPage}/${service_id}/${term}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },
  DestroyClients(clients)
  {
    return apiClient.post('/dashboard/destroyClient',{
        id: clients
    },{
      headers: {
        Authorization: getToken()
      }
    })
  },
  GetClient(id)
  {
    return apiClient.get(`/dashboard/client/${id}`,{
      headers: {
        Authorization: getToken()
      }
    })
  },

}
