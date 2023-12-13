import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator"
import { MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS } from "src/utils/constants"

export class CreateUpdateClassDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  className: string

  @ApiProperty()
  @IsNumber()
  @Max(MAXIMUM_AVAILABLE_STUDENTS_IN_CLASS)
  availableAmount: number
}
