import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LucidityService {
  private readonly baseUrl = 'https://api.lucidity.com';

  async getProtocolRecommendation(requestObject: any): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/discovery`,
      requestObject,
    );
    return response.data;
  }

  async performProtocolAction(requestObject: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/actions`, requestObject);
    return response.data;
  }

  async getProtocolData(requestObject: any): Promise<any> {
    const { protocol, userAddress, chainId } = requestObject;
    const response = await axios.get(
      `${this.baseUrl}/api/v1/users/${userAddress}/${chainId}/${protocol}`,
    );
    return response.data;
  }
}
