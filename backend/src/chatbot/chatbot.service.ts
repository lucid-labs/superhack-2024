import { Injectable, Logger } from '@nestjs/common';
import { GptAssistantService } from '../gpt-assistant/gpt-assistant.service';
import { LucidityService } from '../lucidity/lucidity.service';

export interface ChatBotServiceResponse {
  message: string;
  isExecutable: boolean;
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  constructor(
    private readonly gptAssistantService: GptAssistantService,
    private readonly lucidityService: LucidityService,
  ) {}

  async handleUserMessage(
    userId: string,
    message: string,
  ): Promise<ChatBotServiceResponse> {
    const assistantResponse = await this.gptAssistantService.interpretMessage(
      userId,
      message,
    );

    this.logger.log('Assistant response:', assistantResponse);

    if (!assistantResponse.requestObject) {
      return { message: assistantResponse.message, isExecutable: false };
    }

    const requestObject = assistantResponse.requestObject;

    let response;
    switch (requestObject.actionType) {
      case 'recommendation':
        response = await this.lucidityService.getProtocolRecommendation(
          requestObject,
        );
        break;
      case 'protocolAction':
        response = await this.lucidityService.performProtocolAction(
          requestObject,
        );
        break;
      case 'dataRequest':
        response = await this.lucidityService.getProtocolData(requestObject);
        break;
      default:
        response = { message: 'Unsupported action type.' };
    }

    return response;
  }
}
