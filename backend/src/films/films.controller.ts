import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto } from './dto/films.dto';
import { ScheduleDto } from './dto/schedule.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms(): Promise<{ total: number; items: FilmDto[] }> {
    return this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<ScheduleDto[]> {
    return this.filmsService.getFilmSchedule(id);
  }
}
