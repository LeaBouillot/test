import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Task, [SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {

    if (!dto.name) {
      throw new BadRequestException('Task name is requered');
    } 

    try {
      return await this.taskRepository.save(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}