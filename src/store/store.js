import { reactive } from "vue";

export const store = reactive({
    client_id: localStorage.getItem("client_id"),
    client_secret: localStorage.getItem("client_secret"),
    client_token: localStorage.getItem("client_token"),
    self_account: null
});