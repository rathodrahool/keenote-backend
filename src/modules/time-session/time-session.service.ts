import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { UpdateTimeSessionDto } from './dto/update-time-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TimeSession, TimeSessionDocument } from './entities/time-session.entity';
import { Model } from 'mongoose';
import { ApiResponseHelper } from 'src/shared/response/api-response.helper';
import { ERROR, SUCCESS } from 'src/shared/constants/constant';
import { IApiResponse, IFindAllQuery, IPaginatedResponse } from 'src/shared/types/response.type';
import { paginate } from 'src/util/paginate';

@Injectable()
export class TimeSessionService {
  constructor(
    @InjectModel(TimeSession.name)
    private readonly timeSessionModel: Model<TimeSessionDocument>,
  ) {}

  async create(createTimeSessionDto: CreateTimeSessionDto): Promise<IApiResponse<TimeSession>> {
    const timeSession = new this.timeSessionModel(createTimeSessionDto);
    const result = await timeSession.save();
    return ApiResponseHelper.created(result, SUCCESS.RECORD_ADDED('time session'));
  }

  async findAll(query: IFindAllQuery): Promise<IPaginatedResponse<TimeSession[]>> {
    const timeSessions = await paginate<TimeSession>(this.timeSessionModel, query, [
      'task',
      'started_at',
      'ended_at',
      'duration_minutes',
      'completed_target',
    ],['task']);

    return ApiResponseHelper.paginate(
      timeSessions.results,
      timeSessions.total,
      timeSessions.page,
      query.limit,
      SUCCESS.RECORD_FETCHED('time session'),
    );
  }

  async findOne(id: string): Promise<IApiResponse<TimeSession>> {
    const timeSession = await this.timeSessionModel.findById(id);
    if (!timeSession) {
      throw new BadRequestException(ERROR.RECORD_NOT_FOUND('time session'));
    }

    return ApiResponseHelper.success(
      timeSession,
      SUCCESS.RECORD_FOUND('time session'),
    );
  }

  async update(
    id: string,
    updateTimeSessionDto: UpdateTimeSessionDto,
  ): Promise<IApiResponse<[]>> {
    const timeSession = await this.timeSessionModel.findByIdAndUpdate(
      id,
      updateTimeSessionDto,
      {
        new: true,
      },
    );

    return ApiResponseHelper.success(
      [],
      timeSession
        ? SUCCESS.RECORD_UPDATED('time session')
        : SUCCESS.RECORD_NOT_FOUND('time session'),
    );
  }

  async remove(id: string): Promise<IApiResponse<[]>> {
    const timeSession = await this.timeSessionModel.findById(id);
    if (!timeSession) {
      throw new BadRequestException(ERROR.RECORD_NOT_FOUND('time session'));
    }
    await timeSession.softDelete();
    return ApiResponseHelper.success([], SUCCESS.RECORD_DELETED('time session'));
  }
}
