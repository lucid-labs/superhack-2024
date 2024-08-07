import { Module } from '@nestjs/common';
import { ChatbotModule } from './chatbot/chatbot.module';
import { LucidityModule } from './lucidity/lucidity.module';
import { GptAssistantModule } from './gpt-assistant/gpt-assistant.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.development',
        '.env.staging',
        '.env.production',
        '.env',
      ],
      load: [configuration],
    }),
    ChatbotModule,
    LucidityModule,
    GptAssistantModule,
  ],
})
export class AppModule {}
