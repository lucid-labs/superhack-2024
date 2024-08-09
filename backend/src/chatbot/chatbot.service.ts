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
  recommendation?: any;
  protocolAction?: any;
  protocolData?: any;
  userData?: any;
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
          assistantResponse.message ||
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
          return {
            message: 'Possible opportunities',
            isExecutable: false,
            recommendation: response,
          };
        case 'protocolAction':
          response = await this.lucidityService.performProtocolAction(
            requestObject as any,
          );
          return {
            message: 'Transaction metadata',
            isExecutable: true,
            protocolAction: response,
          };
        case 'userData':
          response = await this.lucidityService.getUserData(
            requestObject as any,
          );
          return {
            message: 'User data',
            isExecutable: false,
            userData: response,
          };
        case 'protocolData':
          response = await this.lucidityService.getProtocolData(
            requestObject as any,
          );
          return {
            message: 'Protocol data',
            isExecutable: false,
            protocolData: response,
          };
        default:
          response = { message: 'Unsupported action type.' };
          return { message: 'Unsupported action type.', isExecutable: false };
      }
    } catch (error) {
      this.logger.error(error);
      response = { message: error.message };
    }
  }
}
