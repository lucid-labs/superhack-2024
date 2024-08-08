import { Module } from '@nestjs/common';
import { GptAssistantService } from './gpt-assistant.service';

@Module({
  providers: [GptAssistantService],
  exports: [GptAssistantService],
})
export class GptAssistantModule {}
