import { ApiProperty } from "@nestjs/swagger"

export class PaginationDto {
  @ApiProperty()
  page: string

  @ApiProperty()
  per_page: string
}
