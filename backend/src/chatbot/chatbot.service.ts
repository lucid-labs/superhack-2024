import { Injectable } from '@nestjs/common';
import { GptAssistantService } from '../gpt-assistant/gpt-assistant.service';
import { LucidityService } from '../lucidity/lucidity.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly gptAssistantService: GptAssistantService,
    private readonly lucidityService: LucidityService,
  ) {}

  async handleUserMessage(userId: string, message: string) {
    const assistantResponse = await this.gptAssistantService.interpretMessage(
      userId,
      message,
    );

    if (!assistantResponse.requestObject) {
      return { message: assistantResponse.message };
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
