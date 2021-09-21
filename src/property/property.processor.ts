import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as sgMail from "@sendgrid/mail"
import { HttpService } from "@nestjs/axios"

@Processor('property')
export class PropertyProcessor {
  constructor(private httpService: HttpService) { }
  private readonly logger = new Logger(PropertyProcessor.name);


  @Process('published')
  async handleSendMail(job: Job) {
    const msg = {
      // to: 'metrics@clooper.com',
      to: 'abundanceoshianor@gmail.com',
      from: 'support@exaltapp.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      html: "<strong>" + JSON.stringify(job.data) + "</strong>",
    };
    await sgMail.send(msg);
  }


  @Process('report')
  async handleReportToPartner(job: Job) {
    try {
      await this.httpService.post('https://listing.gumtree.com/v2/webservice/list', { ...job.data } );
    } catch (error) {
      this.logger.warn(error)
      
    }
  }
}