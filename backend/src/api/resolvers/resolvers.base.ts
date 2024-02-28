import {contextType} from "../../config/context.type";
import {getCampaignsAsGameMaster, getCampaignsAsPlayer} from "../../dal/campaign.dal";
import {findMyCharacterToPortfolio, findUserById} from "../../dal/user.dal";
import {exceptionHandler} from "../utils/exception.handler";
import {respondWithStatus} from "../utils/response.status";

export const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
        me: async (_: any, __: any, context: contextType) => {
            try {
                console.log('context: ', context['user']);
                if (!context.user) return respondWithStatus(401, 'Unauthorized', false, null, context);
                const user = await findUserById(context.user);
                const campaignsAsGm = await getCampaignsAsGameMaster(context.user);
                const campaignsAsPlayer = await getCampaignsAsPlayer(context.user);
                const portfolio = await findMyCharacterToPortfolio(context.user);
                const me = {
                    ...user,
                    portfolio,
                    campaignsAsGm,
                    campaignsAsPlayer,
                };
                return respondWithStatus(200, 'Me', true, me, context);
            } catch (e) {
                return exceptionHandler('me', e, context);
            }
        }
    },
    Mutation: {
        hello: (arg: any) => `${arg}`,
    }
};
