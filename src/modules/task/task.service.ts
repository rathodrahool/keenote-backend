import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { ApiResponseHelper } from 'src/shared/response/api-response.helper';
import { ERROR, SUCCESS } from 'src/shared/constants/constant';
import {
  IApiResponse,
  IFindAllQuery,
  IPaginatedResponse,
} from 'src/shared/types/response.type';
import { paginate } from 'src/util/paginate';
import { TaskType } from 'src/shared/constants/enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<IApiResponse<Task>> {
    const { task_type, target, duration } = createTaskDto;

    if (task_type === TaskType.YES_NO && !target) {
      throw new BadRequestException('target is required');
    }

    if (task_type === TaskType.TIME_BASED && !duration) {
      throw new BadRequestException('duration is required');
    }

    const task = new this.taskModel(createTaskDto);
    const result = await task.save();
    return ApiResponseHelper.success(result, SUCCESS.RECORD_ADDED('task'));
  }

  async findAll(query: IFindAllQuery): Promise<IPaginatedResponse<Task[]>> {
    const tasks = await paginate<Task>(
      this.taskModel,
      query,
      ['name', 'task_frequency', 'task_type', 'category'],
      ['category'],
    );

    return ApiResponseHelper.paginate(
      tasks.results,
      tasks.total,
      tasks.page,
      query.limit,
      SUCCESS.RECORD_FETCHED('category'),
    );
  }

  async findOne(id: string): Promise<IApiResponse<Task>> {
    const task = await this.taskModel.findById(id).populate('category');
    if (!task) {
      throw new BadRequestException(ERROR.RECORD_NOT_FOUND('task'));
    }
    return ApiResponseHelper.success(task, SUCCESS.RECORD_FOUND('task'));
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<IApiResponse<[]>> {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
    return ApiResponseHelper.success(
      [],
      task ? SUCCESS.RECORD_UPDATED('task') : SUCCESS.RECORD_NOT_FOUND('task'),
    );
  }

  async remove(id: string): Promise<IApiResponse<[]>> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new BadRequestException(ERROR.RECORD_NOT_FOUND('task'));
    }
    await task.softDelete();
    return ApiResponseHelper.success([], SUCCESS.RECORD_DELETED('task'));
  }
}
