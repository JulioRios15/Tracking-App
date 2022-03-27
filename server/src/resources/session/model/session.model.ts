import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../../user/model/user.model";

export class Session {
  @prop({required: true, ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;

  @prop({required: true})
  userAgent: string;

  @prop({required: true})
  ipAddress: string;

}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SessionModel;
