import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTask from '../UseCase/SaveTask/SaveTask';
import UpdateTask from '../UseCase/UpdateTask/UpdateTask'; // Assure-toi que le cas d'utilisation pour mettre à jour existe
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    const saveTaskUseCase = this.useCaseFactory.create(SaveTask);
    return await (await saveTaskUseCase).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    const updateTaskUseCase = this.useCaseFactory.create(UpdateTask);
    return await (await updateTaskUseCase).handle(Number(id), dto); // Passe l'ID et les données mises à jour
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
