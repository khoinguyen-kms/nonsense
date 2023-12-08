import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppHealth(): string {
    return 'OK';
  }
}
