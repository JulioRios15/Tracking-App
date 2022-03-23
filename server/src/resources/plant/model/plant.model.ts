import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";

@index({plantId: 1, plantCode: 1})
@modelOptions({schemaOptions: {id: false}})
export class Plant {

    @prop({ unique: true, required: true})
    _id: number;

    @prop({ required: true, minlength: 1 ,maxlength: 64, trim: true })
    description: string;

    @prop({ required: true, minlength: 1 ,maxlength: 64, trim: true })
    country: string;

    @prop({ required: true, minlength: 1 ,maxlength: 64, trim: true })
    state: string;

    @prop({ required: true, minlength: 4 ,maxlength: 4, trim: true })
    icaoCode: string;

    @prop({ required: true, minlength: 3, maxlength: 4, trim: true })
    airportCode: string;
}

const PlantModel = getModelForClass(Plant, {
    schemaOptions: {
        timestamps: true,
    }
});

export default PlantModel;