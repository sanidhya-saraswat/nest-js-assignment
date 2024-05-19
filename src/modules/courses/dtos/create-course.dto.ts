import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly title: string;
}
