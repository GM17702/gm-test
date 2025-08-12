import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';
import { Status, Priority } from 'generated/prisma';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task Creation.' })
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: Status })
  @ApiQuery({ name: 'priority', required: false, type: String, example: 'RED,YELLOW', description: 'Comma-separated list of priorities (e.g., RED,YELLOW)' })
  @ApiQuery({ name: 'text', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'fromDate', required: false, type: String, example: '2025-08-01T00:00:00.000Z' })
  @ApiQuery({ name: 'toDate', required: false, type: String, example: '2025-08-31T23:59:59.999Z' })
  @ApiResponse({ status: 200, description: 'List of tasks.' })
  list(@Query() query: ListTasksDto) {
    return this.taskService.list(query);
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 200, description: 'Single Task Retrieval.' })
  one(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 200, description: 'Success' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 200, description: 'Success' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}

