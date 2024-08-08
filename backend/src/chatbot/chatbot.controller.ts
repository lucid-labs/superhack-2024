import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService, ChatBotServiceResponse } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async handleMessage(
    @Body() body: { userId: string; message: string },
  ): Promise<ChatBotServiceResponse> {
    return this.chatbotService.handleUserMessage(body.userId, body.message);
  }
}
