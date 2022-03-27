import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel, {Session} from "../model/session.model";
import { User, privateFields } from "../../user/model/user.model";
import { signJwt } from "../../../utils/jwt";


export async function createSession(userId: string, userAgent: string, ipAddress: string){
    try {
        const newSession = await SessionModel.create({user: userId, userAgent, ipAddress});
        return newSession;
    } catch (e: any) {
         throw new Error(e.message);
    }
}

export async function findSessionById(sessionId: string){
    return await SessionModel.findById(sessionId);
}

export async function findUserValidSessions(userId: string){
    return await SessionModel.find({user: userId, valid: true});
}

export async function updateSessionById(sessionId: string, update: Partial<Session>){
    return await SessionModel.findByIdAndUpdate(sessionId, update, {new: true, runValidators: true});
}

export async function deleteSessionById(sessionId: string) {
    return await SessionModel.findOneAndDelete({_id: sessionId});
}

export async function disableSessionById(sessionId: string) {
    return await updateSessionById(sessionId, { valid: false });
}

export function signRefreshToken(sessionId: string){

    const refreshToken = signJwt(
        { sessionId: sessionId },
        "refreshTokenPrivateKey",
        { expiresIn: "1y" }
    );

    return refreshToken;
}

export function signAccessToken(user: DocumentType<User>, sessionId: string){
    const payload = {
        ...omit(user.toJSON(), privateFields),
        sessionId
    }

    const accessToken = signJwt(payload, "accessTokenPrivateKey", { expiresIn: "15m" });

    return accessToken;
}