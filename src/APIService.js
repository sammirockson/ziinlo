import axios from "axios";
import { BASE_URL } from '@/config'

export async function saveDesc(cardDesc, card_id) {
    var params = {
        card_id: card_id,
        cardDesc: cardDesc
    }
    var fullURL = BASE_URL + "board/addDueDescriptionToCard"
    await axios.post(fullURL, params).then((response) => {
        if (response.data != null) {
            let data = response.data
            if (data.statusCode == 200) {
                let resp = data.resp
                console.log("card description update: ", resp)
                return resp
            }
        }
    })
}