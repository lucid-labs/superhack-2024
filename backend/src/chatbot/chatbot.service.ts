import { Injectable, Logger } from '@nestjs/common';
import { GptAssistantService } from '../gpt-assistant/gpt-assistant.service';
import { LucidityService } from '../lucidity/lucidity.service';
import {
  RequestObject,
  RecommendationRequest,
  ProtocolActionRequest,
  ProtocolDataRequest,
  UserDataRequest,
} from '../interfaces/request-objects.interface';

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

    if (!assistantResponse.isFinalResponse) {
      return { message: assistantResponse.message, isExecutable: false };
    }

    const requestObject: RequestObject = assistantResponse.requestObject;

    if (Object.keys(requestObject).length === 0) {
      return {
        message:
          'Sorry, I could not process your request. I am still learning you know! Please try again.',
        isExecutable: false,
      };
    }

    let response;
    try {
      switch (requestObject.actionType) {
        case 'recommendation':
          response = await this.lucidityService.getProtocolRecommendation(
            requestObject as any,
          );
          break;
        case 'protocolAction':
          response = await this.lucidityService.performProtocolAction(
            requestObject as any,
          );
          break;
        case 'userData':
          response = await this.lucidityService.getUserData(
            requestObject as any,
          );
          break;
        case 'protocolData':
          response = await this.lucidityService.getProtocolData(
            requestObject as any,
          );
          break;
        default:
          response = { message: 'Unsupported action type.' };
      }
    } catch (error) {
      this.logger.error(error);
      response = { message: error.message };
    }

    if (
      requestObject.actionType === 'recommendation' ||
      requestObject.actionType === 'protocolData' ||
      requestObject.actionType === 'userData'
    ) {
      // const formattedResponse = await this.gptAssistantService.formatResponse(
      //   userId,
      //   response,
      // );
      return {
        message: response, // formattedResponse.message,
        isExecutable: false,
      };
    }

    return {
      message: response,
      isExecutable: true,
    };
  }
}
