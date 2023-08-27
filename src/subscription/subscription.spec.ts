import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { SubscriptionService } from './subscription.service';
import { Subscriptions } from './subscription.model';
import { ConfigModule } from '@nestjs/config';
describe('Subscriptions service', () => {
  let service: SubscriptionService;
  const mockSequelizeSubscriptions = {
    findAll: jest.fn(() => Promise.resolve([])),
    findOne: jest.fn(),
    create: jest.fn(),
    verifyEmailConfirmation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getModelToken(Subscriptions),
          //useValue: { mockSequelizeSubscriptions },
          useValue: mockSequelizeSubscriptions,
        },
      ],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('Subscription Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('List Subscription', () => {
    it('should list all subscriptions and return an empty array', async () => {
      const list = await service.findAll();

      expect(list).toHaveLength(0);
      expect(mockSequelizeSubscriptions.findAll).toHaveBeenCalledTimes(1);
    });
    it('should list all subscriptions and return array with one', async () => {
      mockSequelizeSubscriptions.findAll = jest.fn(() =>
        Promise.resolve([{ name: 'test' }]),
      );
      const list = await service.findAll();
      expect(list).toHaveLength(1);
      expect(mockSequelizeSubscriptions.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find Subscription', () => {
    it('should return subscription and return nothing', async () => {
      mockSequelizeSubscriptions.findOne = jest.fn(() => Promise.resolve());
      const test_subscription = await service.findOne(1);
      expect(test_subscription).toBeUndefined();
      expect(mockSequelizeSubscriptions.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return subscription and return one', async () => {
      mockSequelizeSubscriptions.findOne = jest.fn(() =>
        Promise.resolve({ name: 'test' }),
      );
      const test_subscription = await service.findOne(1);
      expect(test_subscription).toBeDefined();
      expect(test_subscription).toHaveProperty('name');
      expect(mockSequelizeSubscriptions.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('Create Subscription', () => {
    it('should create subscription', async () => {
      mockSequelizeSubscriptions.create = jest.fn((_obj) =>
        Promise.resolve(_obj),
      );
      mockSequelizeSubscriptions.findOne = jest.fn((_obj) => Promise.resolve());

      jest
        .spyOn(service, 'SendEmail')
        .mockImplementation(() => Promise.resolve(true));

      jest.spyOn(service, 'generateToken').mockImplementation(() => '');

      const test_subscription = await service.create({
        name: 'true',
        email: '',
        active: false,
        frequency: 1,
        emailVerified: false,
        country: '',
      });
      expect(test_subscription).toBeDefined();
      expect(test_subscription).toHaveProperty('name');
      expect(mockSequelizeSubscriptions.create).toHaveBeenCalledTimes(1);
      expect(service.SendEmail).toHaveBeenCalledTimes(1);
      expect(service.generateToken).toHaveBeenCalledTimes(1);
    });
  });
});
