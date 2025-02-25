import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) {
      throw new Error(`Event with id ${createSpotDto.eventId} not found.`);
    }

    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: { eventId },
    });
  }

  findOne(spotId: string, eventId: string) {
    return this.prismaService.spot.findUnique({
      where: { eventId, id: spotId },
    });
  }

  update(spotId: string, eventId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: { eventId, id: spotId },
      data: updateSpotDto,
    });
  }

  remove(spotId: string, eventId: string) {
    return this.prismaService.spot.delete({
      where: { eventId, id: spotId },
    });
  }
}
