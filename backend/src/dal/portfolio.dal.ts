import {Portfolio} from "../model/portfolio.character.schema";

export const findMyPortfolio = async (userId: string) => Portfolio.findById({userid: userId});
export const updateMyPortfolio = async (userId: string, portfolioId: any) => Portfolio.findByIdAndUpdate({
    userid: userId,
    _id: portfolioId
}, {new: true, upsert: true});
export const deleteMyPortfolio = async (userId: string) => Portfolio.findByIdAndDelete({userid: userId});

