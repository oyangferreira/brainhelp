import axios from 'axios';

const api = axios.create({
  baseURL: "https://brainhelp-c0b63-default-rtdb.firebaseio.com/"
});

const addUser = (user, id) => {
  return api.put("/user/" + id + ".json", user); 
}

const getUser = (id) => {
  return api.get("/user/" + id + ".json")
  .then((usuario)=>{
    alert(usuario)
  })
}
const loadUsers = () =>{
  return api.get("/user.json").then(r=>{
    const list = []
    for (var i=1; i< r.data.length; i++) { 
      list.push(r.data[i])
    }
    return list 
  })
}

export { addUser, getUser, loadUsers };