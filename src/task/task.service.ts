import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';
import { Prisma, Status, Priority } from 'generated/prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const payload: Prisma.TaskCreateInput = {
      name: dto.name,
      dueDate: dto.dueDate,
      status: dto.status ?? 'PENDING',
      priority: dto.priority ?? 'BLUE',
      isActive: typeof dto.isActive === 'boolean' ? dto.isActive : false,
    };

    return this.prisma.task.create({ data: payload });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.ensureExists(id);
    const data: Prisma.TaskUpdateInput = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.dueDate !== undefined) data.dueDate = dto.dueDate;
    if (dto.status !== undefined) data.status = dto.status as Status;
    if (dto.priority !== undefined) data.priority = dto.priority as Priority;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.task.delete({ where: { id } });
  }

  async list(params: ListTasksDto) {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 10;
    const skip = (page - 1) * perPage;
  
    const where: Prisma.TaskWhereInput = {};
  
    if (params.status) {
      where.status = params.status as Status;
    }
  
    if (params.priority && Array.isArray(params.priority)) {
      where.priority = { in: params.priority as Priority[] };
    }
  
    if (params.text) {
      where.name = { contains: params.text, mode: 'insensitive' };
    }
  
    if (params.isActive !== undefined) {
      where.isActive = params.isActive;
    }
  
    if (params.fromDate || params.toDate) {
      where.dueDate = {};
  
      if (params.fromDate) {
        where.dueDate.gte = new Date(params.fromDate);
      }
  
      if (params.toDate) {
        where.dueDate.lte = new Date(params.toDate);
      }
    }
  
    const [total, data] = await Promise.all([
      this.prisma.task.count({ where }),
      this.prisma.task.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
  
    return {
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage) || 1,
      },
      data,
    };
  }
  
  private async ensureExists(id: number) {
    const found = await this.prisma.task.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Task not found');
  }
}
