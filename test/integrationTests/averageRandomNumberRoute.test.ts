import {
  randomAverageNumberPath,
  randomNumberUrl,
} from '../../src/configurationConstants';
import { default as request } from 'supertest';
import app from '../../src/app';
import { RandomNumberSuccessfulResponse } from '../../src/service/RandomNumberResponse';
import { randomNumberValidMockResponse } from '../mocks/randomNumberValidMockResponse';
import mockAxios from 'jest-mock-axios';

const randomNumberResponse: RandomNumberSuccessfulResponse[] =
  randomNumberValidMockResponse();

describe('averageRandomNumberRoute', (): void => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('When averageRandomNumberRoute is called, and external random number service is called, should return a random number list, and average of the number list is returned in response', async (): Promise<void> => {
    mockAxios.mockResponseFor(
      { url: randomNumberUrl },
      { data: randomNumberResponse },
    );
    const response: request.Response = await request(app).get(
      randomAverageNumberPath,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.averageNumber).toEqual(23);
    expect(response.body.averageNumberFixed).toEqual('23');
    expect(response.body.randomNumbers).toEqual([23]);
  });
});
