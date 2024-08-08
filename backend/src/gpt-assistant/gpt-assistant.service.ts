import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { OpenAI, ClientOptions } from 'openai';
import { Thread } from 'openai/resources/beta/threads/threads';
import { json } from 'stream/consumers';

@Injectable()
export class GptAssistantService {
  private readonly logger = new Logger(GptAssistantService.name);
  private readonly openai: OpenAI;
  private assistantId: string;

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.assistantId = this.configService.get('assistantId');
    this.openai = new OpenAI({
      apiKey: this.configService.get('openapiApikey'),
    });
  }

  async interpretMessage(userId: string, message: string): Promise<any> {
    let thread = (await this.cacheManager.get(userId)) as Thread;

    if (!thread || !thread?.id) {
      this.logger.log(`Thread not found`);
      thread = await this.createThread(message);
      this.cacheManager.set(userId, thread);
    } else {
      this.logger.log(`Thread found`);
      await this.addMessageToThread(thread, message);
    }

    const assistantResponse = await this.runThread(thread);

    return assistantResponse;
  }

  private async createThread(message): Promise<Thread> {
    try {
      const thread = await this.openai.beta.threads.create({
        messages: [
          {
            role: 'user',
            content: `${message}`,
          },
        ],
      });
      this.logger.log(`Thread created: ${thread.id}`);
      return thread;
    } catch (error) {
      this.logger.error('Error creating thread:', error);
      throw new Error('Could not create a thread.');
    }
  }

  private async addMessageToThread(
    thread: Thread,
    message: string,
  ): Promise<void> {
    try {
      const messageResponse = await this.openai.beta.threads.messages.create(
        thread.id,
        {
          role: 'user',
          content: `${message}`,
        },
      );
      this.logger.log(`Message added to thread: ${messageResponse.id}`);
    } catch (error) {
      this.logger.error('Error adding message to thread:', error);
      throw new Error('Could not add message to thread.');
    }
  }

  private async runThread(thread: Thread): Promise<any> {
    this.logger.log(`Running thread: ${thread.id}`);
    try {
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
      });
      const runId = run.id;
      let runStatus = run.status;

      while (runStatus !== 'completed') {
        const runStatusResponse = await this.openai.beta.threads.runs.retrieve(
          thread.id,
          runId,
        );
        runStatus = runStatusResponse.status;
      }

      this.logger.log(`Thread run completed: ${thread.id}`);

      const messagesResponse = await this.openai.beta.threads.messages.list(
        thread.id,
      );
      const finalMessage = JSON.parse(
        messagesResponse.data[0].content[0][
          messagesResponse.data[0].content[0].type
        ].value,
      );

      return finalMessage;
    } catch (error) {
      this.logger.error('Error running thread:', error);
      throw new Error('Could not run the thread.');
    }
  }

  async formatResponse(userId: string, data: any): Promise<any> {
    let thread = (await this.cacheManager.get(userId)) as Thread;

    if (!thread || !thread?.id) {
      this.logger.log(`Thread not found`);
      thread = await this.createThread(
        `Format the following data into a table format: ${JSON.stringify(
          data,
        )}`,
      );
      await this.cacheManager.set(userId, thread);
    } else {
      this.logger.log(`Thread found`);
      await this.addMessageToThread(
        thread,
        `Format the following data into a table format: ${JSON.stringify(
          data,
        )}`,
      );
    }

    const formattedResponse = await this.runThread(thread);
    return formattedResponse;
  }
}
