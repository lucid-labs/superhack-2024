import { Injectable, Logger } from '@nestjs/common';
import { OpenAI, ClientOptions } from 'openai';
import { Thread } from 'openai/resources/beta/threads/threads';

@Injectable()
export class GptAssistantService {
  private readonly logger = new Logger(GptAssistantService.name);
  private readonly openai: OpenAI;
  private readonly threads = new Map<string, Thread>(); // In-memory mapping for user-thread association
  private assistantId: string;

  constructor() {
    this.assistantId = 'your-assistant-id';
    this.openai = new OpenAI({
      apiKey: 'your-api-key',
    });
  }

  async interpretMessage(userId: string, message: string): Promise<any> {
    let thread = this.threads.get(userId);

    if (!thread || !thread?.id) {
      thread = await this.createThread(message);
      this.threads.set(userId, thread);
    } else {
      await this.addMessageToThread(thread, message);
    }

    const assistantResponse = await this.runThread(thread);

    if (!assistantResponse.isFinalResponse) {
      return { message: assistantResponse.message };
    }

    const requestObject = assistantResponse.requestObject;

    if (Object.keys(requestObject).length === 0) {
      return {
        message:
          'There was an error processing your request. Please try again.',
      };
    }

    return { requestObject, message: assistantResponse.message };
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
      await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: `${message}`,
      });
    } catch (error) {
      this.logger.error('Error adding message to thread:', error);
      throw new Error('Could not add message to thread.');
    }
  }

  private async runThread(thread: Thread): Promise<any> {
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

      const messagesResponse = await this.openai.beta.threads.messages.list(
        thread.id,
      );
      const finalMessage = messagesResponse.data;
      return finalMessage;
    } catch (error) {
      this.logger.error('Error running thread:', error);
      throw new Error('Could not run the thread.');
    }
  }
}
