import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';


@Processor('users')
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process('transcode')
  async handleTranscode(job: Job) {

    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}