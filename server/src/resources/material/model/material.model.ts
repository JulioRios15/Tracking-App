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
import { Project } from "../../project/model/project.model";
import logger from "../../../utils/logger";

export const privateFields = [
  "__v",
];

@pre<Material>(/^find/, function(next){
  this.populate("project");
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
export class Material {

    @prop({ required: true, trim: true })
    partNumber: string;

    @prop({ required: true, trim: true })
    materialDescription: string;

    @prop({ required: true, trim: true })
    workCenter: string;

    @prop({ required: true, minlength: 10, maxlength: 10 })
    order: number;

    @prop({ required: true, trim: true })
    orderDescription: string;

    @prop({ minlength: 8, maxlength: 8 })
    purchaseOrder: number;

    @prop({  })
    eta: Date;

    @prop({  })
    awb: string;

    @prop({ default: false })
    priority: boolean;

    @prop({ })
    orderedDate: Date;

    @prop({required: true })
    quantity: number;

    @prop({ })
    neededBy: Date;

    @prop({ ref: () => Project, type: () => Number, required: true })
    project: Ref<Project>;
}


const MaterialModel = getModelForClass(Material);

export default MaterialModel;