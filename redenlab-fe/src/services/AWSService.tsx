import {getOnServer, postOnServerWithForm} from "../helpers/AxiosHelper";
import AWSContent from "../models/AWSContent";
import {plainToInstance} from "class-transformer";

class AWSService {
    getAwsData() : Promise<AWSContent[]> {
        return getOnServer('listObjects').then(response => {
            return plainToInstance(AWSContent, response.data)
        })
    }

}

export default new AWSService()