import { Module } from '@nestjs/common';
import { ChatbotModule } from './chatbot/chatbot.module';
import { LucidityModule } from './lucidity/lucidity.module';
import { GptAssistantModule } from './gpt-assistant/gpt-assistant.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

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
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore as any,
      url: 'redis://localhost:6379',
      // Store-specific configuration:
    }),
    ChatbotModule,
    LucidityModule,
    GptAssistantModule,
  ],
})
export class AppModule {}
