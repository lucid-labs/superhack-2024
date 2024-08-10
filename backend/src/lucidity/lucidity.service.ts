import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as Joi from 'joi';
import {
  RecommendationRequest,
  ProtocolActionRequest,
  ProtocolDataRequest,
  UserDataRequest,
} from '../interfaces/request-objects.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LucidityService {
  private readonly logger = new Logger(LucidityService.name);
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get('lucidityBaseUrl');
  }

  private validateRequestObject(
    requestObject: any,
    schema: Joi.Schema,
  ): boolean {
    const { error } = schema.validate(requestObject);
    if (error) {
      this.logger.error('Validation Error:', error.message);
      return false;
    }
    return true;
  }

  async getProtocolRecommendation(
    requestObject: RecommendationRequest,
  ): Promise<any> {
    const schema = Joi.object({
      actionType: Joi.string().valid('recommendation').required(),
      chainIds: Joi.array().items(Joi.string()).required(),
      supplyAsset: Joi.string().required(),
      borrowAsset: Joi.string().allow('').optional(),
      borrowAmount: Joi.string().allow('').optional(),
      isOnlySupply: Joi.boolean().required(),
      riskRating: Joi.string().optional(),
      parameters: Joi.array().items(Joi.string()).required(),
    });

    if (!this.validateRequestObject(requestObject, schema)) {
      return { message: 'Invalid request object.' };
    }

    console.log('*****************, here', this.baseUrl, requestObject);
    const response = await axios.post(
      `${this.baseUrl}/recommendation-engine`,
      requestObject,
    );
    return response.data;
  }

  async performProtocolAction(
    requestObject: ProtocolActionRequest,
  ): Promise<any> {
    const schema = Joi.object({
      actionType: Joi.string().valid('protocolAction').required(),
      type: Joi.string()
        .valid('supply', 'borrow', 'withdraw', 'repay')
        .required(),
      protocol: Joi.string().required(),
      assetSymbol: Joi.string().required(),
      assetAddress: Joi.string().required(),
      chainId: Joi.number().required(),
      amount: Joi.string().required(),
      userAddress: Joi.string().required(),
      misc: Joi.object().optional(),
    });

    if (!this.validateRequestObject(requestObject, schema)) {
      return { message: 'Invalid request object.' };
    }

    const response = await axios.post(
      `${this.baseUrl}/protocol-actions`,
      requestObject,
    );
    return response.data;
  }

  async getProtocolData(requestObject: ProtocolDataRequest): Promise<any> {
    try {
      const { chainId, protocol } = requestObject;
      const response = await axios.get(
        `${this.baseUrl}/protocol-data/${chainId}/${protocol}`,
      );
      return response.data;
    } catch (e) {
      this.logger.error('Error getting protocol data:', e);
    }
  }

  async getUserData(requestObject: UserDataRequest): Promise<any> {
    const { userAddress, chainId, protocol } = requestObject;
    const response = await axios.get(
      `${this.baseUrl}/users/${userAddress}/${chainId}/${protocol}`,
    );
    return response.data;
  }
}
