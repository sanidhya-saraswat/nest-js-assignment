import { IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  readonly title?: string;
}
