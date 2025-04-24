import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from 'src/shared/constants/enum';
import { ISoftDelete } from 'src/shared/constants/interface';
import { SoftDeleteDefaultFieldsPlugin } from 'src/shared/plugins/soft-delete-default.plugin';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: Boolean, default: false })
  is_archived: boolean;

  @Prop({ type: String, enum: Status, default: Status.ACTIVE })
  status: Status;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(SoftDeleteDefaultFieldsPlugin);

export type CategoryDocument = Category & Document & ISoftDelete;
