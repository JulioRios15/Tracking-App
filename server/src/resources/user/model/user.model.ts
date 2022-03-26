import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
    pre,
    DocumentType,
    index,
  } from "@typegoose/typegoose";
import argon2 from "argon2";
import { Plant } from "../../plant/model/plant.model";
import logger from "../../../utils/logger";

export const privateFields = [
  "password",
  "__v",
];

// Hash Passwords
@pre<User>("save", async function(){
    if (!this.isModified("password")) {
        return;
      }

      const hash = await argon2.hash(this.password);
      this.password = hash;  
      return;
})

@pre<User>(/^find/, function(next){
  this.populate("plant");
  next();
})

@index({ email: 1 })
@modelOptions(
  { schemaOptions: {
      id: false,
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true},
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class User {

    @prop({ required: true, minlength: 1 ,maxlength: 64, trim: true })
    firstName: string;

    @prop({ required: true, minlength: 1 ,maxlength: 64, trim: true })
    lastName: string;

    @prop({ unique: true, required: true, trim: true })
    email: string;

    @prop({ required: true, minlength: 8 ,maxlength: 256, trim: true })
    password: string;

    @prop({ })
    companyPhone: string;

    @prop({ })
    officePhone: string;

    @prop({ })
    birthday: Date;

    @prop({ ref: () => Plant, type: () => Number, required: true })
    plant: Ref<Plant>;

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword);
          } catch (e) {
            logger.error(e, "Could not validate password");
            return false;
          }
    }

}


const UserModel = getModelForClass(User);

export default UserModel;