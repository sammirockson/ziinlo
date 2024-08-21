import axios from "axios";
import { BASE_URL } from '@/config'
import _ from 'lodash'


class APIService {

    init() {
        console.log("APIService has been initiated")
    }

    async saveDesc(cardDesc, card_id) {
        var params = {
            card_id: card_id,
            cardDesc: cardDesc
        }
        await this.baseRequest("board/addDueDescriptionToCard", params)
    }


    async getBoardMembers(params) {
        let path = "board/getBoardMembers"
        return await this.baseRequest(path, params)
    }

    async login(params) {
        let path = "auth/login"
        return await this.baseRequest(path, params)
    }

    async signUp(params) {
        let path = "auth/signUp"
        return await this.baseRequest(path, params)
    }

    async getBoardById(params) {
        let path = "board/byId"
        return await this.baseRequest(path, params)
    }

    async confirmInvitation(params) {
        let path = "board/addInviteeToBoard"
        return await this.baseRequest(path, params)
    }

    async getInvitationInfo(params) {
        let path = "board/getInviteInfo"
        return await this.baseRequest(path, params)
    }


    async baseRequest(path, params) {
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        let options = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(params)
        }
        let fullURL = BASE_URL + path
        try {
            const response = await fetch(fullURL, options)
            let jsonResp = await response.json()
            return jsonResp.resp
        } catch (err) {
            console.log("error occurred: ", err)
        }
    }
}






export default new APIService()
