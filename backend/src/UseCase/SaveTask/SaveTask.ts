import { Injectable } from '@nestjs/common';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    // Logique pour sauvegarder la tâche
    return await this.taskRepository.save(dto);
  }
}
