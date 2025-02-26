import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto } from './dto/films.dto';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string): Promise<ScheduleDto[]> {
    const film = await this.filmsRepository.findById(id);
    return film ? film.schedule : [];
  }
}
