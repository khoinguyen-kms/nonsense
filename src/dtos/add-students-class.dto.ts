import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AddStudentsClassDto {
  @ApiProperty()
  @IsArray()
  studentIds: number[]
}
