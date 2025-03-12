import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { FilmDto } from '../films/dto/films.dto';
import { ScheduleDto } from '../films/dto/schedule.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });

    if (!films || films.length === 0) {
      return [];
    }

    return films.map((film) => this.toFilmDto(film));
  }

  async findById(id: string): Promise<FilmDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film ? this.toFilmDto(film) : null;
  }

  private toFilmDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
      schedule: film.schedule.map((s) => this.toScheduleDto(s)),
    };
  }

  private toScheduleDto(schedule: any): ScheduleDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken || [],
    };
  }
}
