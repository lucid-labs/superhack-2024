import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { GptAssistantModule } from 'src/gpt-assistant/gpt-assistant.module';
import { LucidityModule } from 'src/lucidity/lucidity.module';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
  imports: [GptAssistantModule, LucidityModule],
})
export class ChatbotModule {}
