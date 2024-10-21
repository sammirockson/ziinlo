import axios from "axios";
import { BASE_URL } from '@/config'
import _ from 'lodash'


class APIService {

    init() {}

    async addComment(params) {
        let path = "comment/add"
        return await this.baseRequest(path, params)
    }

    async getComments(params) {
        let path = "comment/byCardId"
        return await this.baseRequest(path, params)
    }


    async saveDesc(cardDesc, card_id) {
      var params = {
        card_id: card_id,
        cardDesc: cardDesc
      }
      await this.baseRequest("board/addDescriptionToCard", params)
    }

    async deleteCheckList(params) {
        let path = "board/deleteCheckList"
        return await this.baseRequest(path, params)
    }

    async deleteCard(params) {
        let path = "board/deleteCard"
        return await this.baseRequest(path, params)
    }

    async deleteList(params) {
        let path = "board/deleteList"
        return await this.baseRequest(path, params)
    }

    async updateChecklist(params) {
        let path = "board/updateCardChecklist"
        return await this.baseRequest(path, params)
    }

    async createNewChecklist(params) {
        let path = "board/addCheckList"
        return await this.baseRequest(path, params)
    }
    
    async updateSubscription(params) {
        let path = "auth/updateSubscription"
        return await this.baseRequest(path, params)
    }

    async getCardAssignees(params) {
        let path = "board/getCardAssignees"
        return await this.baseRequest(path, params)
    }

    async updateAssignees(params) {
        let path = "board/updateCardAssignees"
        return await this.baseRequest(path, params)
    }

    async updateDueDate(params) {
        let path = "board/addDueDateToCard"
        return await this.baseRequest(path, params)
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

    async updateViewCount(params) {
        let path = "board/updateViewCount"
        return await this.baseRequest(path, params)
    }

    async getInvitationInfo(params) {
        let path = "board/getInviteInfo"
        return await this.baseRequest(path, params)
    }

    async updateCardMembership(params) {
        let path = "board/updateCardMembership"
        return await this.baseRequest(path, params)
    }

    
    async baseRequest(path, params) {
        try {
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
            const response = await fetch(fullURL, options)
            let jsonResp = await response.json()
            console.log('api resp: ', jsonResp.resp)
            return jsonResp.resp
        } catch (err) {
            console.log("error occurred: ", err)
        }
    }
}






export default new APIService()
