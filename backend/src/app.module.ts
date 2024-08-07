import { Module } from '@nestjs/common';
import { ChatbotModule } from './chatbot/chatbot.module';
import { LucidityModule } from './lucidity/lucidity.module';
import { GptAssistantModule } from './gpt-assistant/gpt-assistant.module';

@Module({
  imports: [ChatbotModule, LucidityModule, GptAssistantModule],
})
export class AppModule {}
