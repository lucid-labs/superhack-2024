import { Module } from '@nestjs/common';
import { GptAssistantService } from './gpt-assistant.service';

@Module({
  providers: [GptAssistantService],
})
export class GptAssistantModule {}
