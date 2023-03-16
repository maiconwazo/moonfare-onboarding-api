/* eslint-disable @typescript-eslint/no-empty-function */
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowStepEntity } from './entities/onboarding-flow-step.entity';
import { FlowEntity } from './entities/onboarding-flow.entity';
import { StepStatusEnum } from './entities/onboarding-instance-step.entity';
import { InstanceEntity } from './entities/onboarding-instance.entity';

export const mockedSteps: FlowStepEntity[] = [
  {
    id: '1',
    name: 'step1',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    flow: undefined,
    flowId: undefined,
    instanceSteps: [],
  },
  {
    id: '2',
    name: 'step2',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    flow: undefined,
    flowId: undefined,
    instanceSteps: [],
  },
  {
    id: '3',
    name: 'step3',
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    flow: undefined,
    flowId: undefined,
    instanceSteps: [],
  },
  {
    id: '4',
    name: 'step4',
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    flow: undefined,
    flowId: undefined,
    instanceSteps: [],
  },
];

export const mockedFlow: FlowEntity[] = [
  {
    id: '1',
    name: 'test',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: mockedSteps,
    instances: [],
  },
];

export const mockedInstances: InstanceEntity[] = [
  {
    id: '1',
    flow: mockedFlow.find((x) => x.isDefault),
    steps: [
      {
        id: '1_1',
        createdAt: new Date(),
        updatedAt: new Date(),
        data: JSON.stringify({}),
        flowStep: mockedSteps[0],
        instance: undefined,
        status: StepStatusEnum.started,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    flow: mockedFlow.find((x) => x.isDefault),
    steps: [
      {
        id: '2_1',
        createdAt: new Date(),
        updatedAt: new Date(),
        data: JSON.stringify({ someExtraData: 'hello world' }),
        flowStep: mockedSteps[0],
        instance: undefined,
        status: StepStatusEnum.completed,
      },
      {
        id: '2_2',
        createdAt: new Date(),
        updatedAt: new Date(),
        data: JSON.stringify({}),
        flowStep: mockedSteps[1],
        instance: undefined,
        status: StepStatusEnum.started,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockedOnboardingProviders = [
  {
    provide: getRepositoryToken(FlowEntity),
    useValue: {
      save: () => {},
      findOne: () => mockedFlow.find((x) => x.isDefault),
    },
  },
  {
    provide: getRepositoryToken(InstanceEntity),
    useValue: {
      save: () => {},
      findOne: (condition: { where: { id: string } }) =>
        mockedInstances.find((i) => i.id === condition.where.id),
      remove: () => {},
    },
  },
];
