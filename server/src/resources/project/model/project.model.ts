import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";

@index({plantId: 1, plantCode: 1})
@modelOptions({schemaOptions: {id: false}})
export class Project {

    @prop({ unique: true, required: true, minlength: 10 ,maxlength: 10,})
    _id: number;

    @prop({ required: true })
    tailNumber: string;

    @prop({ required: true })
    serialNumber: string;

    public get salesOrder() {
        return this._id;
    }
}

const ProjectModel = getModelForClass(Project, {
    schemaOptions: {
        timestamps: true,
        toJSON:{ virtuals: true },
        toObject: { virtuals: true }
    }
});

export default ProjectModel;