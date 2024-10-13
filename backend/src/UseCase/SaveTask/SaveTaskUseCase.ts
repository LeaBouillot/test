import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor() {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */

    return null;
  }
}
import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { PrismaService } from '../../PrismaService'; // Assurez-vous que le chemin est correct

@Injectable()
export default class SaveTaskUseCase implements UseCase<Task, [SaveTaskDto]> {
  constructor(private readonly prisma: PrismaService) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validation du DTO
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Le nom de la tâche est requis.');
    }

    try {
      // Sauvegarde de la tâche dans la base de données
      const task = await this.prisma.task.create({
        data: {
          name: dto.name,
          createdAt: new Date(),
        },
      });
      return task;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la tâche:', error);
      throw new Error('Une erreur est survenue lors de la sauvegarde de la tâche.');
    }
  }
}
