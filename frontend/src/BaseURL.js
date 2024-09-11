import axios from "axios";

const demandAxios = axios.create({
    baseURL: "http://localhost:8070/",
});


export default demandAxios;