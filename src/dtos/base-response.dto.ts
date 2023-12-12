import { HttpStatus } from "@nestjs/common"

export class BaseResponseDto<T> {
  statusCode: number
  message: string
  data: T | T[]

  constructor(statusCode = HttpStatus.OK, message: string, data: T | T[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
