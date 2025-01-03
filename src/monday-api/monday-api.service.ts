import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MondayApiService {
  private readonly apiUrl: string;
  private readonly mondayToken: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('MONDAY_URL');
    this.mondayToken = this.configService.get<string>('MONDAY_API_TOKEN');
  }

  private async getProductsItems(productName: string): Promise<any> {
    const query = `
    query ($boardId: ID!, $value: CompareValue!) {
      boards(ids: [$boardId]) {
        items_page(query_params: {rules: [{column_id: "name", compare_value: $value, operator: contains_text}]}) {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }
    `;

    const variables = {
      boardId: 803747785,
      value: productName,
    };

    const response = await axios.post(
      this.apiUrl,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${this.mondayToken}`,
          'Content-Type': 'application/json',
          'API-Version': '2023-07',
        },
      },
    );

    return response.data;
  }

  async findProductByName(productName: string) {
    let items;
    if (productName === 'RHEE') {
      items = await this.getProductsItems(`*RHEE`);
    }
    else if (productName === 'RHOB') {
      items = await this.getProductsItems(`*RHOB`);
    }
    else {
      items = await this.getProductsItems(productName);
    }
    
    const item = items.data.boards[0].items_page.items.find((item: any) =>
      item.name.toLowerCase().includes(productName.toLowerCase()),
    );
    return item;
  }
}
// NEED TO OPTIMIZE