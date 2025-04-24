import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Task } from 'src/modules/task/entities/task.entity';
import { ISoftDelete } from 'src/shared/constants/interface';
import { SoftDeleteDefaultFieldsPlugin } from 'src/shared/plugins/soft-delete-default.plugin';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class TimeSession {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task', required: true })
  task: Task | MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: false })
  started_at: number;

  @Prop({ type: Number, required: false })
  ended_at: number;

  @Prop({ type: Number, required: false })
  duration_minutes: number;

  @Prop({ type: Number, required: false })
  completed_target: number;
}

export const TimeSessionSchema = SchemaFactory.createForClass(TimeSession);
TimeSessionSchema.plugin(SoftDeleteDefaultFieldsPlugin);

export type TimeSessionDocument = TimeSession & Document & ISoftDelete;