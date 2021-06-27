import axios from "axios";
import { GET_DATA, GET_DATA_FAILURE } from "./types";

export const getData = () => async (dispatch) => {

    console.log("getData Action");

    try {
        // const res = await axios.get("http://localhost:8080/getData");
        const res = await axios.get("/getData");
        console.log(res.data);

        dispatch({
            type: GET_DATA,
            payload: res.data
        })

    } catch (err) {

        console.log(err)
        dispatch({
            type: GET_DATA_FAILURE,
            payload: {}
        })

    }

}